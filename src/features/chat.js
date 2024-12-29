import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatUser: {},
    myStream: null,
    remoteStream: null,
    socket: null,
    peer: null,
    contactId: null,
    offer: null,
  },

  reducers: {
    setChatUserRe: (state, action) => {
      state.chatUser = action.payload;
    },
    setMyStream: (state, action) => {
      state.myStream = action.payload;
    },
    setRemoteStream: (state, action) => {
      state.remoteStream = action.payload;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    setPeer: (state, action) => {
      state.peer = action.payload;
    },
    setContactId: (state, action) => {
      state.contactId = action.payload;
    },
    setOffer: (state, action) => {
      state.offer = action.payload;
    },
  },
});

export const {
  setChatUserRe,
  setMyStream,
  setRemoteStream,
  setSocket,
  setPeer,
  setContactId,
  setOffer,
} = chatSlice.actions;

export default chatSlice.reducer;
