import { Dish, Order, OrderReturnFromRedis, PriceStructure } from "../../../interfaces";

export const foodPriceDataStructure = (dishDetail: Dish) => {
  const foodPrice: PriceStructure = {};

  if (dishDetail?.price.large) {
    foodPrice.Large = {
      full: dishDetail.price.large.full,
      half: dishDetail.price.large.half,
    };
  }
  if (dishDetail?.price.medium) {
    foodPrice.Medium = {
      full: dishDetail.price.medium.full,
      half: dishDetail.price.medium.half,
    };
  }
  if (dishDetail?.price.small) {
    foodPrice.Small = {
      full: dishDetail.price.small.full,
      half: dishDetail.price.small.half,
    };
  }

  return foodPrice;
};


export const convertRedisOrderToOrder = (redisOrder: OrderReturnFromRedis): Order => {

  const {
    createdAt,
    dishId,
    fullQuantity,
    halfQuantity,
    kotId,
    orderedBy,
    orderId,
    restaurantId,
    sessionId,
    size,
    tableNumber,
    tableSectionId,
    chefAssign,
    completed,
    user_description
  } = redisOrder

  return {
    createdAt: parseInt(createdAt),
    dishId, fullQuantity: parseInt(fullQuantity),
    halfQuantity: parseInt(halfQuantity), kotId, orderedBy,
    orderId, restaurantId, sessionId, size, tableNumber: parseInt(tableNumber),
    tableSectionId, chefAssign, completed, user_description
  }

}