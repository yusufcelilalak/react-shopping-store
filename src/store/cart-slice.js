import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    productList: [],
    totalQuantity: 0,
    selectedItem: {},
  },
  reducers: {
    addProductToCart(state) {
      const existingItemIndex = state.productList.findIndex(
        (item) =>
          item.id === state.selectedItem.id &&
          JSON.stringify(item.selectedAttributes) ===
            JSON.stringify(state.selectedItem.selectedAttributes)
      );
      console.log(existingItemIndex);
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
    },

    increaseProductQuantity(state, action) {
      const orderNumber = action.payload;

      const existingItem = state.productList.find((item) => {
        return item.orderNumber === +orderNumber;
      });

      state.totalQuantity++;
      existingItem.quantity++;
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

      //console.log(current(state));
    },

    setSelectedItem(state, action) {
      state.selectedItem = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
