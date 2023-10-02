import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from "../redux/slices/authSlice";
import { userReducer } from '../redux/slices/userSlice';
import { searchReducer } from '../redux/slices/searchSlice';
import { projectReducer } from './../redux/slices/planner/projects/projectsSlice';
import { workflowReducer } from '../redux/slices/planner/workflow/workflowSlice';
import { taskReducer } from '../redux/slices/planner/task/taskSlice';
import { milestoneReducer } from '../redux/slices/planner/milestones/milestoneSlice';


import { profileReducer } from '../redux/slices/profileSlice';
import { formsLinksReducer } from '../redux/slices/forms/formsLinksSlice';
import { formsRelatedReducer } from '../redux/slices/planner/forms/formsRelatedSlice';
import { generalStateReducer } from '../redux/slices/planner/generalStatesSlice';
import { filledFormReducer } from '../redux/slices/forms/filledFormSlice';
import { caseFamilyGroupReducer } from '../redux/slices/planner/caseFamilyGroup/caseFamilyGroupSlice';
import { notificationsReducer } from '../redux/slices/notifications/notificationSlice';
import { documentReducer } from '../redux/slices/documents/documentsSlice';
import { connectionReducer } from '../redux/slices/connection/connectionSlice';
import { formInUseReducer } from '../redux/slices/forms/formInUse.Slice';


/* Creating a store with the reducers. */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    search: searchReducer,
    project: projectReducer,
    workflow: workflowReducer,
    milestone: milestoneReducer,
    task: taskReducer,
    profile: profileReducer,
    formLink: formsLinksReducer,
    formRelated: formsRelatedReducer,
    generalState: generalStateReducer,
    filledForms: filledFormReducer,
    formInUse: formInUseReducer,
    caseFamilyGroup: caseFamilyGroupReducer,
    notifications: notificationsReducer,
    documents: documentReducer,
    connection: connectionReducer
   },

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch