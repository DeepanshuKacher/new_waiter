import { configureStore } from "@reduxjs/toolkit";
import tableStatus from "../../screens/selectTable/redux";
import restaurantInfo from "./restaurant";
import selectedValues from "./selectedValues";
import settings from "./settings";
import selfInfo from "./selfDetail";
import globalLoader from "./globalLoader";

const store = configureStore({
  reducer: {
    restaurantInfo,
    selectedValues,
    tableStatus,
    settings,
    selfInfo,
    globalLoader,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
