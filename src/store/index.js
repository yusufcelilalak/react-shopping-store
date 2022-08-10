import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./products-slice";
import currencySlice from "./currency-slice";

const store = configureStore({
  reducer: { products: productSlice.reducer, currency: currencySlice.reducer },
});

export default store;
