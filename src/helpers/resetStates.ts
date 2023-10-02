import { useAppDispatch } from './../app/hooks';
import { setLazyProjects } from './../redux/slices/planner/projects/projectsSlice';
import { setOnChangeLazy, setOnChangeWorkflowLazyDetail } from './../redux/slices/planner/workflow/workflowSlice';
import { onChangeLazyMilestones, onChangeLazyMilestonesDetail } from './../redux/slices/planner/milestones/milestoneSlice';
import { UseFetchFavorite } from './../hooks/UseFetchFavorite';
import { setOnChangeTaskLazyDetail } from './../redux/slices/planner/task/taskSlice';
import { changeLazy } from '../redux/slices/userSlice';
import { fetchUsersThunk } from '../redux/thunks/userThunk';

export const resetStates = () => {

  const dispatch = useAppDispatch();

   //Custom Hook fetch favorite
  const {
    fetchProject,
    fetchWorkflowChild,
    fetchWorkflow,
    fetchMilestonesChild,
    fetchMilestones,
    fetchTaskChild,
  } = UseFetchFavorite();

  const lazyStatic = {
    rows: 10,
    page: 1,
    sort: [
      {
        field: "creationDate",
        dir: "desc",
      },
    ],
    filter: [
      {
        field: "isDeleted",
        value: "false",
        matchMode: "equals",
      },
      {
        field: "inactive",
        value: "false",
        matchMode: "equals",
      }
    ],
  }

  //*Users

  const resetUsers = () => {
    dispatch(changeLazy(lazyStatic));
    dispatch(fetchUsersThunk(lazyStatic))
  }


  //*projects
  const resetProjects = () => {
    dispatch(setLazyProjects(lazyStatic));
    dispatch(fetchProject(lazyStatic));
  }

  //Detail project
  const resetWorkflowByProject = (parentId: string) => {
    let lazyWorkflowsReset = {
            rows: 10,
            page: 1,
            sort: [
              {
                field: "creationDate",
                dir: "desc",
              },
            ],
            filter: [
              {
                field: "workFlowParentId",
                value: parentId!,
                matchMode: "equals",
              },
            ],
          };

    dispatch(setOnChangeWorkflowLazyDetail(lazyWorkflowsReset));
    dispatch(fetchWorkflowChild(lazyWorkflowsReset));
  }

  //*workflows
  const resetWorkflows = () => {
    dispatch(setOnChangeLazy(lazyStatic));
    dispatch(fetchWorkflow(lazyStatic));
  }

  //Workflow detail
  const resetMilestonesByWorkflow = (parentId: string) => {
    let lazyWorkflowsReset = {
            rows: 10,
            page: 1,
            sort: [
              {
                field: "creationDate",
                dir: "desc",
              },
            ],
            filter: [
              {
                field: "workflowId",
                value: parentId!,
                matchMode: "equals",
              },
            ],
          };

    dispatch(onChangeLazyMilestonesDetail(lazyWorkflowsReset));
    dispatch(fetchMilestonesChild(lazyWorkflowsReset));
  }

  //*milestones
  const resetMilestones = () => {
    dispatch(onChangeLazyMilestones(lazyStatic));
    dispatch(fetchMilestones(lazyStatic));
  }

  //* tasks by milestones
  const resetTasksByMilestone = (parentId: string) => {
    let lazyMilestonesByWorkflowReset = {
            rows: 10,
            page: 1,
            sort: [
              {
                field: "creationDate",
                dir: "desc",
              },
            ],
            filter: [
              {
                field: "milestoneId",
                value: parentId!,
                matchMode: "equals",
              },
            ],
          };
    dispatch(setOnChangeTaskLazyDetail(lazyMilestonesByWorkflowReset));
    dispatch(fetchTaskChild(lazyMilestonesByWorkflowReset));
  }


  // //*tasks
  // const resetTasks = () => {
  //   dispatch(setResetSummaryItem());
  //   dispatch(fetchTaskThunk(lazyTask));
  // }

  // //*Sub tasks
  // const resetSubTasks = (parentId: string) => {
  //   dispatch(setResetSummaryItem());
  //   dispatch(
  //     fetchTaskThunk({
  //       ...lazyTask,
  //       filter: [{
  //         field: "taskParentId",
  //         value: parentId,
  //         matchMode: "equals",
  //       }]
  //     })
  //   );
  // }

  return {
    resetUsers,
    resetProjects,
    resetWorkflowByProject,
    resetWorkflows,
    resetMilestonesByWorkflow,
    resetMilestones,
    resetTasksByMilestone,
    // resetTasks,
    // resetSubTasks
  }
}
