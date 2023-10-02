import {  FormTemplate } from "../../interfaces/form/formInterfaces";


export interface GeneralOptionForm
{ name:string, key:string, value:boolean}

export interface FormsItemCreatorArgs {
    typeId: number;
    index: number;
    droppableIndex:number;

  }
  export interface FormsGridItemCreatorArgs {
    typeId: number;
    index: number;
    droppableIndex:number;
    error:boolean;

    // FormsItemsCreator:FormItem[]
  /* The index of the item in the array. */
  }


  export interface FormsLogicItemCreatorArgs {
    typeId: number;
    index: number;
    droppableIndex:number;
    // error:boolean;

    // FormsItemsCreator:FormItem[]
  /* The index of the item in the array. */
  }


export interface FormItem {
  id: string;
  typeId:number;
  name: string;
  value: string;
  icon: string;
  page:string;
  visible:boolean;
  saved:boolean;


}


export interface FormBank {
    _id:          ID;
    Name:         Description[];
    Description:  Description[];
    CreatedBy:    number;
    CreatedAt:    EdAt;
    PublishedBy:  number;
    PublishedAt:  EdAt;
    FormTemplate: FormTemplate[];
    Inactive:     boolean;
    IsDeleted:    boolean;
    Options:      Options;
    FormURL:      string;
    IsPublished:  boolean;
    Istemplate:   boolean;
}

export interface EdAt {
    $date: DateClass;
}

export interface DateClass {
    $numberLong: string;
}

export interface Description {
    Language: string;
    Text:     string;
}

// export interface FormTemplate {
//     _id?:                ID;
//     QuestionTemplate:   QuestionTemplate;
//     QuestionCategoryId: number;
//     IsReportable:       boolean;
//     QuestionBankId:     ID;
// }

export interface ID {
    $oid: string;
}

export interface QuestionTemplate {
    FieldType:         string;
    Label:             Description[];
    Description:       Description[];
    AnswerOptions:     AnswerOption[];
    GridOptions:       GridOption[];
    Restrictions:      Restrictions;
    FieldConfigurator: FieldConfigurator;
}

export interface AnswerOption {
    Language: string;
    Options:  string[];
}

export interface FieldConfigurator {
    Min:   string;
    Max:   string;
    Step:  string;
    Icon:  string;
    Color: string;
}

export interface GridOption {
    Language: string;
    Columns:  string[];
    Rows:     string[];
}

export interface Restrictions {
    MandatoryAnswer:   boolean;
    AddOptNoneOfAbove: boolean;
    AddOptOther:       boolean;
}

export interface Options {
    General: General;
}

export interface General {
    Signature:   boolean;
    AttachPhoto: boolean;
}
