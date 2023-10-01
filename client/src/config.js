import axios from "axios";

// axios config for all requests
if (window.location.hostname === "localhost") {
  // Local environment
  console.log(`API SERVER ${process.env.REACT_APP_API}`);
  axios.defaults.baseURL = process.env.REACT_APP_API;
}
