export interface WebSocketNotificationsResponse {
  type:      number;
  target:    string;
  arguments: Array<Argument[]>;
}

export interface Argument {
  notification: Notification;
  userData:     UserData | null;
}

export interface Notification {
  id:                number;
  createdAt:         Date;
  createdBy:         number;
  destinationUserId: number;
  notificationType:  NotificationType;
  itemSystem:        ItemSystem;
  itemController:    ItemController;
  itemId:            number;
  itemName:          string;
  isReaded:          boolean;
}

export enum ItemController {
  String = "string",
  TaskController = "TaskController",
  TaskReminders = "TaskReminders",
}

export enum ItemSystem {
  Notification = "Notification",
  String = "string",
  WorkFlow = "WorkFlow",
}

export enum NotificationType {
  Approved = "Approved",
  Rejected = "Rejected",
  Reminder = "Reminder",
  String = "string",
}

export interface UserData {
  id:               number;
  firstName:         string;
  lastName:string;
  userName:         string;
  email:            string;
  imageProfilePath: string;
}

