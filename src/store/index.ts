import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './slices/cart-slice';


const store = configureStore({
    reducer: {
        cart: cartSlice
    }
})

export type AppDispatch = typeof store.dispatch;

export default store;