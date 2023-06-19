import React from "react";
import axios from "axios";
const mainApi = axios.create({
  baseURL: "https://6437f5e2c1565cdd4d6274f2.mockapi.io",
  // timeout: 50000,
});

export default mainApi;
