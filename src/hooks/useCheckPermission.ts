import { useAppSelector } from "../app/hooks";

type Args = {
  permissions: string;
  entity: string;
};

export const useCheckPermission = ({ entity, permissions }: Args) => {
  const { authPermissions } = useAppSelector((state) => state.auth);
  const check =
    authPermissions.find(
      (p) => p.Permissions == permissions && p.Entity == entity
    )?.Permissions == permissions && entity !== undefined ;

  return check
};

