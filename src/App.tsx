import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Lazy load the Login and SignUp components directly
const Login = React.lazy(() => import("./pages/Login/Login"));
const SignUp = React.lazy(() => import("./pages/SignUp/SignUp"));

const App: React.FC = () => {
  return (
    // Router wraps the application, enabling routing functionality
    <Router>
      {/* Suspense provides a fallback UI while lazy-loaded components are being loaded */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Define the route for the Login page */}
          <Route path="/" element={<Login />} />
          {/* Define the route for the SignUp page */}
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
