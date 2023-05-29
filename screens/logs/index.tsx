import { useState, useCallback, useEffect } from "react";
import { RefreshControl } from "react-native";
import { DataTable } from "react-native-paper";
import ScreenWrapper from "../../ScreenWrapper";
import { axiosGetFunction } from "../../useFullItems/axios";
import { Order } from "../summary";
import { useAppSelector } from "../../useFullItems/redux-store";

interface OrderLogType
  extends Omit<
    Order,
    "orderId" | "orderedBy" | "tableSectionId" | "tableNumber"
  > {
  SessionLogs: {
    tableNumber: number;
    tableId: string;
  };
  id: string;
  orderTimeStamp: string;
  sessionLogsUuid: string;
  waiterId: string;
  chefId: string;
}

function Logs() {
  const [refreshing, setRefreshing] = useState(false);
  const [orderLogs, setOrderLogs] = useState<OrderLogType[]>([]);

  const { tables, dishesh } = useAppSelector(
    (store) => store.restaurantInfo.defaultValues
  );

  useEffect(() => {
    getOrderLogs();
  }, []);

  // useEffect(() => {

  //   console.log(orderLogs);
  // }, [orderLogs]);

  const getOrderLogs = () => {
    setRefreshing(true);
    axiosGetFunction({
      parentUrl: "orders",
      childUrl: "logs",
      thenFunction: (e: any) => {
        setOrderLogs(e);
        setRefreshing(false);
      },
    });
  };

  return (
    <ScreenWrapper
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getOrderLogs} />
      }
    >
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Dish Name</DataTable.Title>
          <DataTable.Title numeric>Table</DataTable.Title>
          <DataTable.Title numeric>Date Time</DataTable.Title>
        </DataTable.Header>

        {orderLogs.map((item) => {
          const dish = dishesh.find((dish) => dish.id === item.dishId);
          const table = tables.find(
            (table) => table.id === item.SessionLogs.tableId
          );
          const orderData = new Date(item.orderTimeStamp);
          return (
            <DataTable.Row key={item.id} onPress={() => alert(item.dishId)}>
              <DataTable.Cell>{dish?.name}</DataTable.Cell>
              <DataTable.Cell numeric>
                {table?.prefix}
                {item.SessionLogs.tableNumber}
                {table?.suffix}
              </DataTable.Cell>
              <DataTable.Cell numeric>
                {orderData.getHours()}:{orderData.getMinutes()}{" "}
                {orderData.getDate()}/{orderData.getMonth() + 1}
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
    </ScreenWrapper>
  );
}

export { Logs };
