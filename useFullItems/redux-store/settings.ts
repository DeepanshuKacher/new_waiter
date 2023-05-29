import { InitialState } from "@react-navigation/native";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialDataTypes {
  defaultValues: {
    allowWaiterToClearSession: boolean;
  };
}

const initialState: InitialDataTypes = {
  defaultValues: {
    allowWaiterToClearSession: false,
  },
};

export type SettingType = typeof initialState.defaultValues;

export const settings = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateAllowWaiterToClearSession: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.defaultValues.allowWaiterToClearSession = action.payload;
    },

    updateSettings: (state, action: PayloadAction<SettingType>) => {
      state.defaultValues = action.payload;
    },
  },
});

export const { updateAllowWaiterToClearSession, updateSettings } =
  settings.actions;

export default settings.reducer;
