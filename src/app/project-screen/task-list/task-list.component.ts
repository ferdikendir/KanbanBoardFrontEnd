import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  @Input() taskList: any;

  selectedCard: any = {};

  taskListId = 0;

  constructor(
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
  ) {}
  public isCollapsed = false;
  addCardForm: FormGroup;

  ngOnInit(): void {
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
      taskListId: [0],
    });
  }

  onDrop(event) {
    this.sharedService.drop(event);
  }

  //yeni card ekleme
  addCardToTaskList() {
    if (this.addCardForm.valid) {
      var newCard: any = Object.assign({}, this.addCardForm.value);
      if (!newCard.id) {
        newCard.taskListId = this.taskListId;
        // this.taskListService.addCardToTaskList(newCard).subscribe((response: any) =>{
        //   console.log(response)
        // });
      } else this.taskList.cards[this.findIndex(newCard)] = newCard;
      this.closePopup();
    } 
    // else
    //   this.toastrService.error(
    //     'Please fill all required fields.',
    //     'Missing Form'
    //   );
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
    var index = this.findIndex(this.selectedCard);
    if (index > -1) this.taskList.cards.splice(index, 1);
    this.closeDeletePopup();
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
}
