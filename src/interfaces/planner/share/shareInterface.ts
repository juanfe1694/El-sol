

export interface Assign {
    id?:        number;
    itemId?:    number;
    userId:    number;
    readOnly?:  boolean;
    isAprover?: boolean;
    hasToSign?:boolean;
    hasSigned?: boolean;

    userDataResponseModel?: UserDataResponseModel;
    actualRole?:actualRole

}

export interface actualRole {
    name:string,
    code:string
}



export interface UserDataResponseModel {
    id:               number;
    fullName:         string;
    userName:         string;
    email:            string;
    imageProfilePath: string;
  }