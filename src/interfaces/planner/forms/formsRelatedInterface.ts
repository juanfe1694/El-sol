import { MutableRefObject } from "react";
import { Form } from "../../form";


export interface FormsInTask {
    title?:string;
    FormsInUse:       Form;
    FormsId: number;
    CountfilledForms: number;
    RecordsGoal:      number;
}


export interface FetchAssignFormToTask {
    adminForm:              boolean;
    formBankId:           string;
    onlyForTaskResponsible: boolean;
    recordsGoal:            number;
    taskId:                 number;
}

export interface FormInTask {
    id?:                     number;
    adminForm?:              boolean;
    formsInUseId?:           string;
    onlyForTaskResponsible?: boolean;
    recordsGoal?:            number;
    taskId?:                 number;
    inactive?:               boolean;
}

export interface GoalProps {
    label: string;
    currentValue: number;
    onChange: (value: number) => void;
    onSave: () => void;
    loadingBtn: boolean;
    disabledBtn: boolean;
    onHide: (value: boolean) => void;
}