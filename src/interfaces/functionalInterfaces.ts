import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CurrentUser } from "./auth/authInterfaces";

/* Defining the interface for the fetch function. */
export interface FetchProps {
    url: string;
    method: string;
    body?: string | null;
  }
  export interface ErrorResponse {
    map?(arg0: (error: any) => any): unknown;
    title?: string;
    status?: string;
    message?: string;
    errorType?: string;
    errorText?: string;
    exception?: string;
    type?:string;
    traceId?: string;
  }

  export interface ErrorResponseModel {
    Title?: string;
    title?: string;
    errors?: string[];
    Status?: string;
    Message?: string;
    message?: string;
    ErrorType?: string;
    errorType?: string;
    ErrorText?: string;
    errorText?: string;
    Exception?: string;
  }


  export interface ExceptionResponse {
    errorType: string;
    errorText: string;
    exception: string;
  }

  export interface CorrectResponse {
    title: string;
    description: string;
    resultCode: string;
  }
  
  export interface AlertConfirmation {
  /**
   * Control visible state of modal
   */
    visible?: boolean;
  /**
   * Function control visible state
   */
    setVisible?: (state:boolean)=>void;
    /**
   * Get a function for accept interaction
   */
    accept:()=>void ;

  /**
   * Get a function for reject interaction
   */
    reject: ()=>void;

    /**
   * Message to show
   */
    message:string

  }

  export interface ModalNotesArgs {
    /**
     * Control visible state of modal
     */
      visible: boolean;
    /**
     * Function control visible state
     */
      setVisible: (state:boolean)=>void;
      projectId:number,
  
    }

  export interface SidebarArgs {
    //Elements to show in menu 
    menu?:TypeOfSidebarArgs[]
    authUserInfo:CurrentUser
    }
    export interface NavbarArgs {
      //Elements to show in menu 
      menu:TypeOfNavbarArgs[],
      rightItemns?:any
      isLoadingNavbar?:boolean
      }
    export interface TypeOfSidebarArgs{
      title: string,
      path: string,
      icon?: string,
      entity:string,
      permissions:string,
    }

    export interface TypeOfNavbarArgs{
      label: string,
      icon?: string,
      path: string,
      command?: ()=>void,
      disabled?:boolean,
      entity:string,
      permissions:string,


    }


  export interface SelectForm {
    name:string,
    code:string
  }


  export interface FilterLazyLoadDataTable {
    value: string;
    matchMode: string;
    }
    
    export interface LazyLoadDataTable {
    first: number;
    rows: number;
    page: number;
    sortField: any;
    sortOrder: any;
    filters: { [key: string]: FilterLazyLoadDataTable };
    }

  export interface CardPortalInterface {
    title:string,
    description:string,
    to:string,
    icon?:string,
    textColor:string

}
  
//Lazy Load Interfaces
export interface Lazy {
  rows:   number;
  page:   number;
  sort:   Sort[];
  filter?: FilterLazy[] ;
}

export interface FilterLazy {
  field:     string;
  value:     string;
  matchMode: string;
}

export interface Sort {
  field: string;
  dir:   string;
}


export interface Permission {
  Id:     number;
  System: string;
  Entity: string;
  Permissions: string;
}

export interface Filters {
  typeItem: string;
  parentId: string | undefined;
  activeWorkflowTypePlus: number | undefined;
  lazyOrderProp: string;
  isLoading: boolean;
}



export enum System {
  DynamicFormsServices = "DynamicFormsServices",
  EmailServices = "EmailServices",
  NotificationsServices = "NotificationsServices",
  ProjectsServices = "ProjectsServices",
  Security = "Security",
  WorkFlowServices = "WorkFlowServices",
}

export interface ManagedElement {
  id : number;
  title: string | undefined;
  type: 'Workflow' | 'Milestone' | 'Task' | '';
}

export interface NavigationProps extends NativeStackScreenProps<any, any>{}

export interface fileObject {
  uri: string;
  name: string;
  type: string;
  size?: number | undefined;
}

export interface StateInterface {
  data:         State[];
  recordsCount: number;
}

export interface State {
  id:        number;
  state:     string;
  inactive:  boolean;
  isDeleted: boolean;
}

export enum SyncStates {
  Pending = "Pending",
  Synchronizing = "Synchronizing",
  Synchronized = "Synchronized",
  Error = "Error"
}