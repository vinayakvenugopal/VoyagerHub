import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import userAuthReducer from './slices/userAuthSlice'
import { apiSlice } from './slices/apiSlice'
import hotelAuthReducer from './slices/hotelAuthSlice'

type RootState = ReturnType<typeof userAuthReducer>
const store = configureStore({
    reducer:{
        auth:userAuthReducer,
        hotelAuth:hotelAuthReducer,
   
        [apiSlice.reducerPath]:apiSlice.reducer
   
    },
    
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})


export default store
export type { RootState };
