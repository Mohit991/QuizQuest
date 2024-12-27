import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import RoutesConfig from "./routes/RoutesConfig"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      {isAuthenticated ? (
        <RoutesConfig />
      ) : (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn setAuth={setIsAuthenticated} />} />
          <Route path="/signup" element={<SignUp setAuth={setIsAuthenticated} />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
