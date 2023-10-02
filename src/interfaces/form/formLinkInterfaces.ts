import { FormInUse } from "./formInUseInterfaces";

export interface FormLink {
    Id: string;
    FormsInUseId: string,
    FormURL: string,
    IsBlocked: boolean,
    LinkUseType: string,
    IsUsed: boolean,
    UseStartTime: Date,
    UseEndTime: Date,
    IsOpen: boolean,
    CreatedAt: Date,
    CreatedBy: number
}

export interface FormLinksRequest
    {
         FormsInUseId: string,
         LinkUseType: string,
         UseStartTime?: Date,
         UseEndTime?: Date
    }

export interface ValidateFormLinkRequest
    {
          FormLinkId : string,
          CurrentDateClient : Date,
          ValidationRequestType : string
    }

    export interface FormLinksResponse
    {
        FormLinkIsValid: boolean,
        FormsInUseByProject: FormInUse
    }

    export interface DynamicFormRender{
        formInUse : FormInUse;
        formLink : string;
    }
