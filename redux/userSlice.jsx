// redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for the user slice
const initialState = {
  email: '',
  uid: '',
  name: '',
};

// Create the user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.name = action.payload.name;
    },
    clearUser: (state) => {
      state.email = '';
      state.uid = '';
      state.name = '';
    },
  },
});

// Export the actions
export const { setUser, clearUser} = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
