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
          color: "#ffa116", 
          textShadow: "0 4px 6px rgba(0, 0, 0, 0.3)", 
        }}
      >
        Welcome to Quiz Hub
      </Typography>
      <Typography
        variant="h5"
        sx={{
          marginBottom: "2rem",
          color: "#eff1f6bf", 
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
            backgroundColor: "#ffa1161f",
            color: "#ffa116", 
            fontWeight: "bold",
            
            "&:hover": {
              backgroundColor: "rgba(255, 161, 22, 0.3)", 
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
            color: "#eff1f6bf", 
            fontWeight: "bold",
            backgroundColor:"#393939",
            border:"none",
            
            "&:hover": {
              backgroundColor:"rgba(57, 57, 57, 0.8)"
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
            
            color: "#eff1f6bf",
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
