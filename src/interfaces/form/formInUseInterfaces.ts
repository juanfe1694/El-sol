import { List } from "reselect/es/types";
import { Description, FormTemplate, Name, Options } from "./formInterfaces";

export interface FormInUse{
    projectId?: number;
    Id: string;
    Name: Name[];
    Description: Description[];
    CreatedBy: number;
    CreatedAt: Date;
    PublishedBy: number;
    PublishedAt: Date;
    FormTemplate: FormTemplate[];
    Inactive: boolean;
    IsDeleted:boolean;
    FormOptions?: Options;
    FormURL?: string;
    IsPublished: boolean;
    FormBankId?: string;
}

export interface RefactFormInUseData  {
    id: string;
    FormName?: string;
    FormCreator?: string;
    CreationDate?: Date;
    PublishedDate?: Date;
    FormStatus?: string;
    FormURL?: string;
    displayMessage?: (e: any) => void;
  }

  export  interface QuestionPos {
    logicalPosition: number;
    questionId: string;
    questionArrayIndex: number;
  }

  export interface FormsInUseResponse{
    FormsInUseByProject: FormInUse;
    CountfilledForms?: number;
    FormsId: number;
    RecordsGoal: number;
  }

  export interface Fields  {
    name: string;
    value: string | string[];
  }

