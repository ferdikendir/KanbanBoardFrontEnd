import { Project } from "src/model/project";

export class ProjectAction {
    static readonly type = '[Project] Load';
}

export class TaskListAction {
    static readonly type = '[TaskList] Load';
    constructor(public projectId: number) { }
}