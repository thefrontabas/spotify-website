import { createSlice } from "@reduxjs/toolkit";

export const homeslice = createSlice({
  name: "home",
  initialState: {
    value: {
      tokendata: "",
      icon: "",
      actname: [],
      resultdata: [],
      keydata: "",
      musicid: "53WErLQ0tb9uuB67nZtSug",
      recentdata: [],
      userdata: [],
      query: "siamak",
      playlist: [],
    },
  },
  reducers: {
    tokenfunc: (state, action) => {
      state.value.tokendata = action.payload;
    },
    playfunc: (state, action) => {
      state.value.icon = action.payload;
    },
    actfunc: (state, action) => {
      state.value.actname = action.payload;
    },
    resultfunc: (state, action) => {
      state.value.resultdata = action.payload;
    },
    keyfunc: (state, action) => {
      state.value.keydata = action.payload;
    },
    musicfunc: (state, action) => {
      state.value.musicid = action.payload;
    },
    recentfunc: (state, action) => {
      state.value.recentdata = action.payload;
    },
    userfunc: (state, action) => {
      state.value.userdata = action.payload;
    },
    searchfunc: (state, action) => {
      state.value.query = action.payload;
    },
    plsylistfunc: (state, action) => {
      state.value.playlist = action.payload;
    },
  },
});

export const {
  tokenfunc,
  playfunc,
  actfunc,
  resultfunc,
  keyfunc,
  musicfunc,
  recentfunc,
  userfunc,
  searchfunc,
  plsylistfunc,
} = homeslice.actions;

export default homeslice.reducer;
