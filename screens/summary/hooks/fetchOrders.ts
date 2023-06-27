import { useEffect, useState } from "react";
import { axiosGetFunction } from "../../../useFullItems/axios";

export interface Kot {
  id: `kot:${string}`;
  value: {
    kotId: string;
    tableSectionId: string;
    tableNumber: number;
    restaurantId: string;
    createdAt: number;
    orderedBy: string;
    completed: number;
    sessionId: string;
    chefAssign: string;
    orders: Order[];
  };
}

export interface Order {
  completed: number;
  createdAt: number;
  dishId: string;
  fullQuantity: number;
  halfQuantity: number;
  kotId: string;
  orderedBy: string;
  orderId: string;
  restaurantId: string;
  size: "large" | "medium" | "small";
  tableNumber: number;
  tableSectionId: string;
  user_description: string;
  sessionId: string;
  chefAssign: string;
}

export const fetchOrders = (sessionId: string) => {
  const [orders, setOrders] = useState<Kot[]>([]);

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
