import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: 'guest',
    loggedIn: false
  },
  reducers: {
    logIn: (state) => {
      state.loggedIn = true;
      state.username = 'JAM';
    }
  }
})

export const { logIn } = userSlice.actions;

export default userSlice.reducer;