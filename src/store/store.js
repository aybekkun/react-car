import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import dataReducer from "./slices/dataSlice";
import infoReducer from "./slices/infoSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    data:dataReducer,
    info:infoReducer
  },
});
