export interface PublishDocumentInterface {
  name: string;
  extension: string;
  dueDate: string;
  forceDueDate?: boolean;
  folderId: number;
  system: string;
  entity: string;
  entityId: number;
  description?: string;
  documentCategoryId: number;
  connectionId: string;
  containerName: string;
  contentFile: string;
}



export interface PublishedInterface {
  id: number;
  name: string;
  extension: string;
  documentStatusId: number;
  dueDate: string;
  forceDueDate: boolean;
  folderId: number;
  system: string;
  entity: string;
  entityId: number;
  description: string;
  documentCategoryId: number;
  isDeleted: boolean;
  documentCategory: {
    id: number;
    documentCategory: string;
    currentVersionsRetentionTimeInDays: number;
    oldVersionsRetentionTimeInDays: number;
    maxSizeInBytes: number;
    documentStorageId: number;
    isDeleted: boolean;
    documentStorage: {
      id: number;
      storageName: string;
      container: string;
      isDeleted: boolean;
      documentsCategories: string[];
      documentsVersions: string[];
    };
    documents: string[];
  };
  documentStatus: {
    id: number;
    name: string;
    isDeleted: boolean;
    documents: string[];
  };
  documentsVersions: {
    id: number;
    documentId: number;
    fileUuid: string;
    version: number;
    createdAt: string;
    versionComment: string;
    isCurrent: boolean;
    versionerId: number;
    sizeInBytes: number;
    documentStorageId: number;
    automaticallyDeletedAt: string;
    document: string;
    documentStorage: {
      id: number;
      storageName: string;
      container: string;
      isDeleted: boolean;
      documentsCategories: string[];
      documentsVersions: string[];
    };
    documentsRejections: {
      id: number;
      documentVersionId: number;
      rejectedAt: string;
      rejectUserId: number;
      rejectReason: string;
      isRefused: boolean;
      refusedReason: string;
      documentVersion: string;
    }[];
    documentsVersionsSignatures: {
      id: number;
      documentVersionId: number;
      documentAssignmentId: number;
      signatureId: number;
      signedAt: string;
      documentAssignment: {
        id: number;
        documentAssignmentDate: string;
        userId: number;
        documentRoleId: number;
        documentationProcessId: number;
        groupActionOrder: number;
        doneDate: string;
        system: string;
        entity: string;
        entityId: number;
        documentVersionId: number;
        documentsVersionsHistory: {
          id: number;
          documentAssignmentId: number;
          historyActionId: number;
          actionDateTime: string;
          documentAssignment: string;
          historyAction: {
            id: number;
            name: string;
            isDeleted: boolean;
            documentsVersionsHistory: string[];
          };
        }[];
        documentsVersionsSignatures: string[];
        documentRole: {
          id: number;
          name: string;
          description: string;
          isAction: boolean;
          isDeleted: boolean;
          documentsAssignments: string[];
        };
      };
      documentVersion: string;
    }[];
  }[];
  folder: {
    id: number;
    folderName: string;
    parentFolderId: number;
    createdAt: string;
    createdBy: number;
    isDeleted: boolean;
    documents: string[];
  };
}

export interface CreatorDocumentRequest {
    name: string, 
    extension: string, 
    dueDate: Date, 
    forceDueDate?: boolean, 
    folderId: number,
    system: string , 
    entity: string, 
    entityId: number, 
    description?: string, 
    documentCategoryId: number,
    connectionId: string,
    containerName: string,
    contentFile: string
}


export interface PublishDocumentRequest {
    name: string, 
    extension?: string, 
    dueDate?: Date, 
    forceDueDate?: boolean, 
    folderId?: number,
    system?: string , 
    entity?: string, 
    entityId?: number, 
    description?: string, 
    documentCategoryId?: number,
    connectionId?: string,
    containerName?: string,
    contentFile: string
}
