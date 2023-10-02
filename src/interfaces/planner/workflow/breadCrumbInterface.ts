export interface BreadCrumbInterface {
  id: string;
  label: string;
  url: string;
  type: string
}

export interface BodyBreadCrumb {
  elementId: number,
  elementType: "Project" | "WorkFlow" | "Milestone" | "SubTask" | "Task",
}
