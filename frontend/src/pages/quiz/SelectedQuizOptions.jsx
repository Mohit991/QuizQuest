import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext"; 

const SelectedQuizOptions = () => {
  const navigate = useNavigate();
  const { selectedCategory, selectedTopic, selectedNoOfQuestions, selectedLevel } =
    useContext(AppContext); // Retrieve options from context

  const onStartQuiz = () => {
    navigate("start");
  };

  return (
    <Box className="selectedOptions" py={4} px={2}>
      <Typography
        className="text-head"
        variant="h2"
        letterSpacing={2}
        mb={4}
        textAlign="center"
      >
        START QUIZ
      </Typography>

      <Box>
        <Typography py={2} className="text">
          <strong>Category:</strong> {selectedCategory}
        </Typography>
        <Typography py={2} className="text">
          <strong>Topic:</strong> {selectedTopic}
        </Typography>
        <Typography py={2} className="text">
          <strong>Questions:</strong> {selectedNoOfQuestions}
        </Typography>
        <Typography py={2} className="text">
          <strong>Level:</strong> {selectedLevel}
        </Typography>
      </Box>

      <Button
        onClick={onStartQuiz}
        variant="contained"
        color="primary"
        sx={{ mt: 4, width: "100%" }}
        className="btn"
      >
        START QUIZ
      </Button>
    </Box>
  );
};

export default SelectedQuizOptions;
