import { Dish, PriceStructure } from "../../../interfaces";

export const foodPriceDataStructure = (dishDetail: Dish) => {
  const foodPrice: PriceStructure = {};

  if (dishDetail?.FullLarge_Price || dishDetail?.HalfLarge_Price) {
    foodPrice.Large = {};
    if (dishDetail.FullLarge_Price)
      foodPrice.Large.full = dishDetail.FullLarge_Price;
    if (dishDetail.HalfLarge_Price)
      foodPrice.Large.half = dishDetail.HalfLarge_Price;
  }
  if (dishDetail?.FullMedium_Price || dishDetail?.HalfMedium_Price) {
    foodPrice.Medium = {};
    if (dishDetail.FullMedium_Price)
      foodPrice.Medium.full = dishDetail.FullMedium_Price;
    if (dishDetail.HalfMedium_Price)
      foodPrice.Medium.half = dishDetail.HalfMedium_Price;
  }
  if (dishDetail?.FullSmall_Price || dishDetail?.HalfSmall_Price) {
    foodPrice.Small = {};
    if (dishDetail.FullSmall_Price)
      foodPrice.Small.full = dishDetail.FullSmall_Price;
    if (dishDetail.HalfSmall_Price)
      foodPrice.Small.half = dishDetail.HalfSmall_Price;
  }

  return foodPrice;
};
