import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts } from '../thunks/posts';
import { Products } from '../../libs/types';

type CartProduct = {
    quantity: number
} & Products

type CartItemsState = {
    id: number; title: string; description: string; price: number; quantity: number;
}

type CartState = {
    isLoading: boolean;
    isError: string | null;
    items: CartProduct[],
    cartItems: CartItemsState[];
    totalAmount: number
}

const initialState: CartState = {
    isLoading: false,
    isError: null,
    items: [],
    cartItems: [],
    totalAmount: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<{ id: number; title: string; description: string; price: number; quantity: number }>) {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)

            if (itemIndex >= 0) {
                state.cartItems[itemIndex].quantity++
                state.totalAmount += action.payload.price
            } else {
                state.cartItems.push({ ...action.payload })
                state.totalAmount += action.payload.price * action.payload.quantity
            }


        },
        removeToCart(state, action: PayloadAction<{ id: number }>) {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)

            if (itemIndex >= 0) {
                const itemPrice = state.cartItems[itemIndex].price

                if (state.cartItems[itemIndex].quantity === 1) {
                    state.totalAmount -= itemPrice * state.cartItems[itemIndex].quantity
                    state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id)
                } else {
                    state.totalAmount -= itemPrice
                    state.cartItems[itemIndex].quantity--
                }


            }


        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true
                state.isError = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                const products = action.payload.map((item) => {
                    return {
                        ...item,
                        quantity: 1
                    }
                })
                state.isLoading = false
                state.items = products
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                console.log(action)
                state.isLoading = false;
                state.isError = action?.error?.message || 'Something went wrong'
            })
    }
})

export const { addToCart, removeToCart } = cartSlice.actions
export default cartSlice.reducer