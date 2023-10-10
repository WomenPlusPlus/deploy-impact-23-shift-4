import React from "react";
import { BrowserRouter, Routes as Routing, Route } from "react-router-dom";

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

const Routes: React.FC<IApplicationProps> = (props) => {
  return (
    <BrowserRouter>
      <Routing>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={<Authenticated content={<DashboardCandidate />} />}
        />
        <Route
          path="/dashboard-company"
          element={<Authenticated content={<DashboardCompany />} />}
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
