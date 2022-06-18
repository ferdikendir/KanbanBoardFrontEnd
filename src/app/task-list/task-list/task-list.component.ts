import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MenuItem, MessageService } from "primeng/api";
import { finalize } from "rxjs";
import { TaskListService } from "../task-list.service";

@Component({
    selector: "app-task-list",
    templateUrl: "./task-list.component.html",
    providers: [MessageService]
})
export class TaskListComponent {
    projectId = "";
    taskList: any[];
    selectedTaskList = {}
    items: MenuItem[];

    constructor(
        private taskListService: TaskListService,
        private spinner: NgxSpinnerService,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.route.queryParams.subscribe(params => {
            this.getAllTaskListByProjectId(parseInt(params['projectId']));
        });
        this.items = [
            {label: 'View', icon: 'pi pi-fw pi-search'},
            {label: 'Delete', icon: 'pi pi-fw pi-times'}
        ];
    }

    getAllTaskListByProjectId(projectId) {
        this.spinner.show();
        this.taskListService.getAllTaskList(projectId).pipe(finalize(() => {
            this.spinner.hide();
        })).subscribe( (response: any) => {
            this.taskList = response.taskLists;
        });
    }

    editTaskList(product){
        this.spinner.show();
        this.taskListService.updateTaskList(product).pipe(finalize(() => {this.spinner.hide();}))
        .subscribe( (response: any) => {
            this.messageService.add({severity:'success', summary:'Success', detail:'TaskList Updated Successfully'});
        }, error =>{
            this.messageService.add({severity:'error', summary:'Error', detail:'TaskList Update Failed'});
        });
    }
}