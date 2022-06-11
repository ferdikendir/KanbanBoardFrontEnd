import { TaskList } from "./task-list";
import { User } from "./user";

export interface Card{
    id?: number;
    header?:string;
    color?: string;
    content?: string;
    assignedUser?: User;
    raporterUser?: User;
    createdDate: Date;
    updatedDate: Date;
    command?: string;
    taskList: TaskList
}