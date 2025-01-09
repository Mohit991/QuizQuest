import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Paper, LinearProgress } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { fetchQuiz } from "../services/apiService";
import CustomSpinner from "./CustomSpinner";
import ErrorPage from "../pages/ErrorPage";

const Quiz = () => {
  const [response, setResponse] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(-1);
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { selectedTopicId, score, setScore, selectedNoOfQuestions, selectedLevel, token } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndSetupQuiz = async () => {
      setScore(0);
      try {
        const data = await fetchQuiz(token, selectedTopicId, selectedNoOfQuestions, selectedLevel)
        setResponse(data);
  
        if (data.length > 0) {
          setupQuestion(data[0]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        setIsError(true);
      }
    };
  
    const setupQuestion = (questionObject) => {
      setQuestionText(questionObject.question_text);
      const answerOptions = [
        questionObject.option1,
        questionObject.option2,
        questionObject.option3,
        questionObject.option4,
      ];
      setOptions(answerOptions);
      setCorrectAnswer(questionObject.correct_option);
    };
  
    if (response.length > 0 && questionIndex < response.length) {
      setupQuestion(response[questionIndex]);
    } else if (response.length > 0 && questionIndex >= response.length) {
      navigate("/quiz/score");
    } else {
      fetchAndSetupQuiz();
    }
  }, [response, questionIndex, selectedNoOfQuestions, selectedLevel, token]);

  const handleOptionSelect = (index) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === -1) return;

    if (selectedAnswer + 1 === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    setSelectedAnswer(-1);
    setQuestionIndex((prevIndex) => prevIndex + 1);
  };

  if (isError) {
    return <ErrorPage />;
  }

  if (isLoading) {
    return <CustomSpinner />;
  }

  return (
    <Box sx={{
      minHeight: "90vh",
      backgroundColor: "#393939",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <Paper elevation={3} sx={{
        maxWidth: "600px",
        width: "100%",
        p: 4,
        backgroundColor: "#242424",
        color: "#ffa116",
        borderRadius: "16px",
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3 }}>
            Question {questionIndex + 1} of {response.length}
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={(questionIndex / response.length) * 100} 
            sx={{ mb: 3, backgroundColor: "#393939", "& .MuiLinearProgress-bar": { backgroundColor: "#ffa116" } }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={questionIndex}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <Typography variant="h6" gutterBottom align="center" sx={{ mb: 3 }}>
                {questionText}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {options.map((option, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      fullWidth
                      variant={selectedAnswer === index ? "contained" : "outlined"}
                      onClick={() => handleOptionSelect(index)}
                      sx={{
                        borderColor: "#ffa116",
                        color: selectedAnswer === index ? "#242424" : "#ffa116",
                        backgroundColor: selectedAnswer === index ? "#ffa116" : "transparent",
                        "&:hover": {
                          backgroundColor: selectedAnswer === index ? "#ff8c00" : "rgba(255, 161, 22, 0.1)",
                        },
                      }}
                    >
                      {option}
                    </Button>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              variant="contained"
              fullWidth
              onClick={handleNextQuestion}
              sx={{
                mt: 4,
                backgroundColor: "#ffa116",
                color: "#242424",
                "&:hover": {
                  backgroundColor: "#ff8c00",
                },
              }}
            >
              {questionIndex === response.length - 1 ? "Finish Quiz" : "Next"}
            </Button>
          </motion.div>
        </motion.div>
      </Paper>
    </Box>
  );
};

export default Quiz;

