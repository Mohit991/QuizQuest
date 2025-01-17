import React, { useState, useContext } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../services/apiService";
import { AppContext } from "../../context/AppContext";
import CustomSpinner from "../../components/CustomSpinner";
import GoogleLoginButton from '../../components/GoogleLoginButton';

const SignInPage = () => {
  const { setUserName, setUserId, setUserEmail, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSignIn = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const { token, user } = await signIn(email, password);

      localStorage.setItem("token", token);
      setToken(token);
      setUserId(user.id);
      setUserName(user.name);
      setUserEmail(user.email);

      navigate("/"); // Redirect to HomePage
    } catch (err) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "86vh",
        padding: "20px",
        backgroundColor: "transparent",

      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "#ffa116",

        }}
      >
        Sign In
      </Typography>

      <Box
        sx={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "#282828",
          border: "none",
          padding: "20px",
          borderRadius: "8px",
          color: "white"
        }}
      >
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          autoComplete="off"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#3e3e3e",
              "&:hover": {
                backgroundColor: "none",
              },
              "&.Mui-focused": {
                backgroundColor: "#3e3e3e",
              },
              "& fieldset": {
                border: "none",
              },
            },
            "& .MuiOutlinedInput-input": {
              color: "white",
            },
            "& .MuiInputLabel-root": {
              fontSize: "16px",
              color: "#ffa116",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#ffa116",
            },
          }}
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          autoComplete="off"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#3e3e3e",
              "&:hover": {
                backgroundColor: "none",
              },
              "&.Mui-focused": {
                backgroundColor: "#3e3e3e",
              },
              "& fieldset": {
                border: "none",
              },
            },
            "& .MuiOutlinedInput-input": {
              color: "white",
            },
            "& .MuiInputLabel-root": {
              fontSize: "16px",
              color: "#ffa116",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#ffa116",
            },
          }}
        />

        {error && (
          <Typography
            color="error"
            sx={{
              marginTop: "10px",
              color: "#ff6347",
            }}
          >
            {error}
          </Typography>
        )}

        <Button
          fullWidth
          sx={{
            backgroundColor: "#ffa1161f",
            color: "#ffa116",
            fontWeight: "bold",

            "&:hover": {
              backgroundColor: "rgba(255, 161, 22, 0.3)",
            },
          }}
          onClick={handleSignIn}
          disabled={loading}
        >
          {loading ? <CustomSpinner /> : "Sign In"}
        </Button>
        <Box>or</Box>
        <Box py={1}>
          <GoogleLoginButton />
        </Box>
      </Box>
    </Box>
  );
};

export default SignInPage;
