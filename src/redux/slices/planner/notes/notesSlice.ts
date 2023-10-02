import { createSlice } from '@reduxjs/toolkit';
import { ErrorResponse } from '../../../../interfaces/functionalInterfaces';
import { FetchResponseNotes, Note } from '../../../../interfaces/planner/notes/notesInterface';


type InitialState = {
  notes: FetchResponseNotes,
  note?: Note,
  loading: boolean;
  error: ErrorResponse;
  idItem?: number;
  updateNote?: Note;
  createNote?: Note;

  richText: string
};

const initialState: InitialState = {
  notes: ({} as FetchResponseNotes),
  loading: false,
  error: {},
  richText: ''
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {

    resetState: (state) => {
      state.error = {};
      // state.notes = []
      state.updateNote = undefined
      state.createNote = undefined

    },


    setNotes(state, action) {
      state.notes = action.payload;
      state.loading = false;
    },

    setRichText(state, action) {
      state.richText = action.payload;
    },

    setResetRichText(state) {
      state.richText = '';
    },

    setUpdateNote(state, action) {
      state.updateNote = action.payload;
      state.loading = false;
    },

    setCreateNote(state, action) {
      state.createNote = action.payload;
      state.loading = false;
    },

    setIdItem(state, action) {
      state.idItem = action.payload;
    },


    setNote(state, action) {
      state.note = action.payload;
      state.loading = false;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    error: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

  },

});



export const {
  resetState,
  setNotes,
  setNote,
  startLoading,
  error,
  setIdItem,
  setUpdateNote,
  setRichText,
  setResetRichText,
  setCreateNote
} = notesSlice.actions;

export const notesReducer = notesSlice.reducer;

