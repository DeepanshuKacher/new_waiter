import { useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  Button,
  Portal,
  Dialog,
  Text,
  DataTable,
  TextInput,
} from "react-native-paper";
import { Dish } from "../interfaces";
import { RedisOrder } from "../screens/cart";
import { Order } from "../screens/summary/hooks/fetchOrders";
import { AntDesign } from "@expo/vector-icons";

const OrderDetailDialog = ({
  close,
  order,
  dish,
}: {
  order?: Order;
  dish?: Dish;
  close: () => void;
}) => {
  const [editMode, setEditMode] = useState<"half" | "full" | undefined>();
  const [newQuantity, setNewQuantity] = useState("");

  const editQuantity = (halfFull: keyof Dish["price"]["large"]) => {
    setEditMode(halfFull);

    if (halfFull === "full") {
      if (order?.fullQuantity) setNewQuantity(order?.fullQuantity?.toString());
    } else if (halfFull === "half") {
      if (order?.halfQuantity) setNewQuantity(order?.halfQuantity?.toString());
    }
  };

  return (
    <Portal>
      <Dialog
        onDismiss={close}
        visible={!!order}
        style={{ maxHeight: 0.6 * Dimensions.get("window").height }}
      >
        <Dialog.Title>{dish?.name}</Dialog.Title>
        <Dialog.ScrollArea style={styles.smallPadding}>
          <ScrollView contentContainerStyle={styles.biggerPadding}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title> </DataTable.Title>
                <DataTable.Title>
                  Full
                  {order?.fullQuantity ? (
                    <AntDesign
                      onPress={() => editQuantity("full")}
                      name="edit"
                      size={20}
                    />
                  ) : null}
                </DataTable.Title>
                <DataTable.Title>
                  Half
                  {order?.halfQuantity ? (
                    <AntDesign
                      onPress={() => editQuantity("half")}
                      name="edit"
                      size={20}
                    />
                  ) : null}
                </DataTable.Title>
              </DataTable.Header>

              {/* {order?.size === "Large" && ( */}
              <DataTable.Row>
                <DataTable.Title>{order?.size}</DataTable.Title>
                <DataTable.Cell>
                  {order?.fullQuantity} * {dish?.price?.[order?.size!]?.full}
                </DataTable.Cell>
                <DataTable.Cell>
                  {order?.halfQuantity} * {dish?.price?.[order?.size!]?.half}
                </DataTable.Cell>
              </DataTable.Row>
              {/* )} */}
            </DataTable>

            {/*    <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              borderTopWidth: 1,
              borderBottomWidth: 1,
              paddingVertical: 5,
              marginBottom: 10,
            }}
          >
            <Text style={{ borderWidth: 1, paddingHorizontal: 2, margin: 2 }}>
              Extra-chilli
            </Text>
            <Text style={{ borderWidth: 1, paddingHorizontal: 2, margin: 2 }}>
              Extra-chilli
            </Text>
            <Text style={{ borderWidth: 1, paddingHorizontal: 2, margin: 2 }}>
              Extra-chilli
            </Text>
            <Text style={{ borderWidth: 1, paddingHorizontal: 2, margin: 2 }}>
              Extra-chilli
            </Text>
          </View> */}
            {order?.user_description && (
              <Text variant="bodyLarge">
                Description:- {order?.user_description}
              </Text>
            )}
          </ScrollView>
        </Dialog.ScrollArea>
        {/* <View style={{ flexDirection: "row" }}> */}
        {editMode ? (
          <>
            <TextInput
              placeholder="New value"
              value={newQuantity}
              onChangeText={setNewQuantity}
              keyboardType="numeric"
            />
            <Button onPress={() => console.log("Pressed")}>Submit</Button>
          </>
        ) : null}
        {/* </View> */}
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  smallPadding: {
    paddingHorizontal: 0,
  },
  biggerPadding: {
    paddingHorizontal: 24,
  },
});

export default OrderDetailDialog;
