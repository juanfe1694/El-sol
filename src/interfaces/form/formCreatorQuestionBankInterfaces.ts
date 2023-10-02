export interface FormQuestionBank {
    Id:                 string;
    QuestionTemplate:   QuestionTemplate;
    QuestionCategoryId: number;
    IsReportable:       boolean;
    Inactive:           boolean;
    IsDeleted:          boolean;
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
    Language: Language;
    Options:  string[];
}

export enum Language {
    English = "English",
    Spanish = "Spanish",
}

export interface Description {
    Language: Language;
    Text:     string;
}

export interface FieldConfigurator {
    Min:   null | string;
    Max:   null | string;
    Step:  null | string;
    Icon:  null | string;
    Color: null | string;
}

export interface GridOption {
    Language: Language;
    Columns:  string[];
    Rows:     string[];
}

export interface Restrictions {
    MandatoryAnswer:   boolean | null;
    AddOptNoneOfAbove: boolean | null;
    AddOptOther:       boolean | null;
}
