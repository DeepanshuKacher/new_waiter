import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import store from "./store";

// const defaultValues = store.getState();
// console.log({ defaultValues });

export interface Dish {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  addOns: { id: string; name: string; price: number; dishId: string }[];
  FullLarge_Price: number;
  FullMedium_Price: number;
  FullSmall_Price: number;
  HalfLarge_Price: number;
  HalfMedium_Price: number;
  HalfSmall_Price: number;
  available: boolean;
}
export interface Table {
  id: string;
  name: string;
  prefix?: string;
  suffix?: string;
  startNumber: number;
  endNumber: number;
}

// interface Waiter {
//   id: string;
//   name: string;
//   passportPhoto?: string;
//   MobileNumber?: number;
//   verified: boolean;
//   available: boolean;
// }

interface InitialDataTypes {
  defaultValues: {
    // name: string;
    // city: string;
    // id: string;
    // dishSection: {
    //   id: string;
    //   sectionName: string;
    //   dishesh: [Dish];
    // }[];
    selectedTableSection: number;
    tableNumber: number;
    selectDishId: string;
    // waiters: Waiter[];
  };
}

const initialState: InitialDataTypes | undefined = {
  defaultValues: {
    selectedTableSection: 0,
    tableNumber: 0,
    selectDishId: "",
    // name: "",
    // city: "",
    // id: "",
    // dishSection: [],
    // waiters: [],
  },
};

// export type RestaurantSliceType = typeof initialState.defaultValues;

export const selectedValues = createSlice({
  name: "restaurantInfo",
  initialState,
  reducers: {
    updateSelectedTableSection: (state, action: PayloadAction<number>) => {
      state.defaultValues.selectedTableSection = action.payload;
    },
    selectTableNumber: (state, action: PayloadAction<number>) => {
      state.defaultValues.tableNumber = action.payload;
    },
    selectDishId: (state, action: PayloadAction<string>) => {
      state.defaultValues.selectDishId = action.payload;
    },
  },
});

export const { updateSelectedTableSection, selectTableNumber, selectDishId } =
  selectedValues.actions;

// Other code such as selectors can use the imported `RootState` type
// export const getRestaurantInfo = (state: RootState) => state.restaurantInfo;

export default selectedValues.reducer;
