import React from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/signin");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        backgroundColor: "transparent",
        color: "#004c70", // Dark teal
        
        minHeight: "86vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Welcome Banner */}
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          marginBottom: "1rem",
          color: "#004c70", // Dark teal
          textShadow: "0 4px 6px rgba(0, 0, 0, 0.3)", // Subtle shadow for depth
        }}
      >
        Welcome to Quiz Hub
      </Typography>
      <Typography
        variant="h5"
        sx={{
          marginBottom: "2rem",
          color: "#eae7dc", // Light beige
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)", // Subtle shadow for readability
        }}
      >
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
            backgroundColor: "#004c70", // Dark teal
            color: "#f5f5f5", // Off-white
            fontWeight: "bold",
            
            "&:hover": {
              backgroundColor: "#3a7ca5", // Slightly lighter teal
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
            color: "#004c70", // Dark teal
            borderColor: "#004c70", // Border matches text
            fontWeight: "bold",
            
            "&:hover": {
              borderColor: "#3a7ca5", // Lighter teal on hover
              color: "#3a7ca5",
            },
          }}
        >
          Sign Up
        </Button>
      </Box>

      {/* Additional Info Section */}
      <Container maxWidth="md" sx={{ marginTop: "3rem", textAlign: "center" }}>
        <Typography
          variant="body1"
          sx={{
            lineHeight: 1.8,
            
            color: "#eae7dc", // Light beige
          }}
        >
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
