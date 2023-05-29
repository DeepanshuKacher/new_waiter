import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { urls } from ".";
import { concatString } from "../functions/private";

export const axiosDeleteFunction = async ({
  parentUrl,
  thenFunction,
  childUrl = "",
  data,
}: //   useGlobalLoader,
{
  thenFunction?: any;
  parentUrl: keyof typeof urls;
  childUrl?: string;
  data: any;
  //   useGlobalLoader?: boolean;
}) => {
  //   if (useGlobalLoader) store.dispatch(actionTypes.updateLoaderState(true));
  return await axios
    .delete(concatString(parentUrl, childUrl), { data })
    .then((response) => {
      if (thenFunction) {
        thenFunction(response.data);
      } else return response.data;
    })
    .catch((error: AxiosError) => {
      alert("Some Error");
      console.log(error, error.cause, error.message, error.name, error.config);
    });
  // .finally(() => {
  // //   if (useGlobalLoader) store.dispatch(actionTypes.updateLoaderState(false));
  // });
};
