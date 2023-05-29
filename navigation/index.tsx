import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tables from "../screens/selectTable";
import Setting from "../screens/setting";
import SelectDish from "../screens/selectDish";
import Cart from "../screens/cart";
import { RootStackParamList, RootTabScreenProps } from "../types";
import { AntDesign } from "@expo/vector-icons";
import { Button, Menu, Divider, Text } from "react-native-paper";
import Summary from "../screens/summary";
import {
  store,
  useAppSelector,
  useAppDispatch,
  action_types,
} from "../useFullItems/redux-store";
import { Logs } from "../screens/logs";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  const tableSections = useAppSelector(
    (store) => store?.restaurantInfo?.defaultValues?.tables
  );

  const selectedTableSection = useAppSelector(
    (store) => store.selectedValues.defaultValues
  );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Root" component={BottomTabNavigator} />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={({ navigation }: RootTabScreenProps<"Cart">) => ({
            headerShown: true,
            animation: "none",
            // headerTitle: () => <Text variant="titleLarge">SectionA 3</Text>,
            headerRight: () => (
              <Button
                mode="contained-tonal"
                onPress={() => navigation.navigate("Summary")}
                // style={{ margin:  }}
              >
                Summary
              </Button>
            ),
          })}
        />
        <Stack.Screen
          name="Logs"
          component={Logs}
          options={{ headerShown: true, animation: "none" }}
        />
        <Stack.Screen
          name="Summary"
          component={Summary}
          options={{ headerShown: true, animation: "none" }}
        />
        <Stack.Screen
          name="Dishes"
          component={SelectDish}
          options={({ navigation }: RootTabScreenProps<"Dishes">) => ({
            headerShown: true,
            animation: "none",
            headerTitle: () => (
              <Text variant="titleLarge">
                {tableSections[selectedTableSection.selectedTableSection].name}(
                {
                  tableSections[selectedTableSection.selectedTableSection]
                    .prefix
                }
                {selectedTableSection.tableNumber}
                {
                  tableSections[selectedTableSection.selectedTableSection]
                    .suffix
                }
                )
              </Text>
            ),
            headerRight: () => (
              <Button
                mode="contained-tonal"
                icon="cart"
                onPress={() => navigation.navigate("Cart")}
                // style={{ margin:  }}
              >
                Cart
              </Button>
            ),
          })}
        />
      </Stack.Navigator>
      {/* <Stack.Group>
      </Stack.Group> */}
    </NavigationContainer>
  );
}

const BottomTab = createBottomTabNavigator<RootStackParamList>();

function BottomTabNavigator() {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const tableSections = useAppSelector(
    (store) => store?.restaurantInfo?.defaultValues?.tables
  );
  const selectedTableSection = useAppSelector(
    (store) => store.selectedValues.defaultValues.selectedTableSection
  );

  const dispatch = useAppDispatch();

  // console.log({ selectedTableSection });

  return (
    <BottomTab.Navigator screenOptions={{ headerShown: false }}>
      <BottomTab.Screen
        name="Tables"
        component={Tables}
        options={{
          headerShown: true,
          tabBarIcon: () => <TabBarIcon color="black" name="table" />,
          headerTitle: () => (
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <Button
                  icon="chevron-down"
                  labelStyle={{ fontSize: 18 }}
                  onPress={openMenu}
                  contentStyle={{ flexDirection: "row-reverse" }}
                >
                  {tableSections[selectedTableSection]?.name}
                </Button>
              }
            >
              {tableSections?.map((sectionDetail, index) => (
                <Menu.Item
                  onPress={() => {
                    dispatch(action_types.updateSelectedTableSection(index));
                  }}
                  key={sectionDetail.id}
                  title={sectionDetail.name}
                />
              ))}
            </Menu>
          ),
        }}
      />
      <BottomTab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: () => <TabBarIcon color="black" name="setting" />,
          headerShown: true,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof AntDesign>["name"];
  color?: string;
}) {
  return <AntDesign size={30} style={{ marginBottom: -3 }} {...props} />;
}
