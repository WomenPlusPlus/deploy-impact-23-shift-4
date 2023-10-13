import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes as Routing,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";

import Login from "../components/pages/login/Login";
import Register from "../components/pages/register/RegisterCandidate";
import Candidates from "../components/pages/candidates/Candidates";
import Authenticated from "../components/layout/authenticated/Authenticated";
import DashboardCandidate from "../components/pages/dashboardCandidate/DashboardCandidate";
import Jobs from "../components/pages/jobs/Jobs";
import Companies from "../components/pages/companies/Companies";
import Shortlist from "../components/pages/shortlist/Shortlist";
import CandidateProfile from "../components/pages/profile/CandidateProfile";
import DashboardCompany from "../components/pages/dashboardCompanies/DashboardCompanies";
import CompanyProfile from "../components/pages/companyProfile/CompanyProfile";
import NotFound from "../components/pages/notfound/NotFound";

export interface IApplicationProps {}

const RegisterRoute: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const link = searchParams.get("link") || "";
  const token = searchParams.get("token") || "";
  const expires = searchParams.get("expires") || "";
  const user_type = searchParams.get("user_type") || "";
  const signature = searchParams.get("signature") || "";
  const associations = searchParams.get("associations") || "";
  console.log("link", link);

  // Use a state variable to manage the component's state
  const [validURL, setValidURL] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make an API call to verify the URL
    axios
      .post(
        "/api/verify_invite",
        { link: location.search, user_type: user_type },
        { withCredentials: true }
      )
      .then((response) => {
        // If the URL is valid, set the validURL state to true
        console.log("response", response.data);
        const status_code = response.data.response;
        if (status_code === 200) {
          setValidURL(true);
        }
      })
      .catch((error) => {
        console.log("error", error);
        // If the URL is not valid, set the validURL state to false
        setValidURL(false);
      })
      .finally(() => {
        // Set loading to false when the API call is complete
        setLoading(false);
      });
  }, [location.search, user_type]);

  // Render the appropriate component based on the validURL state
  if (loading) {
    return <div>Loading...</div>;
  } else if (validURL) {
    return (
      <Register
        token={token}
        expires={expires}
        user_type={user_type}
        signature={signature}
        associations={[associations]}
      />
    );
  } else {
    return <Navigate to="/not-found" state={link}/>;
  }
};

const Routes: React.FC<IApplicationProps> = (props) => {
  const [userType, setUserType] = useState<string | null>("");
  console.log("User type:", userType);

  return (
    <BrowserRouter>
      <Routing>
        <Route path="/login" element={<Login setUser={setUserType} />} />
        <Route path="/register" element={<RegisterRoute />} />
        <Route
          path="/"
          element={
            userType === "candidate" ? (
              <Authenticated content={<DashboardCandidate />} />
            ) : userType === "company" ? (
              <Authenticated content={<DashboardCompany />} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/jobs" element={<Authenticated content={<Jobs />} />} />
        <Route
          path="/companies"
          element={<Authenticated content={<Companies />} />}
        />
        <Route
          path="/saved"
          element={<Authenticated content={<Shortlist />} />}
        />
        <Route
          path="/candidates"
          element={<Authenticated content={<Candidates />} />}
        />
        <Route
          path="/candidate-profile"
          element={<Authenticated content={<CandidateProfile />} />}
        />
        <Route
          path="/company-profile"
          element={<Authenticated content={<CompanyProfile />} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routing>
    </BrowserRouter>
  );
};

export default Routes;
