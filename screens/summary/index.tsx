import { useState, useEffect } from "react";
import { FlatList, Alert } from "react-native";
import { Divider, List, Text, Button, MD2Colors } from "react-native-paper";
import OrderDetailDialog from "../../components/OrderDetail.Modal";
import { useAppSelector } from "../../useFullItems/redux-store";
import { fetchOrders } from "./hooks/fetchOrders";
import { Dish, Order, RetreveKotJson } from "../../interfaces";
import {
  axiosDeleteFunction,
  axiosPostFunction,
} from "../../useFullItems/axios";
import { RootTabScreenProps } from "../../types";
import { convertRedisOrderToOrder } from "../../useFullItems/functions";

function Summary({ navigation }: RootTabScreenProps<"Tables">) {
  const [showOrderInfo, setOrderInfo] = useState<Order>();
  const [orderDish, setOrderDish] = useState<Dish>();

  const { allowWaiterToClearSession } = useAppSelector(
    (store) => store?.settings?.defaultValues
  );

  const { selectedTableSection: selectedTableSectionNumber, tableNumber } =
    useAppSelector((store) => store.selectedValues.defaultValues);

  const { tables, dishesh } = useAppSelector(
    (store) => store.restaurantInfo.defaultValues
  );

  const selectedTableSection = tables[selectedTableSectionNumber];

  const tableSessions = useAppSelector(
    (store) => store.tableStatus.tableDetail
  )?.[selectedTableSection.id]?.[tableNumber];

  const kot = fetchOrders(tableSessions!);

  const toggleShowOrderInfo = () => setOrderInfo(undefined);

  const totalPrice = () => {
    let totalPrice = 0;
    for (let x of kot) {
      const dish = dishesh.find((dish) => dish.id === x.value.dishId);
      totalPrice += calculatePrice(convertRedisOrderToOrder(x.value), dish);
    }
    return totalPrice;
  };

  const generateBillingNotification = () => {
    axiosPostFunction({
      parentUrl: "sessions",
      childUrl: "closeNotification",
      data: {
        tableSectionId: selectedTableSection.id,
        tableNumber: tableNumber,
      },
    });
  };

  const calculatePrice = (order: Order, dish?: Dish) => {
    let returnPrice = 0;
    const { size, fullQuantity, halfQuantity } = order;

    returnPrice = (fullQuantity || 0) * (dish?.price?.[size].full || 0);
    returnPrice += (halfQuantity || 0) * (dish?.price?.[size].half || 0);

    return returnPrice;
  };

  const keyExtractor = (item: RetreveKotJson) => item.id

  const renderItem = ({ item }: { item: RetreveKotJson }) => {
    const order = item;
    const dish = dishesh.find((dish) => dish.id === order.value.dishId);
    return (
      <List.Item
        key={order.id}
        title={dish?.name}
        onPress={() => {
          setOrderInfo(convertRedisOrderToOrder(order.value));
          setOrderDish(dish);
        }}
        right={() => (
          <Text style={{ fontWeight: "bold" }}>
            ₹ {calculatePrice(convertRedisOrderToOrder(order.value), dish)}
          </Text>
        )}
      />
    );

    // return (
    //   <>
    //     {item.map((order) => {
    //       const dish = dishesh.find((dish) => dish.id === order.value.dishId);

    //       return (
    //         <List.Item
    //           key={order.id}
    //           title={dish?.name}
    //           onPress={() => {
    //             setOrderInfo(convertRedisOrderToOrder(order.value));
    //             setOrderDish(dish);
    //           }}
    //           right={() => (
    //             <Text style={{ fontWeight: "bold" }}>
    //               ₹ {calculatePrice(convertRedisOrderToOrder(order.value), dish)}
    //             </Text>
    //           )}
    //         />
    //       );
    //     })}
    //   </>
    // );
  };

  const clearSession = () => {
    if (tableSessions)
      axiosDeleteFunction({
        parentUrl: "sessions",
        childUrl: tableSessions,
        data: {
          tableSectionId: selectedTableSection.id,
          tableNumber: tableNumber,
        },
      });
  };

  return (
    <>
      <OrderDetailDialog
        dish={orderDish}
        order={showOrderInfo}
        close={toggleShowOrderInfo}
      />
      <FlatList
        // contentContainerStyle={{
        //   backgroundColor: colors.background,
        //   paddingBottom: safeArea.bottom,
        //   paddingLeft: safeArea.left,
        //   paddingRight: safeArea.right,
        // }}
        ListHeaderComponent={
          <Text
            variant="headlineSmall"
            style={{
              textAlign: "center",
              borderBottomWidth: 1,
              paddingBottom: 10,
              paddingTop: 5,
            }}
          >
            {selectedTableSection.name} {selectedTableSection.prefix}
            {tableNumber}
            {selectedTableSection.suffix}
          </Text>
        }
        ListFooterComponent={
          <>
            <Text
              variant="headlineSmall"
              style={{
                textAlign: "center",
                borderWidth: 2,
                backgroundColor: tableSessions ? undefined : "green",
              }}
            >
              Total = ₹{totalPrice()}
            </Text>
            {allowWaiterToClearSession && (
              <Button
                mode="contained-tonal"
                style={{
                  marginTop: 15,
                  backgroundColor: tableSessions ? MD2Colors.red100 : "red",
                }}
                onPress={() => {
                  if (tableSessions)
                    Alert.alert("Should Clear Session", undefined, [
                      { text: "Cancel" },
                      { text: "Clear Session", onPress: clearSession },
                    ]);
                  else {
                    navigation.navigate("Tables");
                  }
                }}
              >
                {tableSessions ? "Clear Session" : "Back To Home"}
              </Button>
            )}

            <Button
              mode="contained-tonal"
              style={{
                // marginTop: 15,
                marginVertical: 15,
                backgroundColor: tableSessions ? MD2Colors.red100 : "red",
              }}
              onPress={generateBillingNotification}
            >
              Generate Billing Notification
            </Button>
          </>
        }
        style={
          {
            // backgroundColor: colors.background,
          }
        }
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        data={kot}
      />
    </>
  );
}

export default Summary;
