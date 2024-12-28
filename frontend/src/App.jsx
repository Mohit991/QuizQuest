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

function App() {
  const { userId, setUserId, setUserName, setUserEmail } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const baseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;
          const response = await axios.get(`${baseUrl}/users/verifyToken`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          // If token is valid, update context
          const { id, name, email } = response.data.user;
          setUserId(id);
          setUserName(name);
          setUserEmail(email);
        } catch (error) {
          console.error("Token verification failed:", error.response?.data?.message || error.message);
          setIsError(true); // Set error state
          localStorage.removeItem("token"); // Clear invalid token
        } finally {
          setIsLoading(false); // Ensure loading is false regardless of success or error
        }
      } else {
        setIsLoading(false); // No token, stop loading
      }
    };

    verifyToken();
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
        </Routes>
      )}
    </Router>
  );
}

export default App;
