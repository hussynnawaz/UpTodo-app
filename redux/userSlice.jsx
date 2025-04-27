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
    // Set the user data in the state when user logs in
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.name = action.payload.name;
    },
    // Clear the user data in the state when user logs out
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

/**
 * Purpose of this userSlice and store:
 * This userSlice is used to store the user data in the Redux store.
 * When the user logs in, the setUser action is dispatched to update the user data in the state.
 * When the user logs out, the clearUser action is dispatched to clear the user data in the state.
 * The user data is then accessible in any component that is connected to the Redux store.
 */

