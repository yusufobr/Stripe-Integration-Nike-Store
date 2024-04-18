import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            if(state.cart.find((item) => item.id === action.payload.id)) {
                state.cart = state.cart.map((item) => item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item);
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload);
        },
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

// export const selectCart = (state) => state.cart.cart;

export default cartSlice.reducer;