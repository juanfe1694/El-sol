export const useCheckNavigationData = (data: any[], authPermissions: any[]) => {
  return data.filter(card => {
    if (Array.isArray(card.entity)) {
      const matchingEntities = card.entity.filter((entity:any) =>
        authPermissions.some(
          permission =>
            permission.Entity === entity && permission.Permissions === card.permissions
        )
      );
      if (matchingEntities.length > 0) {
        card.entity = matchingEntities[0];
        return true;
      }
      return false;
    } else {
      const matchingEntity = authPermissions.find(
        permission =>
          permission.Entity === card.entity && permission.Permissions === card.permissions
      );
      return matchingEntity ? true : false;
    }
  });
};