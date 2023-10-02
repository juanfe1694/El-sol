import { Milestone } from "../milestones/milestonesInterface";
import { GlobalAssignee } from "../task/taskInterface";


export interface FetchResponseWorkflows {
  map(arg0: (item: import("../projects/projectsInterfaces").CardProps) => { id: number; title: string; stateId: number; priorityId: number; plannedEndDate: Date; plannedStartDate: Date | undefined; creationDate: Date | undefined; workFlowId: number; }): import("../projects/projectsInterfaces").CardProps[];
  data: WorkFlowI[],
  recordsCount: number
}

export interface WorkFlowI {
  map(arg0: (item: import("../projects/projectsInterfaces").CardProps) => { id: number; title: string; stateId: number; priorityId: number; plannedEndDate: Date; plannedStartDate: Date | undefined; creationDate: Date | undefined; workFlowId: number; }): import("../projects/projectsInterfaces").CardProps[];
  //0: number,
  id: number,
  creationDate: Date,
  updateDate: Date,
  workFlowParentId: number,
  title: string,
  description: string,
  stateId: number,
  priorityId: number,
  workFlowTypeId: number,
  createdBy: number,
  updatedBy: number,
  plannedStartDate: Date,
  plannedEndDate: Date,
  actualStartDate: Date,
  actualEndDate: Date,
  plannedHours: number,
  actualHours: number,
  isTemplate: boolean,
  isPublished: boolean,
  inactive: boolean,
  isDeleted: boolean,
  priority: string,
  state: string,
  workFlowType: string,
  milestones: Milestone[],
  workFlowsAssignees: GlobalAssignee[],
  workFlowsRelatedTasks: WorkFlowsRelatedTask[],
  recordGoals: number;
  countFilledForms: number;
  projectId: number;
  projectName: string;
}



export interface CreatorWorkFlow {
  workFlowParentId: number | undefined,
  title: string,
  description: string,
  stateId: string,
  priorityId: string,
  workFlowTypeId: number,
  plannedStartDate: Date,
  plannedEndDate: Date,
  createdBy: number,
}


 export interface SelectsWorkflow {
    label: string | number,
    value: string | number
  }

  export interface OptionsWorkflow {
    id: number,
    title: string
  }

export interface WorkFlowsAssignee {
  id: number,
  creationDate: Date,
  updateDate: Date,
  workFlowId: number,
  userId: number,
  createdBy: number,
  updatedBy: number,
}

export interface WorkFlowsRelatedTask {
  id: number,
  creationDate: Date,
  updateDate: Date,
  workFlowId: number,
  relatedTaskId: number,
  createdBy: number,
  updatedBy: number,
}

export interface UpdateWorkflowI {
  id: number,
  updateDate: Date,
  workFlowParentId: number | undefined,
  title: string,
  description: string,
  stateId: string | number,
  priorityId: string | number,
  workFlowTypeId: number,
  plannedEndDate: Date,
  plannedStartDate: Date,
  inactive: boolean,
  isDeleted: boolean,
  isTemplate: boolean
}



//*Workflow Types
export interface WorkflowTypeInterface {
  id:           number;
  workFlowType: string;
  inactive:     boolean;
  isDeleted:    boolean;
  workFlows?:    any[];
}

export interface CreateWorkflowTypeInterface {
  workFlowType: string | undefined;
  inactive:     boolean;
  isDeleted:    boolean;
}