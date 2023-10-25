import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingGIF from "../../../media/loading.svg";
import styling from "./LoginRedirect.module.css";

const LoginRedirect: React.FC = () => {
  // Update to show login popup
  // state
  const [count, setCount] = useState(3);
  // hook
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // setInterval: run a function every x seconds
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    //  redirect once count is equal to 0
    count === 0 && navigate(`/login`, { state: location.pathname });
    // cleanup
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [count]);

  return (
    <div
      className={styling.loading}
      style={{ height: "90vh" }}
    >
      <img src={LoadingGIF} alt="Loading" style={{ width: "100px" }} />
    </div>
  );
};

export { LoginRedirect };
