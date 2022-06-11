import { Card } from "./card";
import { TaskListHeader } from "./task-list-header";

export interface TaskList {
    id?: number;
    taskListHeader?: TaskListHeader;
    color?: string;
    Cards?: Card[];
}