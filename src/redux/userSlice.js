import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: 'guest',
    loggedIn: false,
    id: ''
  },
  reducers: {
    logIn: (state, action) => {
      state.loggedIn = true;
      state.username = action.payload.displayName;
      state.id = action.payload.id;
    },
    logOut: (state) => {
      state.loggedIn = false;
      state.username = 'Guest';
    },
    changeDisplayName: (state, action) => {
      state.username = action.payload;
    }
  }
})

export const { logIn, logOut, changeDisplayName } = userSlice.actions;

export default userSlice.reducer;