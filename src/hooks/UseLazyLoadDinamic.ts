import React from 'react'
import { useAppSelector } from '../app/hooks';



export const UseLazyLoadDinamic = (
  typeItem: string,
  activeWorkflowTypePlus: number | undefined,
  sortOrder: string) => {

  const { lazyProjects, project } = useAppSelector((state) => state.project);

  const { lazyWorkflows, workflow, lazyWorkflowsDetail } = useAppSelector(
    (state) => state.workflow
  );

  const { lazyMilestones, milestone, lazyMilestonesDetail } = useAppSelector(
    (state) => state.milestone
  );
  const { lazyTask, lazyTaskDetail } = useAppSelector((state) => state.task);

  const { lazyUser } = useAppSelector((state) => state.user);


  const fieldDetail =
    typeItem === "workflowByProject"
      ? "workFlowParentId"
      : typeItem === "milestoneByWorkflow"
        ? "workflowId"
        : "milestoneId";

  const parentIdDetail =
    fieldDetail === "workFlowParentId"
      ? project?.workFlowId
      : fieldDetail === "workflowId"
        ? workflow?.id
        : milestone?.id;

  const lazyDetail =
    typeItem === "workflowByProject"
      ? lazyWorkflowsDetail
      : typeItem === "milestoneByWorkflow"
        ? lazyMilestonesDetail
        : lazyTaskDetail;

  //Segun la ubicacion copiar el estado global de lazy y modificarlo segun el ordenamiento
  const lazyElementLayout =
    typeItem === "project"
      ? lazyProjects
      : typeItem === "workflow"
        ? lazyWorkflows
        : typeItem === "milestone"
          ? lazyMilestones
          : typeItem === "Users"
            ? lazyUser
            : lazyProjects;

  //Se utiliza en los layout
  const lazyLayout = {
    ...lazyElementLayout,
    sort: [
      {
        field: "creationDate",
        dir: sortOrder,
      },
    ],
  };

  //Se utiliza en los detalles
  const lazyElementDetail = {
    ...lazyDetail,
    sort: [
      {
        field: "creationDate",
        dir: sortOrder,
      },
    ],
  };

  const lazyElementDetailProject = {
    ...lazyDetail,
    sort: [
      {
        field: "creationDate",
        dir: sortOrder,
      },
    ],
  };

  return {
    //Lazy
    lazyLayout,
    lazyElementDetail,
    lazyElementDetailProject,

    //props
    fieldDetail,
    parentIdDetail,
    lazyDetail,
    lazyElementLayout

  }
}
