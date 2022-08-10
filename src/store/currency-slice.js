import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
  name: "currency",
  initialState: { choosenCurrency: [] },
  reducers: {
    changeCurreny(state, action) {
      state.choosenCurrency = action.payload;
    },
  },
});

export const currencyActions = currencySlice.actions;
export default currencySlice;
