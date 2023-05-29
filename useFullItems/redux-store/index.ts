import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  loadTableStatus,
  updateTableStatus,
} from "../../screens/selectTable/redux";
import { updateRestaurantInfo } from "./restaurant";
import {
  updateSelectedTableSection,
  selectTableNumber,
  selectDishId,
} from "./selectedValues";
import { updateAllowWaiterToClearSession, updateSettings } from "./settings";
import type { RootState, AppDispatch } from "./store";
import store from "./store";
import { loadSelfData } from "./selfDetail";
import { toggleGlobalLoader } from "./globalLoader";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const action_types = {
  updateRestaurantInfo,
  updateSelectedTableSection,
  selectTableNumber,
  selectDishId,
  updateTableStatus,
  loadTableStatus,
  updateAllowWaiterToClearSession,
  updateSettings,
  loadSelfData,
  toggleGlobalLoader,
};
export { store };
