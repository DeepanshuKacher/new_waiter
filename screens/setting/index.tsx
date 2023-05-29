import { View, FlatList, StyleSheet, Alert } from "react-native";
import { RootTabScreenProps } from "../../types";
import { useTheme, Divider, List, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScreenWrapper from "../../ScreenWrapper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { reloadAsync } from "expo-updates";
import { useAppSelector } from "../../useFullItems/redux-store";

function Setting({ navigation }: RootTabScreenProps<"Logs">) {
  // const { colors } = useTheme();
  // const safeArea = useSafeAreaInsets();

  // const data = ["Reset", "Clear Data"];

  // const renderItem = ({ item }: { item: string }) => <List.Item title={item}  />;

  // const keyExtractor = (item: string) => item;

  const { city: restaurantCity, name: restaurantName } = useAppSelector(
    (store) => store.restaurantInfo.defaultValues
  );

  const selfInfo = useAppSelector((store) => store.selfInfo.defaultValues);

  return (
    <ScreenWrapper style={{ borderWidth: 2 }}>
      <View style={{ borderBottomWidth: 1.5, paddingVertical: 10 }}>
        <Text style={{ textAlign: "center" }} variant="titleLarge">
          {selfInfo?.name}
        </Text>
        <Text style={{ textAlign: "center" }} variant="titleMedium">
          {restaurantName}
        </Text>
        <Text style={{ textAlign: "center" }} variant="titleMedium">
          {restaurantCity}
        </Text>
      </View>
      <List.Item
        onPress={() => navigation.navigate("Logs")}
        title={() => <Text style={{ fontSize: 20 }}>Logs</Text>}
      />
      <List.Item
        onPress={() =>
          Alert.alert("Are you sure to reset", undefined, [
            {
              text: "Reset",
              onPress: async () => {
                await AsyncStorage.clear();
                await reloadAsync();
              },
            },
            {
              text: "Cancel",
            },
          ])
        }
        title={() => <Text style={{ fontSize: 20 }}>Reset</Text>}
      />
      <List.Item title="Headline" description="Supporting text" />
      <List.Item
        title="Headline"
        description="Supporting text that is long enough to fill up multiple lines in the item"
      />
    </ScreenWrapper>
  );
}

export default Setting;
