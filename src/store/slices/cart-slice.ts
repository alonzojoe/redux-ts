import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Products } from '../../libs/types';

type CartProduct = {
    quantity: number
} & Products

type CartState = {
    items: CartProduct[],
    totalAmount: number
}

const initialState: CartState = {
    items: [],
    totalAmount: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartProduct>) {
            const itemIndex = state.items.findIndex((item) => item.id === action.payload.id)

            if (itemIndex >= 0) {
                state.items[itemIndex].quantity++
                state.totalAmount += action.payload.price
            } else {
                state.items.push({ ...action.payload })
                state.totalAmount += action.payload.price * action.payload.quantity
            }

            state.totalAmount = parseFloat(state.totalAmount.toFixed(2))
        },
        removeToCart(state, action: PayloadAction<CartProduct>) {
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
                state.totalAmount = parseFloat(state.totalAmount.toFixed(2))

            }


        }
    }
})

export const { addToCart, removeToCart } = cartSlice.actions
export default cartSlice.reducer