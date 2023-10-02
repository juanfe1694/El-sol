export interface Permission {
  id:     number;
  system: string;
  entity: string;
  permissions: string;
  }

  export interface PermissionFetch {
    id:     number;
    system: string;
    entity: string;
    permissions: string;
  }


export interface RolesInPermission {
  id:     number;
  system: string;
  entity: string;
  permissions: string;

}


export interface FetchResponsePermissions  {
    data:Permission[],
    recordsCount:number
  }