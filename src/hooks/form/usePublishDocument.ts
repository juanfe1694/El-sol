import React, { useState } from 'react'
import { ErrorResponse } from '../../interfaces/functionalInterfaces';
import { CreatorDocumentRequest, PublishDocumentRequest } from '../../interfaces/documents/publishDocumentsInterface';
import { publishDocument } from '../../redux/thunks/documents/documentsThunks';

export const usePublishDocument = () => {

  const [uploadError, setuploadError] = useState<ErrorResponse>()
  const [questionLabel, setQuestionLabel] = useState('')
  const [questionName, setQuestionName] = useState('')

  const publishDocuments = async (
    document: PublishDocumentRequest,
    questionLabel?: string,
    questionName?: string) => {

    const documentToUpload: CreatorDocumentRequest = {
      extension: ".png",
      dueDate: new Date("2024-08-04T20:04:57.457Z"),
      forceDueDate: true,
      folderId: 1,
      system: "DynamicServices",
      entity: "FilledForms",
      entityId: 1,
      description: "",
      documentCategoryId: 1,
      connectionId: "ConnectionStringStorage",
      containerName: "newcontainer",
      ...document
    }

    

    questionLabel && setQuestionLabel(questionLabel)
    questionName && setQuestionName(questionName)

    try {
      const { data } = await publishDocument(documentToUpload);
      return data
      
    } catch (error: any) {
      setuploadError(error);
      throw error;
    }
  };

  const getErrorMessage = () => {
    const message = 'file could not be loaded';
    if (uploadError?.message !== undefined) {
      return `${message}:\n
           ${questionLabel}: ${uploadError.message}`
    } else if (uploadError?.errorText !== undefined) {
      return `${message}:\n
            ${questionLabel}: ${uploadError.message}`
    } else if (uploadError?.title !== undefined) {
      return `${message}:\n
            ${questionLabel}: ${uploadError.title}`
    }
  }

  const clearError = () => {
    setuploadError(undefined)
  }

  return {
    publishDocuments,
    uploadError,
    getErrorMessage,
    questionName,
    clearError
  }
}
