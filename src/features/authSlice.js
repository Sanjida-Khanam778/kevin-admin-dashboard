import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: null,
    name: null,
    email: null,
    roll: null,
  },
  access: null,
  refresh: null,
  expiry: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log(action.payload, "here is access token");
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
      state.isAuthenticated = true;
      // set time  for 30 seconds
      state.expiry = Date.now() + 82800000;
    },

    setAccessToken: (state, action) => {
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
      state.isAuthenticated = true;
      //  Assuming the token has an expiration time (e.g., exp in UNIX timestamp format)
      state.expiry = Date.now() + 82800000;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.access = null;
      state.refresh = null;
      state.expiry = null;
    },
  },
});

export const { logout, setCredentials, setAccessToken } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
