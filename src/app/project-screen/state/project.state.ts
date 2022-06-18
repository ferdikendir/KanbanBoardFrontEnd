import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { map, tap } from "rxjs";
import { LoginService } from "src/app/login-screen/login.service";
import { Project } from "src/model/project";
import { TaskList } from "src/model/task-list";
import { ProjectService } from "../project.service";
import { ProjectAction, TaskListAction } from "./project.action";

export interface ProjectStateModel {
    projects: Project[] |null;
    taskList: TaskList[] |null;
}

@State<ProjectStateModel>({
    name: 'projects',
    defaults: {
        projects: null,
        taskList: null
    }
})

@Injectable()
export class ProjectState {
    constructor(
        private projectService: ProjectService,
        private loginService: LoginService
    ) { }

    @Selector()
    public static getProjects(state: ProjectStateModel) {
        return state.projects;
    }
    
    @Action(ProjectAction)
    getProjectsByUser(
        { patchState }: StateContext<ProjectStateModel>,
    ){
        return this.projectService.getAllProjects(this.loginService.currentUserValue.id).pipe(
            map((response: any) => response.map(res => res.project)),
            tap((projects: Project[]) => {
                patchState({
                    projects: projects
                });
            })
        );
    }

    @Selector()
    public static getTaskList(state: ProjectStateModel) {
        return state.taskList;
    }

    @Action(TaskListAction)
    getTaskList(
        { patchState }: StateContext<ProjectStateModel>,
        { projectId }: TaskListAction
    ){
        return this.projectService.getTaskListByProjectId(projectId).pipe(
            tap((taskList: TaskList[]) => {
                patchState({
                    taskList: taskList
                });
            })
        )
    }
}
