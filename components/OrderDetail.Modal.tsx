import * as React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { Button, Portal, Dialog, Text, DataTable } from "react-native-paper";
import { Dish } from "../interfaces";
import { Order } from "../screens/summary";

const OrderDetailDialog = ({
  close,
  order,
  dish,
}: {
  order?: Order;
  dish?: Dish;
  close: () => void;
}) => {
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
                <DataTable.Title>Full</DataTable.Title>
                <DataTable.Title>Half</DataTable.Title>
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
                Description:- {order.user_description}
              </Text>
            )}
          </ScrollView>
        </Dialog.ScrollArea>
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
