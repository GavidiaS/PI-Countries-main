import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import countryReducer from './countrySlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    country: countryReducer
  }
});
export default store;