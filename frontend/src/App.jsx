import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import RoutesConfig from "./routes/RoutesConfig";
import { AppContext } from "./context/AppContext";
import CustomSpinner from "./components/CustomSpinner";
import ErrorPage from "./pages/ErrorPage";
import { verifyToken } from "./api/api";
import UserProgress from "./pages/user/UserProgress";

function App() {
  const { userId, setUserId, setUserName, setUserEmail } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const user = await verifyToken(token);
          const { id, name, email } = user;
          setUserId(id);
          setUserName(name);
          setUserEmail(email);
        } catch (error) {
          console.error("Token verification failed:", error);
          setIsError(true);
          localStorage.removeItem("token");
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    checkToken();
  }, [setUserId, setUserName, setUserEmail]);

  if (isError) {
    return <ErrorPage />; // Properly render the ErrorPage
  }

  if (isLoading) {
    return <CustomSpinner />; // Render spinner while loading
  }

  return (
    <Router>
      {userId ? (
        <RoutesConfig />
      ) : (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user-progress" element={<UserProgress />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
