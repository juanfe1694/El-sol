import { fetchProjectsThunk } from './../redux/thunks/planner/projects/projectThunk';
import { useAppSelector } from './../app/hooks';
import { fetchWorkflowDetailProjectFavoriteThunk, fetchWorkflowDetailProjectThunk, fetchWorkflowFavoriteThunk, fetchWorkflowThunk } from './../redux/thunks/planner/workflow/workflowThunk';
import { fetchMilestonesFavoriteThunk, fetchMilestonesThunk } from './../redux/thunks/planner/milestones/milestonesThunk';
import { fetchTaskThunk, fetchTasksFavoriteThunk } from './../redux/thunks/planner/task/taskThunk';

export const UseFetchFavorite = () => {

  const { isProjectsFavorite } = useAppSelector((state) => state.project);
  const { isWorkflowsFavorite, isWorkflowsFavoriteDetail } = useAppSelector(
    (state) => state.workflow
  );
  const { isMilestonesFavorite, isMilestonesFavoriteDetail } = useAppSelector(
    (state) => state.milestone
  );
  const { isTaskFavorite } = useAppSelector((state) => state.task);

    //*Project
    const fetchProject =  fetchProjectsThunk;

    const fetchWorkflowChild = isWorkflowsFavoriteDetail
    ? fetchWorkflowDetailProjectFavoriteThunk
    : fetchWorkflowDetailProjectThunk;


    //*Workflows
    const fetchWorkflow = isWorkflowsFavorite
    ? fetchWorkflowFavoriteThunk
    : fetchWorkflowThunk;

    const fetchMilestonesChild = isMilestonesFavoriteDetail
    ? fetchMilestonesFavoriteThunk
    : fetchMilestonesThunk;


    //*Milestones
    const fetchMilestones = isMilestonesFavorite
    ? fetchMilestonesFavoriteThunk
    : fetchMilestonesThunk;

     const fetchTaskChild = isTaskFavorite
    ? fetchTasksFavoriteThunk
    : fetchTaskThunk;


  return {
    fetchProject,
    fetchWorkflowChild,
    fetchWorkflow,
    fetchMilestonesChild,
    fetchMilestones,
    fetchTaskChild
  }
}
