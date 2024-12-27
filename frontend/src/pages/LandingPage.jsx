import React from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/signin"); // Adjust the path based on your app's routing
  };

  const handleSignUp = () => {
    navigate("/signup"); // Adjust the path based on your app's routing
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      {/* Welcome Banner */}
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          marginBottom: "1rem",
          textShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
        }}
      >
        Welcome to Quiz Hub
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: "2rem" }}>
        Challenge yourself with quizzes on various topics, track your progress,
        and learn while having fun!
      </Typography>

      {/* Call to Actions */}
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleSignIn}
          sx={{
            backgroundColor: "#fff",
            color: "#6a11cb",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          Sign In
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={handleSignUp}
          sx={{
            color: "#fff",
            borderColor: "#fff",
            fontWeight: "bold",
            "&:hover": {
              borderColor: "#f0f0f0",
              color: "#f0f0f0",
            },
          }}
        >
          Sign Up
        </Button>
      </Box>

      {/* Additional Info Section */}
      <Container maxWidth="md" sx={{ marginTop: "3rem", textAlign: "center" }}>
        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
          Whether you're preparing for exams, improving your general knowledge,
          or simply having fun, Quiz Hub is your go-to platform. Dive into a
          variety of topics, earn badges for your achievements, and compete with
          friends. Start your journey today!
        </Typography>
      </Container>
    </Box>
  );
};

export default LandingPage;
