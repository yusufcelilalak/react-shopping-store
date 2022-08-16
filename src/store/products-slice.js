import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    // store all product list which is taken by graphql
    productList: localStorage.getItem("productList")
      ? JSON.parse(localStorage.getItem("productList"))
      : [],
    // store all categories to display links on navbar
    categories: [],
    // store all currencies to display currencies on navbar
    currencies: [],
    // temporary default item to add cart if user don't choose any attribute
    defaultSelectedProduct: {},
    // check if all data loaded from graphql
    isDataLoaded: false,
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

      if (product !== undefined) {
        const attributes = {};

        product.attributes.forEach((attribute) => {
          attributes[`${attribute.id}`] = attribute.items[0].value;
        });

        state.defaultSelectedProduct = {
          ...product,
          selectedAttributes: attributes,
        };
      }
    },

    setDataLoaded(state) {
      state.isDataLoaded = true;
    },
  },
});

export const productsActions = productSlice.actions;
export default productSlice;
