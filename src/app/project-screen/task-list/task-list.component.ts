import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { LoginService } from 'src/app/login-screen/login.service';
import { ProjectService } from '../project.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [MessageService]
})
export class TaskListComponent implements OnInit {
  @Input() taskList: any;

  users:any[]

  selectedCard: any = {};

  taskListId = 0;

  projectId: number;

  constructor(
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private loginService: LoginService,
    private router: Router,
    private projectService: ProjectService,
    private messageService: MessageService
  ) {}
  public isCollapsed = false;
  addCardForm: FormGroup;

  ngOnInit(): void {
    const route = this.router.url.split('/');
    this.projectId = parseInt(route[route.length - 1]);
    this.getUsers();
    this.createForm();
  }

  // card ekleme formu
  createForm() {
    this.addCardForm = this.formBuilder.group({
      id: [0],
      header: [
        '',
        [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)],
      ],
      content: [
        '',
        [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)],
      ],
      color: ['#004a9f', Validators.required],
      assignedUserId: [this.loginService.currentUserValue.id, Validators.required],
      
      reporterUserId: [this.loginService.currentUserValue.id, Validators.required],
      taskListId: [0],
    });
  }

  onDrop(event) {
    const move = this.sharedService.drop(event);
    const moveCard = {
      cardId: move?.card?.id,
      taskListHeader: move?.targetTaskListHeader?.trim(),
    }
    this.spinner.show()
    this.projectService.moveCard(moveCard).pipe(finalize(() =>{
      this.spinner.hide();
    })).subscribe(res => {

    })
  }

  //yeni card ekleme
  addCardToTaskList() {
    if (this.addCardForm.valid) {
        this.spinner.show();
      var newCard: any = Object.assign({}, this.addCardForm.value);
      if (!newCard.id) {
        newCard.taskListId = this.taskListId
        this.add(newCard);
      } else{
         this.update(newCard);
      }
    } 
    // else
    //   this.toastrService.error(
    //     'Please fill all required fields.',
    //     'Missing Form'
    //   );
  }

  update(card){
    this.projectService.updateCard(card)
    .pipe(finalize(() =>{
      this.spinner.hide();
      this.closePopup();
    }))
    .subscribe((response: any) => {
      const index = this.findIndex(response);
      if (index > -1) {
        this.taskList.cards[index] = response;
      }
      this.taskList.cards = [...this.taskList.cards];      
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Update Successful', life: 3000});
      }, error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Update Failed', life: 3000});
      });
    }

  add(card){
    this.projectService.addCard(card).pipe(finalize(() =>{
      this.spinner.hide();
      this.closePopup();
     })).subscribe((response: any) => {
      this.taskList.cards.push(response);
      this.messageService.add({severity:'success', summary: 'Succes', detail: 'Add Successful', life: 3000});
     }, error => {
      
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Add Failed', life: 3000});
     });
  }

  displayStyle = 'none';
  displayStyleForDelete = 'none';

  openPopupAndClearForm(taskListId) {
    this.taskListId = taskListId
    this.createForm();
    this.openPopup();
  }

  openPopupAndFillData(item) {
    this.selectedCard = item;
    this.addCardForm.patchValue(item);
    this.openPopup();
  }

  openPopup() {
    this.displayStyle = 'block';
  }

  closePopup() {
    this.displayStyle = 'none';
  }

  deleteCard() {
    this.spinner.show();
    this.projectService.deleteCard(this.selectedCard).subscribe((response: any) => {
      this.spinner.hide();
      this.messageService.add({severity:'success', summary: 'Succes', detail: 'Delete Successful', life: 3000});
      delete this.taskList.cards[this.findIndex(this.selectedCard)];
      this.taskList.cards = [...this.taskList.cards];
      this.closeDeletePopup();
    }, error => {
      this.spinner.hide();
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Delete Failed', life: 3000});
    })
  }

  closeDeletePopup() {
    this.displayStyleForDelete = 'none';
  }

  openDeletePopup() {
    this.displayStyleForDelete = 'block';
  }

  //card'ın index'ini bulma (guncelleme için)
  findIndex(item) {
    var index = -1;
    for (let i = 0; i < this.taskList.cards.length; i++) {
      if (this.taskList.cards[i].id === item.id) {
        index = i;
        break;
      }
    }
    return index;
  }

  getUsers() {
    this.spinner.show();
    this.projectService.getAllUserByProjectId(this.projectId)
    .pipe(finalize(() =>{
      this.spinner.hide();
    }))
    .subscribe((response: any) => {
      this.users = response.map(res => {
        return {
          id: res.user.id,
          name: res.user.fullName,
        }
      })
    }, (error: any) => {});
  }
}
