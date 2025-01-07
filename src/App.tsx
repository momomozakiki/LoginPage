import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { MainPage } from "./components";
import SkipLink from "./components/SkipLink/SkipLink";
import LoadingFallback from "./components/LoadingFallback/LoadingFallback";

// Lazy load the components
const Login = React.lazy(() => import("./pages/Login/Login"));
const SignUp = React.lazy(() => import("./pages/SignUp/SignUp"));
const ResetPassword = React.lazy(
  () => import("./pages/ResetPassword/ResetPassword"),
);

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <SkipLink />
        <Suspense fallback={<LoadingFallback />}>
          <MainPage>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
          </MainPage>
        </Suspense>
      </AuthProvider>
    </Router>
  );
};

export default App;
