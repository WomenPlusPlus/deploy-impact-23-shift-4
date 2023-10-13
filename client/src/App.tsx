import "./App.css";
import Routes from "./routes/routes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/auth";

function App() {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId="<your_client_id>">
        <Routes />
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default App;
