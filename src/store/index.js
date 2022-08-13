import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./products-slice";
import currencySlice from "./currency-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    currency: currencySlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
