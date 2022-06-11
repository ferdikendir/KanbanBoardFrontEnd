import { TaskList } from "./task-list";
import { User } from "./user";

export interface Project{
    id?: number;
    projectName?: string;
    taskLists?: TaskList[];
    userId?: number;
    user?: User
    createdDate?: Date;
    updatedDate?: Date;
}