import { View } from "react-native";
import { useAppSelector } from "../app/hooks";
import React from "react";


type Args = {
  permissions: string;
  entity: string;
  children: React.ReactNode;
};

export const CheckPermission = ({ children, entity, permissions }: Args) => {
  const { authPermissions } = useAppSelector((state) => state.auth);
  const check =
    authPermissions.find(
      (p) => p.Permissions == permissions && p.Entity == entity
    )?.Permissions == permissions && entity !== undefined ;

  return check ? <View>{children}</View> : null;
};
