import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userAuthReducer from './slices/userAuthSlice';
import { apiSlice } from './slices/apiSlice';
import hotelAuthReducer from './slices/hotelAuthSlice';
import adminAuthReducer from './slices/adminAuthSlice';
import booking from './slices/bookingSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root', // The key under which your state will be saved in storage
  storage, // The storage engine to use (e.g., localStorage or AsyncStorage for React Native)
  // Optionally, you can whitelist or blacklist reducers if needed.
  whitelist: ['booking'], // Only 'auth' state will be persisted
  // blacklist: ['hotelAuth', 'adminAuth', 'booking'], // These states will not be persisted
};

const rootReducer = combineReducers({
  auth: userAuthReducer,
  hotelAuth: hotelAuthReducer,
  adminAuth: adminAuthReducer,
  booking: booking,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

const persistor = persistStore(store);

export { store, persistor };
