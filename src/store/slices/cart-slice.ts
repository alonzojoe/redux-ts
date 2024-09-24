import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts } from '../thunks/posts';
import { Products } from '../../libs/types';

type CartProduct = {
    quantity: number
} & Products

type CartState = {
    isLoading: boolean;
    isError: string | null;
    items: CartProduct[],
    totalAmount: number
}

const initialState: CartState = {
    isLoading: false,
    isError: null,
    items: [],
    totalAmount: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<{ id: number; title: string; description: string; price: number; quantity: number }>) {
            const itemIndex = state.items.findIndex((item) => item.id === action.payload.id)

            if (itemIndex >= 0) {
                state.items[itemIndex].quantity++
                state.totalAmount += action.payload.price
            } else {
                state.items.push({ ...action.payload })
                state.totalAmount += action.payload.price * action.payload.quantity
            }


        },
        removeToCart(state, action: PayloadAction<{ id: number }>) {
            const itemIndex = state.items.findIndex((item) => item.id === action.payload.id)

            if (itemIndex >= 0) {
                const itemPrice = state.items[itemIndex].price

                if (state.items[itemIndex].quantity === 1) {
                    state.totalAmount -= itemPrice * state.items[itemIndex].quantity
                    state.items = state.items.filter((item) => item.id !== action.payload.id)
                } else {
                    state.totalAmount -= itemPrice
                    state.items[itemIndex].quantity--
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