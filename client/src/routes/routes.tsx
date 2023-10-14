import { BrowserRouter, Routes as Routing, Route } from "react-router-dom";

import Login from "../components/pages/login/Login";
import { RegisterRoute, DashboardRoute } from "./redirect";
import Candidates from "../components/pages/candidates/Candidates";
import Authenticated from "../components/layout/authenticated/Authenticated";

import Jobs from "../components/pages/jobs/Jobs";
import Companies from "../components/pages/companies/Companies";
import Shortlist from "../components/pages/shortlist/Shortlist";
import CandidateProfile from "../components/pages/profile/CandidateProfile";

import CompanyProfile from "../components/pages/companyProfile/CompanyProfile";
import NotFound from "../components/pages/notfound/NotFound";
import DashboardAssociations from "../components/pages/dashboardAssociations/DashboardAssociations";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routing>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterRoute />} />
        <Route
          path="/"
          element={<Authenticated content={<DashboardRoute />} />}
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
        <Route
          path="/dashboard-association"
          element={<Authenticated content={<DashboardAssociations />} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routing>
    </BrowserRouter>
  );
};

export default Routes;
