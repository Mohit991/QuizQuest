import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import RoutesConfig from "./routes/RoutesConfig";
import { AppContext } from "./context/AppContext";
import CustomSpinner from "./components/CustomSpinner";
import ErrorPage from "./pages/ErrorPage";
import { verifyToken } from "./services/apiService";
import ResponsiveAppBar from "./components/AppBar";

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
        <>
          <ResponsiveAppBar />
          <RoutesConfig />
        </>
      ) : (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
