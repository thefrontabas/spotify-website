import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./spotify/App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import regesterReducer from "./spotify/Redux/Regester";
import homeReducer from "./spotify/Redux/Home";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

const store = configureStore({
	reducer: {
		regester: regesterReducer,
		home: homeReducer,
	},
});

const rootElement = document.getElementById("root");
ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
	rootElement
);
