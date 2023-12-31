import { List } from "reselect/es/types";
import { AnswerOptions } from "./formInterfaces";
import { PublishDocumentRequest } from "../documents/publishDocumentsInterface";
import { SyncStates } from "../functionalInterfaces";

export interface FilledForm{
    Name?: any;
    Id?: string;
    ImgStorageURL: string;
    ItemsResponses?: ItemsResponse[];
    SignatureStorageURL: string;
    FilledBy: number;
    FormLinkId?: string;
    FormsInUseId: string;
    OriginIP: string;
    FilledAt: Date | number;
}

export interface ItemsResponse{
    FieldType?: string;
    Label?: string;
    OptionSelected?: string[];
    OptionSelectedGrid?: OptionSelectedGrid[];
    IsReportable: boolean;
    QuestionId?: string;
    QuestionOrder?: number;
    QuestionBankId?: string;
    QuestionCategoryId?: string;
    DocumentUploaded?: { DocumentId: number }
    DocumentProperties?: PublishDocumentRequest;
}

export interface RefactFilledForm{
    FormName?: string;
    FilledBy: string;
    FilledAt: Date;
}

export interface OptionSelectedGrid{
    Column?: string[] | string;
    Row?: string[];
}

export interface GetFilledFormsRequest{
    Rows?: number;
    Page?: number;
    FilledBy?: number;
    FormsInUseId?: string;
    StartDate?: Date;
    EndDate?: Date;
}

export interface FormResponses {
    responses: ItemsResponse[];
    answerOptions: AnswerOptions[];
}

export interface FilledFormsResponse{
    Data: FilledForm[],
    RecordsCount: number
}

// Generated by https://quicktype.io

export interface FormInterface {
    Id:              string;
    Name:            Description[];
    Description:     Description[];
    CreatedBy:       number;
    CreatedAt:       string;
    PublishedBy:     number;
    PublishedAt:     string;
    FormTemplate:    FormTemplateSecond[];
    Inactive:        boolean;
    IsDeleted:       boolean;
    FormOptions:     FormOptions;
    FormURL:         string;
    IsPublished:     boolean;
    FormBankId:      string;
    Options:         null;
    UploadsFolderId: number | null;
    Istemplate:      boolean;
}

export interface Description {
    Language: Language;
    Text:     string;
}

export enum Language {
    English = "English",
    Spanish = "Spanish",
}

export interface FormOptions {
    General: General;
}

export interface General {
    Signature:         boolean;
    AttachPhoto:       boolean;
    AditionalLanguage: boolean;
}

export interface FormTemplateSecond {
    QuestionId:         string;
    QuestionTemplate:   QuestionTemplate;
    QuestionCategoryId: string;
    IsReportable:       boolean;
    QuestionBankId:     string;
    Page:               number;
    PageId:             string;
    QuestionOrder:      number | null;
}

export interface QuestionTemplate {
    FieldType:         string;
    Label:             Description[];
    Description:       Description[];
    AnswerOptions:     AnswerOption[];
    GridOptions:       GridOption[];
    Restrictions:      Restrictions;
    FieldConfigurator: FieldConfigurator;
    DocumentOptions:   DocumentOptions;
}

export interface AnswerOption {
    Language: Language;
    Options:  Option[];
}

export interface Option {
    Option:          string;
    LogicalPosition: null;
    PageSelected:    null;
    ItemSelected:    null;
}

export interface DocumentOptions {
    SizeInBytes:      number;
    AllowedFileTypes: AllowedFileType[];
}

export enum AllowedFileType {
    Heif = ".heif",
    Jpg = ".jpg",
    PDF = ".pdf",
    PNG = ".png",
}

export interface FieldConfigurator {
    Min:   string;
    Max:   string;
    Step:  string;
    Icon:  string;
    Color: string;
}

export interface GridOption {
    Language: Language;
    Columns:  string[];
    Rows:     string[];
}

export interface Restrictions {
    MandatoryAnswer:   boolean;
    AddOptNoneOfAbove: boolean;
    AddOptOther:       boolean;
}

export interface LocalForm {
    formState: SyncStates;
    formName: string;
    counter: number;
    form: ItemsResponse[]; 
    formsInUseId: string; 
    filledBy: number;
    filledAt: number;
}

export interface FormSyncState {
    formId: string;
    state: string;
}