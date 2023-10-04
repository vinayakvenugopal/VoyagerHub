import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import userAuthReducer from './slices/userAuthSlice'
import { apiSlice } from './slices/apiSlice'

type RootState = ReturnType<typeof userAuthReducer>
const store = configureStore({
    reducer:{
        auth:userAuthReducer,
   
        [apiSlice.reducerPath]:apiSlice.reducer
   
    },
    
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})


export default store
export type { RootState };
