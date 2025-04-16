// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

// Configure the store
const store = configureStore({
  reducer: {
    user: userReducer, // Adding the user slice reducer to the store
  },
});

export default store;
