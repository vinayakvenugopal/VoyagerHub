import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import userAuthReducer from './slices/userAuthSlice'
import { apiSlice } from './slices/apiSlice'
import hotelAuthReducer from './slices/hotelAuthSlice'
import adminAuthReducer from './slices/adminAuthSlice'

const store = configureStore({
    reducer:{
        auth:userAuthReducer,
        hotelAuth:hotelAuthReducer,
        adminAuth:adminAuthReducer,
   
        [apiSlice.reducerPath]:apiSlice.reducer
   
    },
    
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})

export default store
