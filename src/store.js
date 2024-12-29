// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth";
import chatReducer from "./features/chat";

const store = configureStore({
  reducer: {
    user: authReducer,
    chat: chatReducer,
  },
});

export default store;
