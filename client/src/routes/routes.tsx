import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes as Routing,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../components/pages/login/Login";
import RegisterRoute from "./redirect";
import Candidates from "../components/pages/candidates/Candidates";
import Authenticated from "../components/layout/authenticated/Authenticated";
import DashboardCandidate from "../components/pages/dashboardCandidate/DashboardCandidate";
import Jobs from "../components/pages/jobs/Jobs";
import Companies from "../components/pages/companies/Companies";
import Shortlist from "../components/pages/shortlist/Shortlist";
import CandidateProfile from "../components/pages/candidateProfile/CandidateProfile";
import DashboardCompany from "../components/pages/dashboardCompanies/DashboardCompanies";
import CompanyProfile from "../components/pages/companyProfile/CompanyProfile";
import NotFound from "../components/pages/notfound/NotFound";

export interface IApplicationProps {}

const Routes: React.FC<IApplicationProps> = (props) => {
  const [userType, setUserType] = useState<string>("");
  
  useEffect(() => {
    const authString = localStorage.getItem("auth");
    if (authString) {
      const auth = JSON.parse(authString);
      if (auth && auth.user && auth.user.user_type) {
        const userTypeFetched = auth.user.user_type;
        setUserType(userTypeFetched);
      }
    }
  }, []);

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
