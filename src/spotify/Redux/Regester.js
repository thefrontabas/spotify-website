import { createSlice } from "@reduxjs/toolkit";

export const regesterslice = createSlice({
  name: "regester",
  initialState: {
    value: { logindata: {}, signupdata: {}, errordata: "", text: "" },
  },
  reducers: {
    signup: (state, action) => {
      state.value.signupdata = action.payload;
      state.value.text = "signup";
    },
    login: (state, action) => {
      state.value.logindata = action.payload;
      state.value.text = "login";
    },
    err: (state, action) => {
      state.value.errordata = action.payload;
    },
  },
});

export const { signup, login, err } = regesterslice.actions;

export default regesterslice.reducer;
