import {
  configureStore
} from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
//redux store
export default configureStore({
  reducer :{
    cart: cartReducer
  }
})