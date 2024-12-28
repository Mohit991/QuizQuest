import React, { useState, useContext } from "react";
import { Box, TextField, Button, Typography, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../api/api";
import { AppContext } from "../../context/AppContext";
import CustomSpinner from "../../components/CustomSpinner";

const SignUp = () => {
  const { setUserName, setUserId, setUserEmail, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const validateForm = () => {
    const { name, age, gender, email, password, confirmPassword } = formData;

    if (!name || !age || !gender || !email || !password || !confirmPassword) {
      return "All fields are required.";
    }

    if (!/^[A-Za-z]+$/.test(name)) {
      return "Name should only contain alphabetic characters.";
    }

    if (name.length < 2 || name.length > 50) {
      return "Name must be between 2 and 50 characters.";
    }

    const ageNumber = parseInt(age, 10);
    if (isNaN(ageNumber) || ageNumber < 1 || ageNumber > 80) {
      return "Age must be a number between 1 and 80.";
    }

    if (!["male", "female", "other"].includes(gender.toLowerCase())) {
      return "Gender must be 'Male', 'Female', or 'Other'.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address.";
    }

    if (password.length < 8 || password.length > 100) {
      return "Password must be between 8 and 100 characters.";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    return null;
  };

  const handleSignUp = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const { name, age, gender, email, password } = formData;

      const { token, user } = await signUp(name, age, gender, email, password);

      localStorage.setItem("token", token);
      setToken(token);
      setUserId(user.id);
      setUserName(user.name);
      setUserEmail(user.email);

      navigate("/"); // Redirect to HomePage
    } catch (err) {
      setError(err.message || "An error occurred during sign up.");
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
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: "black" }}>
        Sign Up
      </Typography>

      <Box
        sx={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <TextField
          fullWidth
          label="Your Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Your Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          select
          label="Your Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          margin="normal"
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          margin="normal"
        />

        {error && (
          <Typography color="error" sx={{ marginTop: "10px" }}>
            {error}
          </Typography>
        )}

        {success && (
          <Typography color="primary" sx={{ marginTop: "10px" }}>
            {success}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: "20px" }}
          onClick={handleSignUp}
          disabled={loading}
        >
          {loading ? <CustomSpinner /> : "Sign Up"}
        </Button>
      </Box>
    </Box>
  );
};

export default SignUp;
