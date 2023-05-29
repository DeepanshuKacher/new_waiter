export type {
  RestaurantSliceType,
  Dish,
  Table,
} from "../useFullItems/redux-store/restaurant";

export type { SettingType } from "../useFullItems/redux-store/settings";

export interface PriceStructure {
  Large?: { full?: number; half?: number };
  Medium?: { full?: number; half?: number };
  Small?: { full?: number; half?: number };
}
