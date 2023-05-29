import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TableNumberDetail = {
  tableSectionId: string;
  tableNumber: number;
  status: null | string;
};

interface TableStatus {
  [tableSectionId: string]: { [tableNumber: number]: null | string };
}

const tableDetail: TableStatus = {};

const tableStatus = createSlice({
  name: "tableStatus",
  initialState: {
    tableDetail,
  },
  reducers: {
    loadTableStatus: (state, action: PayloadAction<TableStatus>) => {
      state.tableDetail = action.payload;
    },

    updateTableStatus: (state, action: PayloadAction<TableNumberDetail>) => {
      const { status, tableNumber, tableSectionId } = action.payload;

      state.tableDetail[tableSectionId] =
        state.tableDetail[tableSectionId] || {};

      state.tableDetail[tableSectionId][tableNumber] = status;
    },
  },
});

export const { loadTableStatus, updateTableStatus } = tableStatus.actions;

export default tableStatus.reducer;
