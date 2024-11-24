import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  quantity: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const existingIndex = state.products.findIndex(
        product => product.id === action.payload.id
      );
      if (existingIndex !== -1) {
        state.products[existingIndex].quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
      state.quantity += action.payload.quantity;
      state.total += action.payload.price * action.payload.quantity;
    },
    incProduct: (state, action) => {
      state.products = [...state.products].map(product =>
        product.id === action.payload.id
          ? {
              ...product,
              quantity: action.payload.quantity,
            }
          : product
      );
      state.quantity++;
      state.total += action.payload.price;
    },
    decProduct: (state, action) => {
      action.payload.quantity <= 0
        ? (state.products = [...state.products].filter(
            product => product.id !== action.payload.id
          ))
        : (state.products = [...state.products].map(product =>
            product.id === action.payload.id
              ? {
                  ...product,
                  quantity: action.payload.quantity,
                }
              : product
          ));
      state.quantity--;
      state.total -= action.payload.price;
    },
    clearCart: state => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, incProduct, decProduct, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
