import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CartItems from "../../cartItems"

const url = "https://course-api.com/react-useReducer-cart-project"

export const fetchCartItems = createAsyncThunk("cart/fetchCartItems", async () => {
    const response = await fetch(url)
    const data = await response.json()
    return data
})


// The initial state of the Cart feature slice
//setting local data as initial state(cartItems)
const initialState = {
    cartItems: [],
    totalAmount: 0,
    totalPrice: 0,
    isLoading: true
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = []
        },
        removeItem: (state, action) => {
            const itemId = action.payload
            state.cartItems = state.cartItems.filter(item => item.id !== itemId)
        },
        increaseAmount: (state, action) => {
            const itemId = action.payload
            const cartItem = state.cartItems.find(item => item.id === itemId)
            cartItem.amount += 1

        },
        decreaseAmount: (state, action) => {
            const itemId = action.payload
            const cartItem = state.cartItems.find(item => item.id === itemId)
            cartItem.amount -= 1
        },
        calculateTotal: (state) => {
            state.totalAmount = state.cartItems.reduce((total, item) => total + item.amount, 0)
            state.totalPrice = state.cartItems.reduce((total, item) => total + item.amount * item.price, 0)

            //another way to do it
            // let totalAmount = 0
            // let totalPrice = 0
            // state.cartItems.forEach(item => {
            //     totalAmount += item.amount
            //     totalPrice += item.amount * item.price
            // })
            // state.totalAmount = totalAmount
            // state.totalPrice = totalPrice

        }
    },
    extraReducers: {
        [fetchCartItems.pending]: (state) => {
            state.isLoading = true
        },
        [fetchCartItems.fulfilled]: (state, action) => {
            state.isLoading = false
            state.cartItems = action.payload
        },
        [fetchCartItems.rejected]: (state) => {
            state.isLoading = false
        }

    }

})

export const { clearCart, removeItem, decreaseAmount, increaseAmount, calculateTotal } = cartSlice.actions
export default cartSlice.reducer