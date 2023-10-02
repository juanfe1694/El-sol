import { createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../../../interfaces/planner/comments/commentsInterface';



type InitialState = {
    comments:Comment[],
    addComment:Comment,
    id?:string,
    visible:boolean,
    loading:boolean,
    error:boolean,
    errorData:{}

}

const initialState:InitialState = {
    comments: [
    ],
    visible:false,
  loading: false, 
  error: false,
  errorData:{},
  addComment:({} as Comment)
  
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },

    setVisible: (state) => {
      state.visible = !state.visible;
    },
    setId(state, action) {

      state.id = action.payload;
    },

    setAddComment(state,action){
      state.addComment = action.payload;
      state.loading = false;
    },

    setComments(state, action) {
      state.loading = false;
      state.comments = action.payload;
    },
    error: (state, action) => {
      state.errorData = action.payload;
      state.loading = false;
    },
  },
});

export const { startLoading, setComments, error,setVisible,setId,setAddComment } = commentsSlice.actions;

export const commentsReducer = commentsSlice.reducer;