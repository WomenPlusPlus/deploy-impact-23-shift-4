import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConfigProvider } from "antd";
import Routes from "./routes/routes";
import "./config";

function App() {
  return (
    <GoogleOAuthProvider clientId="<your_client_id>">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#10239e",
            },
          }}
        >
          <Routes />
        </ConfigProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
