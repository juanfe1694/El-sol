export interface Comment {
  id:           number;
  creationDate: Date;
  updateDate:   null;
  taskId:       number;
  createdBy:    number;
  comment:      string;
  task:         null;
  }


 export interface FetchCommentAdd{

    creationDate: string;
    taskId:       string;
    createdBy:    number;
    comment:      string;


  }

  export interface FetchAllComments {
    item1: Comment;
    item2: CommentDataResponseModel;
}

export interface Item1 {
    id:           number;
    creationDate: Date;
    updateDate:   null;
    taskId:       number;
    createdBy:    number;
    comment:      string;
    task:         null;
}

export interface CommentDataResponseModel {
    id:               number;
    fullName:         string;
    userName:         string;
    email:            string;
    imageProfilePath: string;
}






  
  export interface ComentArgs {
    id: string;
    onSubmit?: (comment: Comment) => void;
    // visible:boolean;
    // setVisible:(state:boolean) => void;

  }