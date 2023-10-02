import { ErrorResponse } from '../functionalInterfaces';

export interface LoginResponse{
    token?:string,
    expiration?:string
  }

  export interface ForgotPasswordFetch{
    emailUser:string,
  }

  export interface CheckVerificationCodeFetch{
    emailUser:string,
    verificationCode:string
  }

  export interface UpdatePasswordFetch {
    email: string,
    activationCode: string,
    newPassword: string
  }
  export interface ResetPasswordFetch{
    password:string,
    confirmPassword?:string,
  }

  

  export interface RegisterResponse {
    title?: string;
    description?: string;
    resultCode?: string;
  }


  export interface UserCredentialsFetch {
    username: string;
    password: string;
  }

  export interface UserRegisterFetch {
    firstName:   string;
    lastName:    string;
    userName:    string;
    email:       string;
    newPassword: string;
    confirmPassword: string;
  }
   
  export interface CurrentUser {
    email: string,
    firstName: string,
    fullName: string,
    id: number,
    lastName: string,
    roles: string,
    userName: string,
    imageProfilePath: string,
  }


  export interface FetchValidation {
    result:                  CurrentUser;
    id:                      number;
    exception:               null;
    status:                  number;
    isCanceled:              boolean;
    isCompleted:             boolean;
    isCompletedSuccessfully: boolean;
    creationOptions:         number;
    asyncState:              null;
    isFaulted:               boolean;
}

