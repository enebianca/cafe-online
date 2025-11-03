import { createSlice } from '@reduxjs/toolkit';

const tokenFromStorage = localStorage.getItem('token');

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    token: tokenFromStorage || null,
    loggedIn: !!tokenFromStorage,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.loggedIn = true;
      localStorage.setItem('token', action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.loggedIn = false;
      localStorage.removeItem('token');
    },
  },
});

export const { setToken, logout } = globalSlice.actions;
export default globalSlice.reducer;
