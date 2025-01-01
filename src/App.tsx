import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import NavBar from "./components/NavBar/NavBar";

// Lazy load the components
const Login = React.lazy(() => import("./pages/Login/Login"));
const SignUp = React.lazy(() => import("./pages/SignUp/SignUp"));
const ResetPassword = React.lazy(() => import("./pages/ResetPassword/ResetPassword"));

// Loading component
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh' 
  }}>
    Loading...
  </div>
);

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please refresh the page.</div>;
    }

    return this.props.children;
  }
}

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <Suspense fallback={<LoadingFallback />}>
            <div className="app-container">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/reset-password" element={<ResetPassword />} />
              </Routes>
              <NavBar />
            </div>
          </Suspense>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
