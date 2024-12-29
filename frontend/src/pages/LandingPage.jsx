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
        backgroundColor: "#050801",
        color: "#39ff14",
        fontFamily: "monospace",
        minHeight: "86vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "1.7rem",
        border: "0.1px solid #39ff14",
        borderRadius: "5px",
        WebkitMask: `
                  conic-gradient(at 50px 50px, #0000 75%, #000 0) 0 0/calc(100% - 50px) calc(100% - 50px),
                  linear-gradient(#000 0 0) content-box
                `,
      }}
    >
      {/* Welcome Banner */}
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          marginBottom: "1rem",
          textShadow: "0 4px 6px rgba(57, 255, 20, 0.3)",
        }}
      >
        Welcome to Quiz Hub
      </Typography>
      <Typography
        variant="h5"
        sx={{
          marginBottom: "2rem",
          textShadow: "0 2px 4px rgba(57, 255, 20, 0.3)",
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
            backgroundColor: "#39ff14",
            color: "#050801",
            fontWeight: "bold",
            fontFamily: "monospace",
            "&:hover": {
              backgroundColor: "#28cc10",
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
            color: "#39ff14",
            borderColor: "#39ff14",
            fontWeight: "bold",
            fontFamily: "monospace",
            "&:hover": {
              borderColor: "#28cc10",
              color: "#28cc10",
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
            fontFamily: "monospace",
            color: "#39ff14",
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
