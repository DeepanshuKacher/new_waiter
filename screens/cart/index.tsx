import { useState, useEffect } from "react";
import { Alert, FlatList, View } from "react-native";
import {
  Button,
  Checkbox,
  Divider,
  Text,
  TouchableRipple,
} from "react-native-paper";
import OrderDetailDialog from "../../components/OrderDetail.Modal";
import { useAppSelector } from "../../useFullItems/redux-store";
import { Order } from "../summary";
import { Dish } from "../../interfaces";
import {
  axiosDeleteFunction,
  axiosGetFunction,
  axiosPostFunction,
} from "../../useFullItems/axios";

function Cart() {
  /* store or states */
  const { tables, dishesh } = useAppSelector(
    (store) => store.restaurantInfo.defaultValues
  );
  const { selectedTableSection: selectedTableSectionNumber, tableNumber } =
    useAppSelector((store) => store.selectedValues.defaultValues);

  const selectedTableSection = tables[selectedTableSectionNumber];

  const tableSession = useAppSelector(
    (store) => store.tableStatus.tableDetail
  )?.[selectedTableSection.id]?.[tableNumber];

  const [showOrderInfo, setOrderInfo] = useState<Order>();
  const [orderDish, setOrderDish] = useState<Dish>();
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [cartOrders, setCartOrders] = useState<Order[]>([]);

  /* useEffect */

  useEffect(() => {
    setSelectedOrders([]);
    if (cartOrders.length > 0) {
      const temp = [];
      for (let x of cartOrders) {
        temp.push(x?.orderId);
      }
      setSelectedOrders(temp);
    }
  }, [cartOrders]);

  const fetchAndStoreCart = () => {
    if (tableSession)
      axiosGetFunction({
        parentUrl: "cart",
        childUrl: tableSession,
        thenFunction: setCartOrders,
      });
  };

  useEffect(() => {
    if (tableSession) fetchAndStoreCart();
  }, []);

  /* functions */

  const deleteCartOrders = () => {
    axiosDeleteFunction({
      parentUrl: "cart",
      data: {
        tableSessionId: tableSession,
        cartOrder: selectedOrders,
      },
      thenFunction: fetchAndStoreCart,
    });
  };

  const toggleItemSelect = (orderIt: string) => {
    const presentIndex = selectedOrders.indexOf(orderIt);
    if (presentIndex < 0) {
      setSelectedOrders((current) => [...current, orderIt]);
    } else {
      const temp = [...selectedOrders];
      temp.splice(presentIndex, 1);
      setSelectedOrders(temp);
    }
  };

  const convertCartOrderToRealOrder = () => {
    if (selectedOrders.length > 0)
      axiosPostFunction({
        data: {
          tableSessionId: tableSession,
          cartOrder: selectedOrders,
          tableNumber: tableNumber,
          tableSectionId: selectedTableSection.id,
        },
        parentUrl: "cart",
        childUrl: "order",
        thenFunction: fetchAndStoreCart,
      });
    else {
      Alert.alert("No Item In Cart");
    }
  };

  const keyExtractor = (item: Order) => item.orderId;

  const renderItem = ({ item }: { item: Order }) => {
    const dish = dishesh.find((dish) => dish.id === item.dishId);
    return (
      <TouchableRipple
        onPress={() => toggleItemSelect(item.orderId)}
        onLongPress={() => {
          setOrderInfo(item);
          setOrderDish(dish);
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 8,
            paddingHorizontal: 16,
          }}
        >
          <Text variant="bodyLarge">{dish?.name}</Text>
          <View pointerEvents="none">
            <Checkbox
              status={
                selectedOrders.includes(item.orderId) ? "checked" : "unchecked"
              }
            />
          </View>
        </View>
      </TouchableRipple>
    );
  };

  return (
    <>
      <OrderDetailDialog
        close={() => setOrderInfo(undefined)}
        dish={orderDish}
        order={showOrderInfo}
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
        style={
          {
            // backgroundColor: colors.background,
          }
        }
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        data={cartOrders}
        ListFooterComponentStyle={{ marginTop: 30 }}
        ListFooterComponent={
          <>
            <Button mode="outlined" onPress={convertCartOrderToRealOrder}>
              Order
            </Button>

            {selectedOrders.length > 0 && (
              <Button
                mode="contained-tonal"
                style={{ marginTop: 15 }}
                onPress={() =>
                  Alert.alert("Delete Selected Orders", undefined, [
                    { text: "Cancel" },
                    { text: "Delete", onPress: deleteCartOrders },
                  ])
                }
              >
                Delete Selected Order's
              </Button>
            )}
          </>
        }
      />
    </>
  );
}

export default Cart;
