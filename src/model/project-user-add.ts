import { Project } from "./project";

export interface ProjectUserAdd{
    projectId?: number;
    mailList?: string[];
    addedBy?: string;
    project?: Project;
}