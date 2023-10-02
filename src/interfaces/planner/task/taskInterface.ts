import { Form } from "../../form";

export interface FetchResponseTasks {
  data: TaskI[];
  recordsCount: number;
}

export interface TaskI {
  filter(arg0: (task: any) => boolean): unknown;
  id: number,
  creationDate: Date,
  updateDate: Date,
  milestoneId: number,
  taskParentId: number,
  title: string,
  description: string,
  stateId: number,
  priorityId: number,
  createdBy: number,
  updatedBy: number,
  plannedStartDate: Date,
  plannedEndDate: Date,
  actualStartDate: Date,
  actualEndDate: Date,
  plannedHours: number,
  actualHours: number,
  isCase: boolean,
  isTemplate: boolean,
  isPublished: boolean,
  inactive: boolean,
  isDeleted: boolean,
  deliverables: string,
  milestone: Milestone[],
  recordGoals: number,
  countFilledForms: number,
  projectId: number,
  projectName: string,
  tasksAssignees?: GlobalAssignee[],
}

export interface Datum {
  id: number;
  creationDate: Date;
  updateDate: Date;
  milestoneId: number;
  taskParentId: number;
  title: string;
  description: null | string;
  stateId: number;
  priorityId: number;
  createdBy: number;
  updatedBy: number | null;
  plannedStartDate: Date;
  plannedEndDate: Date
  actualStartDate: Date;
  actualEndDate: Date;
  plannedHours: number | null;
  actualHours: number | null;
  isCase: boolean;
  isTemplate: boolean;
  isPublished: boolean;
  inactive: boolean;
  isDeleted: boolean;
  deliverables: null;
  isFollowUp: boolean | null;
  followUpNumber: null;
  recordGoals: number;
  countFilledForms: number;
  projectId: number;
  projectName: string;
  tasksAssignees: TasksAssignee[];
}

export interface TasksAssignee {
  id: number;
  taskId: number;
  userId: number;
  readOnly: boolean;
  isAprover: null;
  userDataResponseModel: null;
}


export interface GlobalAssignee {
  userDataResponseModel?: UserDataResponseModel;
  id?: number;
  taskId?: number;
  milestoneId?: number;
  workFlowId?: number;
  projectid?: number;
  noteId?: number;
  userId: number;
  readOnly?: boolean;
  isAprover?: boolean;
  hasToSign?: boolean;
  hasSigned?: boolean;
  task?: null;
}



export interface UserDataResponseModel {
  id: number;
  fullName: string;
  userName: string;
  email: string;
  imageProfilePath: string;
  firstName?: string;
  lastName?: string;
}

export interface Milestone {
  id: number,
  creationDate: Date,
  updateDate: Date,
  workFlowId: number,
  milestoneParentId: number,
  title: string,
  description: string,
  stateId: number,
  priorityId: number,
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
}


export interface CreatorTask {
  milestoneId: number,
  taskParentId: number,
  title: string,
  description?: string,
  stateId: string,
  priorityId: string,
  createdBy: number,
  plannedEndDate: Date,
  plannedStartDate: Date,
  creationDate: Date,
  isCase: boolean,
}

export interface UpdateTaskI {
  id: number,
  updateDate: Date,
  milestoneId: number,
  taskParentId: number,
  title: string,
  description: string,
  stateId: string,
  priorityId: string | number,
  updatedBy: number,
  plannedEndDate: Date,
  plannedStartDate: Date,
  inactive: boolean,
  isDeleted: boolean,
  isCase: boolean,
}

export interface SelectsTasks {
  label: string | number,
  value: string | number
}

export interface FetchAproveTask {
  taskId: number,
  state: number
}

export interface linkTaskToMilestone {
  taskid: number;
  milestoneId: number;
}

export interface ReplicateTask {
  forms: Form[];
  tasks: TaskI[];
}

export interface TaskInOuterMilestonesRequest {
  MilestoneId: number;
  TaskId: number;
  ReadOnly: boolean;
}

export interface TasksInOuterMilestones {
  id: number;
  milestoneId: number;
  taskId: number;
  readOnly: boolean;
  milestone: Milestone[];
  task: TaskI[];
}

export interface GetTaskListWithoutLazy {
  milestoneId: number;
  showBookmarksOnly: boolean;
  createdInitialDate: string | undefined | null;
  createdFinalDate: string | undefined | null;
  assignedUserId: number[];
  state: number;
  taskId: number;
  nameTask: string;
}