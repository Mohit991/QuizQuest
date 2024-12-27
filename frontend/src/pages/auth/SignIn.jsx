import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const SignIn = ({ setAuth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    if (username && password) {
      // Add authentication logic here
      setAuth(true); // Update authenticated state
      console.log("User signed in successfully");
    } else {
      alert("Please fill in both fields.");
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
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
