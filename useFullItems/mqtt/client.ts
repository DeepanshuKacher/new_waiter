import Paho from "paho-mqtt";
import { mqttFunction } from ".";
import { constants } from "../constants";
import { Alert } from "react-native";
import { getLocalStorageData } from "../localStorage";
import { SelfDataType } from "../redux-store/selfDetail";
import { reloadAsync } from "expo-updates";

export const mqttClient = async (restaurantId: string) => {
  const selfDetail: SelfDataType = await getLocalStorageData("selfDetail");

  if (!selfDetail) return Alert.alert("Please reset app");

  const client = new Paho.Client("mqtt.eatrofoods.com", 8883, selfDetail?.id);

  client.onMessageArrived = function (message) {
    try {
      mqttFunction(JSON.parse(message.payloadString));
    } catch (error) {
      console.log("mqttFunction error", error);
    }
  };
  client.connect({
    useSSL: true,
    onSuccess: function () {
      if (constants.IS_DEVELOPMENT) console.log("mqtt connected");
      const topicSelected = constants.mqttSubsribeTopic(restaurantId);
      client.subscribe(topicSelected);
    },
    onFailure: (cause) => {
      if (constants.IS_DEVELOPMENT) console.log("mqtt not connected", cause);
      Alert.alert("Some issues please restart app");
    },
  });
  client.onConnectionLost = () => {
    if (constants.IS_DEVELOPMENT) console.log("mqtt connection lost");
    if (constants.IS_DEVELOPMENT === false)
      setTimeout(() => {
        if (client.isConnected() === false) {
          Alert.alert("Connection lost please restart app", undefined, [
            {
              text: "Reload App",
              onPress: async () => await reloadAsync(),
            },
          ]);
        }
      }, 5000);
  };

  // setInterval(() => {
  //   console.log("is mqtt connected ", client.isConnected());
  // }, 1000);

  /*   let reconnectAttempt = 5;
  client.onConnectionLost = (error: Paho.MQTTError) => {
    if (constants.IS_DEVELOPMENT) console.log("connection lost", error);
    if (reconnectAttempt > 0) {
      setTimeout(() => {
        if (client.isConnected() === false) {
          if (constants.IS_DEVELOPMENT)
            console.log(client.isConnected(), "is mqtt connected");
          client.connect({
            useSSL: true,
            onSuccess: function () {
              if (constants.IS_DEVELOPMENT) console.log("mqtt re-connecting");
              reconnectAttempt -= 1;
              const topicSelected = constants.mqttSubsribeTopic(restaurantId);
              client.subscribe(topicSelected);
            },
          });
        }
      }, 1000);
    } else {
      Alert.alert("Some issues please restart app");
    }
  }; */
};
