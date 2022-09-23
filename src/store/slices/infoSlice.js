import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios";

export const fetchInfoData = createAsyncThunk(
  "info/fetchInfoData",
  async (_, { rejectWithValue }) => {
    const { data } = await axios.get(`/info`);
    return data;
  }
);

const initialState = {
  infoData: [],
  voronka:{},
  status:null
};

export const infoSlice = createSlice({
  name: "info",
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
    [fetchInfoData.pending]: (state) => {
      state.status = "loading";
    },
    [fetchInfoData.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.infoData = action.payload.leads.map((item) => {
        return {
          name: item.city,
          users: item.users,
        };
      });
      state.voronka = action.payload.voronka
    },
    [fetchInfoData.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export const { setCurrentPage, setSearchWord, setSearchType } =
  infoSlice.actions;

export default infoSlice.reducer;
