import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    email: '',
    password: '',
    isLoggedIn: false, // Ajoutez une nouvelle propriété pour gérer l'état de connexion
    userName: '', // Ajoutez une nouvelle propriété pour stocker le nom de l'utilisateur
    firstName:'',
    surName:'',
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    // resetAuth: (state) => {
    //   state.email = '';
    //   state.password = '';
    // },
    setLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    setLoggedOut: (state) => {
      state.isLoggedIn = false;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setSurName: (state, action) => {
      state.surName = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setSelectedDay: (state, action) => {
      state.selectedDay = action.payload;
    },
    setSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
    setSelectedYear: (state, action) => {
      state.selectedYear = action.payload;
    },
  },
});

export const {
  setEmail,
  setPassword,
  resetAuth,
  setLoggedIn,
  setLoggedOut,
  setUserName,
  setFirstName,
  setSurName,
  setGender,
  setSelectedDay,
  setSelectedMonth,
  setSelectedYear,
} = authSlice.actions;

export default authSlice.reducer;