import { useEffect, useState } from "react";
import { Dish, PriceStructure } from "../interfaces";
import { foodPriceDataStructure } from "../useFullItems/functions";

export const foodPriceStructure = (dishDetail: Dish) => {
  const [data, setData] = useState<PriceStructure>({});

  useEffect(() => {
    const structurPriceData = foodPriceDataStructure(dishDetail);
    setData(structurPriceData);
  }, []);

  return data;
};
