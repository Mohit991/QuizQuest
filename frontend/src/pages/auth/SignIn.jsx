import React, { useState, useContext } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

const SignIn = () => {
  const { setUserName, setUserId, setUserEmail } = useContext(AppContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      const baseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

      const response = await axios.post(`${baseUrl}/public/login`, { email, password });

      const { token, user } = response.data;

      localStorage.setItem("jwtToken", token);
      setUserId(user.id);
      setUserName(user.name);
      setUserEmail(user.email);

      navigate("/"); // Redirect to HomePage
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: "black" }}>
        Sign In
      </Typography>

      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />

        {error && (
          <Typography color="error" sx={{ marginTop: "10px" }}>
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: "20px" }}
          onClick={handleSignIn}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

export default SignIn;
