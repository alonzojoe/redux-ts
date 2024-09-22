import { createSlice } from '@reduxjs/toolkit';
import { Products } from '../../libs/types';

type CartState = {
    items: Products[],
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

    }
})

export default cartSlice.reducer