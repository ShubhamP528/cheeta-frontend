// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth";

const store = configureStore({
  reducer: {
    user: authReducer,
  },
});

export default store;
