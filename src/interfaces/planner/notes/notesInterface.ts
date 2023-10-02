export interface FetchGetAllNotes{
    projectId: number,
    createdBy: number,
    notesAssignees: string[]
  }

  export interface Note {
    id:             number;
    projectId:      number;
    title:          string;
    stateId:        number;
    content:        string;
    startDate:      string;
    endDate:        string;
    createdBy:      number;
    createdAt:      Date;
    state:          null;
    notesAssignees: NoteAssignee[];
}

export interface FetchResponseNotes  {
  data:Note[],
  recordsCount:number
}


export interface FetchUpdateNote {
  content:   string;
  noteId:    number;
  stateId:   number;
  title:     string;
  startDate?: Date;
  endDate?:   Date;
}

export interface FetchCreateNote {
  content:   string;
  stateId:   number;
  projectId:number
  title:     string;
  startDate?: Date;
  endDate?:   Date;
}



export interface NoteAssignee {
  id?:        number;

  noteId:    number;
  userId:    number;
  hasToSign: boolean;
  hasSigned: boolean;
  userDataResponseModel?: UserDataResponseModel;

}




export interface UserDataResponseModel {
  id:               number;
  fullName:         string;
  userName:         string;
  email:            string;
  imageProfilePath:  string;
}
