import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Question from "../../components/Question";
import Option from "../../components/Option";
import { Box, Button, Typography } from "@mui/material";
import CustomSpinner from "../../components/CustomSpinner";
import ErrorPage from "../ErrorPage";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import { fetchQuiz } from "../../services/apiService";

const Quiz = () => {
  // State variables
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
          setupQuestion(data[0]); // Set up the first question
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        setIsError(true);
      }
    };
  
    const setupQuestion = (questionObject) => {
      setQuestionText(questionObject.question_text);
  
      // Extract options
      const answerOptions = [
        questionObject.option1,
        questionObject.option2,
        questionObject.option3,
        questionObject.option4,
      ];
  
      setOptions(answerOptions);
      setCorrectAnswer(questionObject.correct_option);
    };
  
    // If questions are already fetched, update the next question on questionIndex change
    if (response.length > 0 && questionIndex < response.length) {
      setupQuestion(response[questionIndex]);
    } else if (response.length > 0 && questionIndex >= response.length) {
      // Navigate to score page when the quiz ends
      navigate("/quiz/score");
    } else {
      fetchAndSetupQuiz(); // Fetch data if response is empty
    }
  }, [response, questionIndex, selectedNoOfQuestions, selectedLevel, token]);
  

  // Handle option selection
  const handleOptionSelect = (index) => {
    setSelectedAnswer(index);
  };

  // Check answer and move to next question
  const handleNextQuestion = () => {
    if (selectedAnswer === -1) return; // Ensure an option is selected

    if (selectedAnswer+1 === correctAnswer) {
      setScore((prevScore) => prevScore + 1); // Increment score if correct
    }

    setSelectedAnswer(-1); // Reset selected answer
    setQuestionIndex((prevIndex) => prevIndex + 1); // Move to next question
  };

  // Render loading spinner, error page, or quiz UI
  if (isError) {
    return <ErrorPage />;
  }

  if (isLoading) {
    return <CustomSpinner />;
  }

  return (
    <Box className="quizBoxMain" sx={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Question {questionIndex + 1} of {response.length}
      </Typography>
      <Question questionText={questionText} />
      <Box>
        {options.map((option, index) => (
          <Option
            key={index}
            optionText={option}
            onOptionSelected={() => handleOptionSelect(index)}
            style={{
              border: selectedAnswer === index ? "3px solid #39ff14" : undefined,
            }}
          />
        ))}
      </Box>
      <Button
        variant="contained"
        className="btn"
        onClick={handleNextQuestion}
        sx={{ marginTop: "20px" }}
      >
        {questionIndex === response.length - 1 ? "Finish Quiz" : "Next"}
      </Button>
    </Box>
  );
};

export default Quiz;
