import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const existingIndex = state.products.findIndex(
        product => product._id === action.payload._id
      );
      if (existingIndex !== -1) {
        state.products = [...state.products].filter(
          product => product._id !== action.payload._id
        );
      } else {
        state.products.push(action.payload);
      }
    },
    getUserWishlist: (state, action) => {
      const user = action.payload.currentUser;
      const products = action.payload.products;
      state.products =
        user && products
          ? products.filter(product => user.whishlistIds.includes(product._id))
          : [...state.products];
    },
  },
});

export const { addToWishlist, clearwishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;

// export const getWishlist = createAsyncThunk('wishlist/getWishlist',async (currentUser,products,thunkAPI) => {
//     try {
//       const res = await userRequest.
//     } catch (error) {

//     }
// })
