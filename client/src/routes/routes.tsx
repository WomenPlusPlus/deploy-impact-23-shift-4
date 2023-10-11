import { useState } from "react";
import {
  BrowserRouter,
  Routes as Routing,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Login from "../components/pages/login/Login";
import Register from "../components/pages/register/Register";
import Candidates from "../components/pages/candidates/Candidates";
import Authenticated from "../components/layout/authenticated/Authenticated";
import DashboardCandidate from "../components/pages/dashboardCandidate/DashboardCandidate";
import Jobs from "../components/pages/jobs/Jobs";
import Companies from "../components/pages/companies/Companies";
import Shortlist from "../components/pages/shortlist/Shortlist";
import CandidateProfile from "../components/pages/profile/CandidateProfile";
import DashboardCompany from "../components/pages/dashboardCompanies/DashboardCompanies";
import CompanyProfile from "../components/pages/companyProfile/CompanyProfile";

export interface IApplicationProps {}

const RegisterRoute: React.FC = () => {
  const location = useLocation();
  // TODO: api call to "verify_invite"
  if (
    window.location.href ===
    "http://localhost:3000/register?token=cmVnaXN0ZXI_dG9rZW49c2VlZWNyZXRLRVkmZXhwaXJlcz0xNjk3MTQ4MzM3JnVzZXJfdHlwZT1jYW5kaWRhdGU=&expires=1697148337&user_type=candidate&signature=bNPSNl6394nhbbHTUQ82maDVgUYXS2RRjpEi-m9eYy0="
  ) {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token") || "";
    const expires = searchParams.get("expires") || "";
    const user_type = searchParams.get("user_type") || "";
    const signature = searchParams.get("signature") || "";

    return (
      <Register
        token={token}
        expires={expires}
        user_type={user_type}
        signature={signature}
      />
    );
  } else {
    return <Navigate to="/not-found" />;
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
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routing>
    </BrowserRouter>
  );
};

export default Routes;
