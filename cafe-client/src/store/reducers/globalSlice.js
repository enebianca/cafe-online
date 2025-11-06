import { createSlice } from '@reduxjs/toolkit';

// extragem și tokenul, și rolul din localStorage
const tokenFromStorage = localStorage.getItem('token');
const roleFromStorage = localStorage.getItem('role');

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    token: tokenFromStorage || null,
    loggedIn: !!tokenFromStorage,
    role: roleFromStorage || null,
  },
  reducers: {
    // 🔹 setăm tokenul și rolul
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.loggedIn = true;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('role', action.payload.role);
    },
    // 🔹 logout complet
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.loggedIn = false;
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    },
  },
});

export const { setToken, logout } = globalSlice.actions;
export default globalSlice.reducer;
