import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios";

export const fetchAuth = createAsyncThunk(
  "user/fetchAuth",
  async (params, { rejectWithValue }) => {
    const { data } = await axios.post("/login", params);

    return data.token;
  }
);

const initialState = {
  userToken: window.localStorage.getItem("userToken")
    ? window.localStorage.getItem("userToken")
    : null,
  isAuth: false,
  status: null,
};

export const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuth(state) {
      state.isAuth = true;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = "loading";
      state.isAuth = false;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.isAuth = true;
      state.userToken = action.payload;
      window.localStorage.setItem("userToken", action.payload);
    },
    [fetchAuth.rejected]: (state) => {
      state.status = "error";
      state.isAuth = false;
    },
  },
});

export const { setIsAuth } = loginSlice.actions;

export default loginSlice.reducer;
