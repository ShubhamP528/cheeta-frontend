import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NODE_API_ENDPOINT } from "../utils/utils";

export const retrieveAuth = createAsyncThunk("auth/retrieveAuth", async () => {
  const storedAuth = localStorage.getItem("cheeta-auth-user");
  if (storedAuth) {
    const parsedUser = await JSON.parse(storedAuth);
    const props = await fetch(`${NODE_API_ENDPOINT}/auth/getVerify`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${parsedUser.token}`,
      },
    });

    if (!props.ok) {
      return null;
    }
    const parsedProps = await props.json();

    return {
      user: parsedUser,
    };
  } else return null;
});
const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: "",
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("cheeta-auth-user", JSON.stringify(state.user));
    },
    logout: (state, action) => {
      state.user = "";
      localStorage.removeItem("cheeta-auth-user");
      console.log("User Logged Out");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(retrieveAuth.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(retrieveAuth.fulfilled, (state, action) => {
      if (action.payload && action.payload.user) {
        state.props = action.payload.props;
        state.user = action.payload.user;
      }
      state.status = "succeeded";
    });
    builder.addCase(retrieveAuth.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
