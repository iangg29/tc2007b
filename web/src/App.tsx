import React, { lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const Landing = lazy(async () => await import("./pages/Landing"));
const Login = lazy(async () => await import("./pages/auth/Login"));
const SignUp = lazy(async () => await import("./pages/auth/SignUp"));
const Layout = lazy(async () => await import("./containers/Layout"));
const Home = lazy(async () => await import("./pages/home/Home"));
const Documentation = lazy(async () => await import("./pages/Req_Documentation"));
const Detail = lazy(async () => await import("./pages/Req_Detail"));

function App(): JSX.Element {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Documentation" element={<Documentation />} />
          <Route path="/Detail" element={<Detail />} />
          <Route path="/app/*" element={<Layout />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
