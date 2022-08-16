import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    // store the choosen currency from user
    choosenCurrency: localStorage.getItem("choosenCurrency")
      ? JSON.parse(localStorage.getItem("choosenCurrency"))
      : [],
  },
  reducers: {
    changeCurreny(state, action) {
      state.choosenCurrency = action.payload;
      localStorage.setItem("choosenCurrency", JSON.stringify(action.payload));
    },
  },
});

export const currencyActions = currencySlice.actions;
export default currencySlice;
