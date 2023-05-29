import { useState, useEffect } from "react";
import { Alert, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";
import { Provider as PaperProvider } from "react-native-paper";
import store from "./useFullItems/redux-store/store";
import { Provider as ReduxProvider } from "react-redux";
import { getLocalStorageData } from "./useFullItems/localStorage";
import Loader from "./screens/loader";
import EnterToken from "./screens/enterToken";
import { constants } from "./useFullItems/constants";
import axios from "axios";
import { RestaurantSliceType } from "./interfaces";
import { action_types } from "./useFullItems/redux-store";
// import * as mqtt from "mqtt"; // import everything inside the mqtt module and give it the namespace "mqtt"
import { onLoad } from "./useFullItems/functions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mqttClient } from "./useFullItems/mqtt/client";
import { SelfDataType } from "./useFullItems/redux-store/selfDetail";
import GlobalLoader from "./components/GlobalLoader";

axios.defaults.baseURL = constants.IS_DEVELOPMENT
  ? constants.development_server_url
  : constants.production_server_url;

export default function App() {
  const [appStartState, setAppStartState] = useState<
    "loading" | "start" | "token"
  >("loading");

  // let topicSelected: string;

  useEffect(() => {
    // let client: Paho.Client;
    (async () => {
      Alert.alert(`IS_DEVELOPMENT ${constants.IS_DEVELOPMENT}`);
      const getAccessIdPromis: Promise<string | null> =
        getLocalStorageData("accessId");
      const getRestaurantDetailPromis: Promise<RestaurantSliceType> =
        getLocalStorageData("restaurantDetail");
      const getSelfInfoPromis: Promise<SelfDataType> =
        getLocalStorageData("selfDetail");

      const [accessId, restaurantDetail, selfInfo] = await Promise.all([
        getAccessIdPromis,
        getRestaurantDetailPromis,
        getSelfInfoPromis,
      ]);

      if (accessId && restaurantDetail && selfInfo) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${accessId}`;

        store.dispatch(action_types.updateRestaurantInfo(restaurantDetail));

        store.dispatch(action_types.loadSelfData(selfInfo));

        mqttClient(restaurantDetail.id);

        await onLoad();
        setAppStartState("start");
      } else {
        await AsyncStorage.clear();
        setAppStartState("token");
      }
    })();
  }, []);

  if (appStartState === "start")
    return (
      <SafeAreaProvider>
        <PaperProvider>
          <StatusBar backgroundColor="black" />
          <ReduxProvider store={store}>
            <GlobalLoader />
            <Navigation />
          </ReduxProvider>
        </PaperProvider>
      </SafeAreaProvider>
    );
  else if (appStartState === "token") return <EnterToken />;
  else return <Loader />;
}
