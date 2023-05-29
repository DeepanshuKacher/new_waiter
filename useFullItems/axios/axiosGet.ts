import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { urls } from ".";
import { constants } from "../constants";
import { concatString } from "../functions/private";
import { Alert } from "react-native";

export const axiosGetFunction = async ({
  parentUrl,
  thenFunction,
  childUrl = "",
  config,
  finallyFunction,
}: //   useGlobalLoader,
{
  thenFunction?: any;
  parentUrl: keyof typeof urls;
  childUrl?: string;
  config?: AxiosRequestConfig;
  finallyFunction?: any;
  //   useGlobalLoader?: boolean;
}) => {
  //   if (useGlobalLoader) store.dispatch(actionTypes.updateLoaderState(true));
  return await axios
    .get(concatString(parentUrl, childUrl), config)
    .then((response) => {
      if (thenFunction) {
        thenFunction(response.data);
      } else return response.data;
    })
    .catch((error: AxiosError) => {
      // alert("Error " + error.name);
      if (constants.IS_DEVELOPMENT)
        console.log({
          error,
          errorCause: error.cause,
          errorMessage: error.message,
          errorName: error.name,
          errorConfig: error.config,
          errorCode: error.code,
          errorStatus: error.status,
        });
      if (error.message === "Request failed with status code 500")
        alert("Server Error");
      else {
        Alert.alert("Some Error");
      }
    })
    .finally(() => {
      if (finallyFunction) finallyFunction();
      //   if (useGlobalLoader) store.dispatch(actionTypes.updateLoaderState(false));
    });
};
