import axios from "axios";
import { axiosGetFunction } from "../../axios";
import { Dish, Table } from "../../../interfaces";
import { Alert } from "react-native";
import { storeLocalStorageData } from "../../localStorage";
import { constants } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { reloadAsync } from "expo-updates";

export const fetchAllDataAndStore = async (latestCommitID: string) => {
  const data: {
    restaurantDetail: {
      city: string;
      dishesh: Dish[];
      id: string;
      name: string;
      tables: Table[];
    };
    selfDetail: {
      name: string;
      id: string;
    };
    settings: null | any;
  } = await axiosGetFunction({
    parentUrl: "waiters",
    childUrl: "restaurantDetail",
  });

  //   axios
  //     .get(`waiters/${tokenKey}`)
  //     .then(async (result) => {
  //       const response: {
  //         accessToken: string;
  //         restaurantDetail: {
  //           city: string;
  //           dishesh: Dish[];
  //           id: string;
  //           name: string;
  //           tables: Table[];
  //         };
  //         settings: null | any;
  //       } = result.data;

  if (data === undefined) {
    return Alert.alert("Some server problem");
  }

  if (data?.settings === "clear") {
    await AsyncStorage.clear();
    await reloadAsync();
  }

  const storeRestaurantDetailPromis = storeLocalStorageData(
    data?.restaurantDetail,
    "restaurantDetail"
  );

  const updateCommitID = storeLocalStorageData(
    latestCommitID,
    "latestCommitUUID"
  );

  const storeSelfDetailPromis = storeLocalStorageData(
    data.selfDetail,
    "selfDetail"
  );

  await Promise.all([
    storeRestaurantDetailPromis,
    updateCommitID,
    storeSelfDetailPromis,
  ]).catch((error) => {
    if (constants.IS_DEVELOPMENT) console.log(error);
    Alert.alert("Some internal error");
  });
  if (data.settings)
    await storeLocalStorageData(data?.settings, "waiterSetting");

  if (constants.IS_DEVELOPMENT) console.log("new update found");

  await reloadAsync();
};
