import { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { TextInput, Text, Button } from "react-native-paper";
import axios, { AxiosError } from "axios";
import { storeLocalStorageData } from "../../useFullItems/localStorage";
import { reloadAsync } from "expo-updates";
import { axiosGetFunction } from "../../useFullItems/axios/axiosGet";
import { Dish, Table } from "../../interfaces";
import { constants } from "../../useFullItems/constants";

const EnterToken = () => {
  const [tokenState, setTokenState] = useState<"valid" | "invalid">();
  const [tokenKey, setTokenKey] = useState("");
  const [blockButton, setBlockButton] = useState(false);

  const checkToken = () => {
    setBlockButton(true);
    axios
      .get(`waiters/${tokenKey}`)
      .then(async (result) => {
        const response: {
          accessToken: string;
          selfDetail: {
            name: string;
            id: string;
          };
          restaurantDetail: {
            city: string;
            dishesh: Dish[];
            id: string;
            name: string;
            tables: Table[];
          };
          settings: null | any;
        } = result.data;

        if (response === undefined) {
          return Alert.alert("Some server problem");
        }

        const storeAccessIdPromis = storeLocalStorageData(
            response?.accessToken,
            "accessId"
          ),
          storeRestaurantDetailPromis = storeLocalStorageData(
            response?.restaurantDetail,
            "restaurantDetail"
          ),
          storeSelfDetailPromis = storeLocalStorageData(
            response.selfDetail,
            "selfDetail"
          );

        await Promise.all([
          storeAccessIdPromis,
          storeRestaurantDetailPromis,
          storeSelfDetailPromis,
        ]).catch((error) => {
          if (constants.IS_DEVELOPMENT) console.log(error);
          Alert.alert("Some internal error");
        });
        if (response.settings)
          await storeLocalStorageData(response?.settings, "waiterSetting");
        await reloadAsync();
      })
      .catch((error: AxiosError) => {
        if (constants.IS_DEVELOPMENT) console.log(error);
        Alert.alert("Check Token error", error.code);
        setTokenState("invalid");
      })
      .finally(() => {
        setBlockButton(false);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <TextInput
        mode="outlined"
        style={{ margin: 8 }}
        label="Enter Token"
        placeholder="Enter Token"
        value={tokenKey}
        onChangeText={setTokenKey}
        left={<TextInput.Icon icon="key" />}
        // right={<TextInput.Affix text="/10" />}
      />
      <Button
        mode="contained-tonal"
        onPress={checkToken}
        disabled={blockButton}
        style={{ marginVertical: 4, marginLeft: 10, width: "30%" }}
      >
        Submit
      </Button>
      {tokenState === "invalid" && (
        <Text
          variant="bodyMedium"
          style={{ textAlign: "center", color: "red" }}
        >
          Invalid Token or Expired
        </Text>
      )}
      {tokenState === "valid" && (
        <Text
          variant="bodyMedium"
          style={{ textAlign: "center", color: "green" }}
        >
          Success reloading app
        </Text>
      )}
    </View>
  );
};

export default EnterToken;
