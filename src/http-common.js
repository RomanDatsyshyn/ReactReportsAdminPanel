import axios from "axios";

export default axios.create({
  baseURL: "http://10.233.66.3:6660/api",
  // baseURL:
  // "https://cors-anywhere.herokuapp.com/https://dashboard-stage.twl.ae/api",
  headers: {
    "Content-type": "application/json",
  },
});
