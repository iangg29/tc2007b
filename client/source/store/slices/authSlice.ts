// (c) Tecnologico de Monterrey 2022, rights reserved.

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

interface iAuthState {
  user: {
    name: string;
    first_lastname: string;
    second_lastname: string;
    email: string;
    cellphone: string;
  };
  isLoggedIn: boolean;
  token: string;
}

const initialState: iAuthState = {
  user: {
    name: "",
    first_lastname: "",
    second_lastname: "",
    email: "",
    cellphone: "",
  },
  isLoggedIn: false,
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<iAuthState["isLoggedIn"]>) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action: PayloadAction<iAuthState["user"]>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<iAuthState["token"]>) => {
      state.token = action.payload;
    },
  },
});

export const { setUser, setToken, setIsLoggedIn } = authSlice.actions;

export const selectUser = (state: RootState): unknown => state.auth.user;
export const selectIsLoggedIn = (state: RootState): unknown => state.auth.isLoggedIn;
export const selectAuth = (state: RootState): unknown => state.auth;

export default authSlice.reducer;
