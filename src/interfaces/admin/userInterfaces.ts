import { number } from "yup";

/* Defining the interface of the User object. */
export interface User {
    bookmarkedElementId(bookmarkedElementId: any): unknown;
    id?:                      number;
    creationDate?:            Date;
    imageProfilePath:string;
    documentId:              string;
    firstName:               string;
    lastName:                string;
    fullName:                string;
    userName:                string;
    password?:               string;
    email:                   string;
    phone:                   string;
    mobile:                  string;
    emailVerifiedAt?:         Date;
    changePasswordNextLogin?: boolean;
    lastPasswordChange?:      Date;
    loginAttempts?:           number;
    inactive?:                boolean;
    isDeleted?:               boolean;
    tokenResetPassword?:      string;
    usersInRoles?:            UsersInRole[];
}

export interface FetchResponseUsers  {
    data:User[],
    recordsCount:number
  }

/* Defining the interface of the UsersInRole object. */
export interface UsersInRole {
    id:     number;
    roleId: number;
    userId: number;
    role:   Role;
    user:   null;
}

/* Defining the interface of the Role object. */
export interface Role {
    id:                 number;
    creationDate:       Date;
    role:               string;
    inactive:           boolean;
    isDeleted:          boolean;
    rolesInPermissions: any[];
    usersInRoles:       any[];
}


export interface UserCreateFetch{
    id?:number,
    documentId: string,
    firstName: string,
    lastName: string,
    fullName: string,
    userName: string,
    password?: string,
    email: string,
    phone: string,
    mobile: string,
    changePasswordNextLogin?: boolean,
    isDeleted?: boolean
    inactive?: boolean
}

export interface Modal {
    displayModal:boolean;
    onHide:()=>void;
    data?:User
    }

export interface AddRolesFetch {
    userId:number,
    roleId:number[]
}

export interface UserProfileImagesViewModel{
    id : number;
    userId : number;
    path : string;
}