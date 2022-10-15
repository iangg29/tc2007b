// (c) Tecnologico de Monterrey 2022, rights reserved.

import React, { lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const Landing = lazy(async () => await import("./pages/Landing"));
const Login = lazy(async () => await import("./pages/auth/Login"));
const SignUp = lazy(async () => await import("./pages/auth/SignUp"));
const Layout = lazy(async () => await import("./containers/Layout"));

function App(): JSX.Element {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/download" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/app/*" element={<Layout />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
