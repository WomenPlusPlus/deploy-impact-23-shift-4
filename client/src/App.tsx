import "./App.css";
import Routes from "./routes/routes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./config";

function App() {
  return (
    <GoogleOAuthProvider clientId="<your_client_id>">
      <Routes />
    </GoogleOAuthProvider>
  );
}

export default App;
