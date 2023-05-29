import { useEffect, useState } from "react";
import { Order } from "..";
import { axiosGetFunction } from "../../../useFullItems/axios";

export const fetchOrders = (sessionId: string) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (sessionId)
      axiosGetFunction({
        parentUrl: "sessions",
        childUrl: sessionId,
        thenFunction: setOrders,
      });
  }, []);

  return orders;
};
