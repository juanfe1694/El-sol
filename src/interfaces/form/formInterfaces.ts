
import {FormItem} from './formCreatorBankInterfaces'



export interface RefactFormData  {
    id: string;
    FormName?: string;
    //FormCreator: string;
    CreationDate: Date;
    PublishedDate: Date;
    FormStatus: string;
    FormURL?: string;
    Istemplate: boolean;
  }


export interface Form {
    projectId?: number,
    title?:string,
    Id?: string;
    Name: Name[];
    Description?: Description[]
    CreatedBy?: number;
    CreatedAt?: string;
    PublishedBy?: number;
    PublishedAt?: string;
    FormTemplate?: FormTemplate[];
    Inactive: boolean;
    IsDeleted: boolean;
    FormOptions?:Options;
    FormURL?: string;
    IsPublished: boolean;
    Istemplate: boolean;
}

export interface Name {
  Language?: string;
  Text?: string;
}

export interface General{
    Signature?: boolean;
    AttachPhoto?: boolean;
    AditionalLanguage?:boolean
}

export interface Options{
    General?: General;
}

export interface Description{
    Language?: string;
    Text?: string;
}

export interface FormTemplate{
    Id?:string
    QuestionId?: string;
    QuestionTemplate: QuestionTemplate;
    QuestionCategoryId?: number  | string;
    IsReportable: boolean;
    QuestionBankId?: string;
    Page: number |undefined;
    PageId?:string;
    creationModel?:FormItem;
    Inactive?: boolean;
    IsDeleted?: boolean;

}


export interface PagesType {
    uuid: any;
    items: FormTemplate[];
  };

  export interface QuestionTemplate{
    FieldType?: string;
    Label: Label[];
    Description: Description[];
    AnswerOptions?: AnswerOptions[];
    GridOptions?: GridOptions[];
    Restrictions?: Restrictions;
    FieldConfigurator?: FieldConfigurator;
}

export interface Label{
    Language?: string;
    Text?: string;
}
export interface AnswerOptions{
    Language: string;
    Options: OptionsObject[];
}

type OptionsDropdown = {
    name: string, code: any,
 
 }

export interface OptionsObject{
    Option: string;
    LogicalPosition: number | null;
    pageSelected?: OptionsDropdown
    itemSelected?: OptionsDropdown
}

export interface GridOptions{
    Language?: string;
    Columns?: string[];
    Rows?: string[];

}

export interface Restrictions{
    MandatoryAnswer: boolean;
    AddOptNoneOfAbove:boolean;
    AddOptOther: boolean;

}

export interface FieldConfigurator{
    Min?: number | string;
    Max?: number | string;
    Step?: number | string;
    Icon?: string;
    Color?: string;

}

export interface FormResponse{
    Data: Form[],
    RecordsCount: number
}

export interface LoadImageRequest{
    id: string;
    contentFile: string;
    extension: string;
}



