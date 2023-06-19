import React from "react";
import { createSlice } from "@reduxjs/toolkit";

export const userslice = createSlice({
	name: "user",
	initialState: { value: { number: 0, token: "" } },
	reducers: {
		plus: (state, action) => {
			state.value.number += action.payload;
		},
		zero: (state, action) => {
			state.value.number = action.payload;
		},
		tokenfunc: (state, action) => {
			state.value.token = action.payload;
		},
	},
});

export const { plus, zero, tokenfunc } = userslice.actions;

export default userslice.reducer;
