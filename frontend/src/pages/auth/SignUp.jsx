import React, { useState } from "react";
import { Box, TextField, Button, Typography, MenuItem } from "@mui/material";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear errors as the user types
  };

  const handleSignUp = () => {
    const { name, age, gender, email, password, confirmPassword } = formData;

    if (!name || !age || !gender || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Add sign-up logic here
    console.log("User signed up successfully:", formData);
    alert("Sign Up Successful!");
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
          label="Email ID"
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
