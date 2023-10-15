import axios from "axios";
console.log("env production REACT_APP_API", process.env.REACT_APP_API);

axios.defaults.baseURL = process.env.REACT_APP_API;

const proxyConfig = {
  "/api": {
    target:
      process.env.REACT_APP_ENV === "production"
        ? "https://banana-builders.onrender.com"
        : "http://localhost:5001",
    changeOrigin: true,
  },
};

export default proxyConfig;
