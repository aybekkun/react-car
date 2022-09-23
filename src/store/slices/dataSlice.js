import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios";

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (params = "", { rejectWithValue }) => {
    const { data } = await axios.get(`/leads${params}`);

    return data;
  }
);

const initialState = {
  data: [],
  status: null,
  currentPage: window.localStorage.getItem("currentPage")
    ? window.localStorage.getItem("currentPage")
    : 1,
  totalPage: 1,
  searchWord: "",
  searchType: "",
};

export const dataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setSearchWord(state, action) {
      state.searchWord = action.payload;
    },
    setSearchType(state, action) {
      state.searchType = action.payload;
    },
  },
  extraReducers: {
    [fetchData.pending]: (state) => {
      state.status = "loading";
    },
    [fetchData.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload.leads.data;
      state.totalPage = Math.ceil(Number(action.payload.leads.total) / 10);
    },
    [fetchData.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export const { setCurrentPage, setSearchWord,setSearchType } = dataSlice.actions;

export default dataSlice.reducer;
