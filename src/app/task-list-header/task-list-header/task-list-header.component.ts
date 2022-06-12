import { Component } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { finalize } from "rxjs";
import { TaskListHeader } from "src/model/task-list-header";
import { TaskListHeaderService } from "../task-list-header.service";

@Component({
    selector: "task-list-header",
    templateUrl: "./task-list-header.component.html",
    styleUrls: ["./task-list-header.component.scss"]
})
export class TaskListHeaderComponent {
    taskListHeader: TaskListHeader[] = [];
    cloneTaskListHeader:  { [s: string]: TaskListHeader; } = {};
    showAddTaskListHeader = false
    loading = false;
    header = "";
    isAddable = true

    constructor(
        private taskListHeaderService: TaskListHeaderService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.getAllTaskListHeader();
    }

    getAllTaskListHeader() {
        this.spinner.show();
        this.loading = true;
        this.taskListHeaderService.getAllTaskListHeader().pipe(finalize(() => {
            this.spinner.hide();
        })).subscribe(response =>{
            this.taskListHeader = response;
            this.loading = false;
        });
    }

    onRowEditInit(taskListHeader: TaskListHeader) {
        this.cloneTaskListHeader[taskListHeader.id || 0] = {...taskListHeader};
    }

    onRowEditSave(taskListHeader: TaskListHeader) {
        delete this.cloneTaskListHeader[taskListHeader.id || 0];
        this.spinner.show();
        this.taskListHeaderService.updateTaskListHeader(taskListHeader).pipe(finalize(() => {
            this.spinner.hide();
        })).subscribe(response => {
            this.getAllTaskListHeader();
        });
    }

    onRowEditCancel(taskListHeader: TaskListHeader, index: number) {
        this.taskListHeader[index] = this.cloneTaskListHeader[taskListHeader.id || 0];
        this.taskListHeader = [...this.taskListHeader];
    }

    addNewTaskListHeader() {
        const newTaskListHeader = {
            header: this.header,
            isAddable: this.isAddable
        }
        this.spinner.show();
        this.taskListHeaderService.addNewTaskListHeader(newTaskListHeader).pipe(finalize(() => {
            this.spinner.hide();
            this.header = "";
            this.isAddable = true;
            this.showAddTaskListHeader = false;
        }
        )).subscribe(response => {
            this.getAllTaskListHeader();
        });
    }
}