import { Box, Button, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const SelectedQuizOptions = () => {
  const { category, topic, noOfQuestions, level } = useParams(); // Retrieve route parameters
  const navigate = useNavigate();

  const onStartQuiz = () => {
    // Navigate to the relative route for the quiz
    navigate("start");
  };

  return (
    <Box className="selectedOptions">
      <Typography
        className="text-head"
        variant="h2"
        letterSpacing={2}
      >
        START QUIZ
      </Typography>

      <Box>
        <Typography py={2} className="text">Category : {category}</Typography>
        <Typography py={2} className="text">Topic : {topic}</Typography>
        <Typography py={2} className="text">Questions : {noOfQuestions}</Typography>
        <Typography py={2} className="text">Level : {level}</Typography>
      </Box>

      <Button
        onClick={onStartQuiz}
        mt={2}
        className="btn"
      >
        START QUIZ
      </Button>
    </Box>
  );
};

export default SelectedQuizOptions;
