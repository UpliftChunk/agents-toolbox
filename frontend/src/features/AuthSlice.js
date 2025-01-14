// features/AuthSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
    },
    setOnlyUser: (state, action) => {
      const { user } = action.payload;
      state.user = user
    },
    clearAuth: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setAuth, setOnlyUser, clearAuth } = authSlice.actions;

export default authSlice.reducer;
