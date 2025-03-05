import React, { useContext } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { googleSignIn } from '../services/apiService';

const GoogleLoginButton = () => {
  const { setUserName, setUserId, setUserEmail, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const responseGoogle = async (response) => {
    try {
      const token = response.credential;
      if (!token) {
        throw new Error("No token provided");
      }
      // console.log(token)

      const googleUser = await googleSignIn(token);
      if (!googleUser) {
        throw new Error("Invalid Google token");
      }

      // console.log('googleUser = ', googleUser);

      localStorage.setItem("token", googleUser.JwtToken);
      setToken(googleUser.JwtToken);
      setUserId(googleUser.user.id);
      setUserName(googleUser.user.name);
      setUserEmail(googleUser.user.email);

      navigate("/"); // Redirect to HomePage
      
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;