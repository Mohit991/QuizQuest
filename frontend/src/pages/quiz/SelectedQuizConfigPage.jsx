import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Container, Paper, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { AppContext } from "../../context/AppContext";

const SelectedQuizConfigPage = () => {
  const navigate = useNavigate();
  const { selectedCategory, selectedTopic, selectedNoOfQuestions, selectedLevel } = useContext(AppContext);

  const onStartQuiz = () => {
    navigate("start");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        backgroundColor: "#393939",
        pt: 9,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              backgroundColor: "#242424",
              color: "#ffa116",
              borderRadius: "16px",
            }}
          >
            <motion.div variants={itemVariants}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  mb: 4,
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                  fontSize: { xs: "2.5rem", md: "3.75rem" },
                }}
              >
                START QUIZ ?
              </Typography>
            </motion.div>

            <Grid container spacing={3}>
              {[
                { label: "Category", value: selectedCategory },
                { label: "Topic", value: selectedTopic },
                { label: "Questions", value: selectedNoOfQuestions },
                { label: "Level", value: selectedLevel },
              ].map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <motion.div variants={itemVariants}>
                    <Paper
                      elevation={2}
                      sx={{
                        p: 2,
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        borderRadius: "8px",
                        color:"white"
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                        {item.label}:
                      </Typography>
                      <Typography variant="body1">{item.value}</Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            <motion.div variants={itemVariants}>
              <Button
                onClick={onStartQuiz}
                variant="contained"
                sx={{
                  mt: 4,
                  width: "100%",
                  backgroundColor: "#ffa116",
                  color: "#242424",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  py: 1.5,
                  "&:hover": {
                    backgroundColor: "#ff8c00",
                  },
                }}
              >
                START QUIZ
              </Button>
            </motion.div>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default SelectedQuizConfigPage;

