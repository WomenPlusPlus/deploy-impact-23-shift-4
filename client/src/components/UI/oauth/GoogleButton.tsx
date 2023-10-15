import { GoogleLogin } from "@react-oauth/google";

const GoogleButton = () => {
  return (
    <GoogleLogin
      text="signup_with"
      onSuccess={(credentialResponse) => {
        console.log(credentialResponse);
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export { GoogleButton };
