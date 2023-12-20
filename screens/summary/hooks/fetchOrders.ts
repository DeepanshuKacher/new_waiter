import { useEffect, useState } from "react";
import { axiosGetFunction } from "../../../useFullItems/axios";
import { RetreveKotJson } from "../../../interfaces";


export const fetchOrders = (sessionId: string) => {
  const [orders, setOrders] = useState<RetreveKotJson[]>([]);

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
