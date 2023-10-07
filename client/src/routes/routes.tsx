import React from "react";
import { BrowserRouter, Routes as Routing, Route } from "react-router-dom";

import Login from "../components/pages/login/Login";
import Register from "../components/pages/register/Register";
import Homepage from "../components/layout/Layout";
import Candidates from "../components/pages/candidates/Candidates";

export interface IApplicationProps {}

const Routes: React.FC<IApplicationProps> = (props) => {
  return (
    <BrowserRouter>
      <Routing>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routing>
    </BrowserRouter>
  );
};

export default Routes;
