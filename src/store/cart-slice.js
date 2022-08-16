import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    // added products in cart
    productList: localStorage.getItem("cartList")
      ? JSON.parse(localStorage.getItem("cartList"))
      : [],
    // total quantity of all products
    totalQuantity: localStorage.getItem("totalQuantity")
      ? localStorage.getItem("totalQuantity")
      : 0,
    // it is stored in temporary item when item attributes changed by user
    selectedItem: {},
  },
  reducers: {
    // adding selected item into cart
    addProductToCart(state) {
      const existingItemIndex = state.productList.findIndex(
        (item) =>
          item.id === state.selectedItem.id &&
          JSON.stringify(item.selectedAttributes) ===
            JSON.stringify(state.selectedItem.selectedAttributes)
      );

      state.totalQuantity++;

      if (existingItemIndex === -1) {
        state.productList.push({
          ...state.selectedItem,
          quantity: 1,
          orderNumber: Math.random(),
        });
      } else {
        state.productList[existingItemIndex].quantity++;
      }

      localStorage.setItem("cartList", JSON.stringify(state.productList));
      localStorage.setItem("totalQuantity", state.totalQuantity);
    },

    increaseProductQuantity(state, action) {
      const orderNumber = action.payload;

      const existingItem = state.productList.find((item) => {
        return item.orderNumber === +orderNumber;
      });

      state.totalQuantity++;
      existingItem.quantity++;

      localStorage.setItem("cartList", JSON.stringify(state.productList));
      localStorage.setItem("totalQuantity", state.totalQuantity);
    },

    removeProductFromCart(state, action) {
      const orderNumber = action.payload;

      const existingItem = state.productList.find(
        (item) => item.orderNumber === +orderNumber
      );

      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        state.productList = state.productList.filter(
          (item) => item.orderNumber !== +orderNumber
        );
      } else {
        existingItem.quantity--;
      }

      localStorage.setItem("cartList", JSON.stringify(state.productList));
      localStorage.setItem("totalQuantity", state.totalQuantity);
    },

    setSelectedItem(state, action) {
      state.selectedItem = action.payload;
    },

    orderProducts(state) {
      state.productList = [];
      state.totalQuantity = 0;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
