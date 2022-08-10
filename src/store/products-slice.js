import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: { productList: [], categories: [], currencies: [] },
  reducers: {
    fillProductList(state, action) {
      state.productList = action.payload;
    },
    getCategories(state, action) {
      state.categories = action.payload;
    },
    getCurrencies(state, action) {
      state.currencies = action.payload;
    },
  },
});

export const productsActions = productSlice.actions;
export default productSlice;
