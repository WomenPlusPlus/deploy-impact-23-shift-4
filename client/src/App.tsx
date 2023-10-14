import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConfigProvider } from "antd";
import Routes from "./routes/routes";
import { AuthProvider } from "./context/auth";

function App() {
  return (
    <GoogleOAuthProvider clientId="<your_client_id>">
      <AuthProvider>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#10239e",
            },
          }}
        >
          <Routes />
        </ConfigProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
