import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const getLogin = createAsyncThunk("user/getLogin", async (user) => {
  const { data } = await axios(`http://localhost:3001/spa-countries/login?email=${user.email}&password=${user.password}`);
  if (data.error) return { error: "User not found" }
  return data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    access: false,
    id: "",
    first_name: "",
    last_name: "",
    country: {}
  },
  reducers: {
    resetUser: (state) => {
      state.access = false;
      state.id = "";
      state.first_name = "";
      state.last_name = "";
      state.country = {};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLogin.fulfilled, (state, action) => {
        state.access = action.payload.access;
        state.id = action.payload.user.id;
        state.first_name = action.payload.user.first_name;
        state.last_name = action.payload.user.last_name;
        state.country = action.payload.user.Country;
      })
      .addCase(getLogin.rejected, (state, action) => {
        alert("Invalid email or password");
      })
  }
});
export const { resetUser } = userSlice.actions;
export default userSlice.reducer;