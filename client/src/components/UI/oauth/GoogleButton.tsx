import { GoogleLogin } from "@react-oauth/google";

interface GoogleButtonProps {
  text: "signin_with" | "signup_with" | "continue_with" | "signin" | undefined;
}

const GoogleButton = (
  { text }: GoogleButtonProps = { text: "signin_with" }
) => {
  return (
    <GoogleLogin
      text={text}
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
