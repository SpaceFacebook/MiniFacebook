// authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'auth',
  initialState: {
    email: '',
    password: '',
    isLoggedIn: false, // Ajoutez une nouvelle propriété pour gérer l'état de connexion
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    resetAuth: (state) => {
      state.email = '';
      state.password = '';
    },
    setLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    setLoggedOut: (state) => {
      state.isLoggedIn = false;
    },
    setUserName: (state, action) => { // Nouvelle action pour stocker le nom de l'utilisateur
      state.userName = action.payload;
    },
  },
});

export const { setEmail, setPassword, resetAuth, setLoggedIn, setLoggedOut ,setUserName} = loginSlice.actions;
export default loginSlice.reducer;
