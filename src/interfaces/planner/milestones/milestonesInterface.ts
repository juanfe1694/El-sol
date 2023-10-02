import { GlobalAssignee } from "../task/taskInterface";

export interface FetchResponseMilestone {
  data: Milestone[];
  recordsCount: number;
}


export interface Milestone {
  map(arg0: (item: import("../projects/projectsInterfaces").CardProps) => {
    id: number;
    title: string;
    stateId: number;
    priorityId: number;
    plannedEndDate: Date;
    plannedStartDate: Date | undefined;
    creationDate: Date | undefined;
    workFlowId: number;
  }): import("../projects/projectsInterfaces").CardProps[];

  id: number,
  creationDate: Date,
  updateDate: Date,
  workflowId: number,
  milestoneParentId: number,
  title: string,
  description?: string,
  stateId: number,
  priorityId: number,
  createdBy: number,
  updatedBy?: number,
  actualStartDate?: Date,
  actualEndDate?: Date,
  plannedEndDate: Date,
  plannedStartDate: Date,
  plannedHours: number,
  actualHours?: number,
  isTemplate?: boolean,
  isPublished?: boolean,
  inactive?: boolean,
  isDeleted?: boolean,
  milestonesAssignees?: GlobalAssignee[],
  recordGoals: number,
  countFilledForms: number,
  projectName: string,
}

export interface MilestoneAssignee {
  id: number,
  creationDate: Date,
  updateDate: Date,
  milestoneId: number,
  userId: number,
}

export interface CreatorMilestone {
  workflowId: number,
  milestoneParentId?: number,
  title: string,
  description: string,
  stateId: string,
  priorityId: string,
  createdBy: number,
  plannedEndDate: Date,
  plannedStartDate: Date,
}

export interface SelectsMilestones {
  label: string | number,
  value: string | number
}

export interface UpdateMilestoneI {
  id: number,
  workflowId: number | undefined,
  updateDate: Date,
  milestoneId: number | undefined,
  title: string,
  description: string,
  stateId: string | number,
  priorityId: string | number,
  plannedEndDate: Date,
  plannedStartDate: Date,
  inactive: boolean,
  isDeleted: boolean,
  isTemplate: boolean
}