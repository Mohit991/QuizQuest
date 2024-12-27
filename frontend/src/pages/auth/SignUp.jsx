import React, { useState, useContext } from "react";
import { Box, TextField, Button, Typography, MenuItem } from "@mui/material";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

const SignUp = () => {

  const { setUserName, setUserId, setUserEmail } = useContext(AppContext);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear errors as the user types
    setSuccess(""); // Clear success message
  };

  const validateForm = () => {
    const { name, age, gender, email, password, confirmPassword } = formData;

    // Check required fields
    if (!name || !age || !gender || !email || !password || !confirmPassword) {
      return "All fields are required.";
    }

    // Validate name
    if (!/^[A-Za-z]+$/.test(name)) {
      return "Name should only contain alphabetic characters.";
    }
    if (name.length < 2 || name.length > 50) {
      return "Name must be between 2 and 50 characters.";
    }

    // Validate age
    const ageNumber = parseInt(age, 10);
    if (isNaN(ageNumber) || ageNumber < 1 || ageNumber > 80) {
      return "Age must be a number between 1 and 80.";
    }

    // Validate gender
    if (!["male", "female", "other"].includes(gender.toLowerCase())) {
      return "Gender must be 'Male', 'Female', or 'Other'.";
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address.";
    }

    // Validate password
    if (password.length < 8 || password.length > 100) {
      return "Password must be between 8 and 100 characters.";
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    return null; // No errors
  };

  const handleSignUp = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      // Send the data to the backend
      const { name, age, gender, email, password } = formData;

      const baseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;
      const response = await axios.post(`${baseUrl}/users`, {
        name,
        age: parseInt(age, 10),
        gender,
        email,
        password,
      });

      // Extract JWT and user details from the response
      const { token, user } = response.data;

      // Store the token in localStorage
      localStorage.setItem("jwtToken", token);

      // save the user details for context management
      setUserId(user.id)
      setUserName(user.name)
      setUserEmail(user.email)

      setSuccess("Sign Up Successful!");
      setFormData({
        name: "",
        age: "",
        gender: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during sign-up.");
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
          label="Email ID"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
        />
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
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default SignUp;
