
export interface GanttI {
    start:                Date | string;
    end:                  Date | string;
    name:                 string;
    id:                   string;
    progress:             number;
    projectsDeliverables: null;
    typeDescription:      null | string;
    type:                 string;
    userInformation:      UserInformation;
    project?: string,
    hideChildren?: boolean;
}

export enum Type {
    Projects = "Projects",
    WorkFlows = "WorkFlows",
    Milestones = "Milestones",
    Tasks ="Tasks"
}

export interface UserInformation {
    id:               number;
    fullName:         null;
    userName:         null;
    email:            null;
    imageProfilePath: null;
}


export interface FetchGanttProperties {
    requestType: string;
    milestoneId?: number;
    workFlowId?: number;
    taskId?: number;
    userId?: number;
  }
  