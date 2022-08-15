import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    productList: localStorage.getItem("productList")
      ? JSON.parse(localStorage.getItem("productList"))
      : [],
    categories: [],
    currencies: [],
    defaultSelectedProduct: {},
  },
  reducers: {
    fillProductList(state, action) {
      state.productList = action.payload;
      localStorage.setItem("productList", JSON.stringify(state.productList));
    },
    getCategories(state, action) {
      state.categories = action.payload;
    },
    getCurrencies(state, action) {
      state.currencies = action.payload;
    },

    setDefaultProduct(state, action) {
      const product = state.productList.find((product) => {
        return product.id === action.payload;
      });

      const attributes = {};

      product.attributes.forEach((attribute) => {
        attributes[`${attribute.id}`] = attribute.items[0].value;
      });

      state.defaultSelectedProduct = {
        ...product,
        selectedAttributes: attributes,
      };
    },
  },
});

export const productsActions = productSlice.actions;
export default productSlice;
