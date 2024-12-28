import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import RoutesConfig from "./routes/RoutesConfig";
import { AppContext } from "./context/AppContext";

function App() {
  const { userId } = useContext(AppContext);

  return (
    <Router>
      {userId ? (
        <RoutesConfig />
      ) : (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
