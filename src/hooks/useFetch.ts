
import axios from "axios";
import  {FetchProps}  from "../interfaces/functionalInterfaces";


/* function responsible for making requests to the Back */
export const useFetch = async ( props:FetchProps) => {

  let {url,method,body} = props

  const security_url: string = <string> process.env.VITE_API_URL;

  /* Converting the body to a string. */
  body = JSON.stringify(body);

  const accept = "text/plain";


/* Creating a config object that will be used to make the request. */
  let config = {
    method: method,
    url: `${security_url}/${url}`,
    headers: {
      "Content-Type": "application/json",
      Accept: accept,
      Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
    },
    data: body,
  };

  /* Destructuring the data from the axios request. */
  const { data } = await axios(config);

  /* Returning the data from the request. */
  return data;
};
