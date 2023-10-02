export interface Role {
    id:                 number;
    creationDate?:       Date;
    role:               string;
    inactive:           boolean;
    isDeleted?:          boolean;
    rolesInPermissions?: any[];
    usersInRoles?:       any[];
}

export interface FetchResponseRoles  {
    data:Role[],
    recordsCount:number
  }

export interface AddPermissionsFetch {
    roleId:number,
    permissionsGroupId:number[]
}