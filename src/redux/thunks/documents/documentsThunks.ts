import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CreatorDocumentRequest, PublishedInterface } from "../../../interfaces/documents/publishDocumentsInterface";

const url = process.env.EXPO_PUBLIC_VITE_API_URL_DOCUMENTATION;

export const publishDocument = async (body: CreatorDocumentRequest) => {
    const token: string = await AsyncStorage.getItem("Authorization") as string
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };

    try {
      const data = await axios.post<PublishedInterface>(`${url}/PublishDocuments/PublishDocumentToken`,body, { headers });
      return data;
    }
    catch (err: any) {
      throw err
    }
  }


