import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './reducers/globalSlice';
import cartReducer from './reducers/cartSlice';

export const store = configureStore({
  reducer: {
    global: globalReducer,
    cart: cartReducer,
  },
});

export default store;
