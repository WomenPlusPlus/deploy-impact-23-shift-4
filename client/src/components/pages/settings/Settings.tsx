import { useState } from "react";
import styling from "./Settings.module.css";
import Spinner from "../../UI/spinner/Spinner";

const Settings = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styling.main}>
      <h1 className="header">Settings</h1>
    </div>
  );
};

export default Settings;
