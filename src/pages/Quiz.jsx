import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Question from "../components/Question";
import Option from "../components/Option";
import { Box, Button } from "@mui/material";
import { convertDifficulty } from "../utils/conversions";
import CustomSpinner from "../components/CustomSpinner";
import ErrorPage from "./ErrorPage";

const Quiz = () => {
  const { topic, noOfQuestions, level } = useParams();

  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(-1);
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [response, setResponse] = useState([]);

  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const [score, setScore] = useState(0)

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "TRoLR2UY81kGKq25N7VNwcZ7UaJWNJrKupFlqXrF";
        const url = "https://quizapi.io/api/v1/questions";
        const res = await fetch(
          `${url}?apiKey=${apiKey}&limit=5&category=Linux&difficulty=${convertDifficulty(level)}`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setResponse(data);
        setIsLoading(false)
      } catch (error) {
        setIsError(true)
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [topic, noOfQuestions, level]);

  useEffect(() => {
    if (response.length > 0 && questionIndex < response.length) {
      const currentQuestion = response[questionIndex];
      setQuestionText(currentQuestion.question);
  
      // Set options
      const answerOptions = [
        currentQuestion.answers.answer_a,
        currentQuestion.answers.answer_b,
        currentQuestion.answers.answer_c,
        currentQuestion.answers.answer_d,
      ];
  
      if (currentQuestion.answers.answer_e) {
        answerOptions.push(currentQuestion.answers.answer_e);
      }
      if (currentQuestion.answers.answer_f) {
        answerOptions.push(currentQuestion.answers.answer_f);
      }
  
      setOptions(answerOptions);
  
      // Determine the correct answer index
      let correctIndex = -1;
      let index = 0;
      for (let answer in currentQuestion.correct_answers) {
        if (currentQuestion.correct_answers[answer] === "true") {
          correctIndex = index;
          break;
        }
        index++;
      }
      setCorrectAnswer(correctIndex);
    } else if (response.length > 0 && questionIndex >= response.length) {
      navigate('/start/quiz/score', { state: { score } }); // Navigate with score data
    }
  }, [questionIndex, response, navigate, score]);
  

  const onOptionSelected = (index) => {
    setSelectedAnswer(index);
  };

  const checkAnswerAndNext = () => {
    if (selectedAnswer === -1) return;

    if (selectedAnswer === correctAnswer) {
      setScore(score => score+1)
      console.log("Correct");
    } else {
      console.log("Incorrect");
    }

    setSelectedAnswer(-1); // Reset the selected answer
    setQuestionIndex((prevIndex) => prevIndex + 1); // Move to the next question
  };


  if(isError) {
    return <ErrorPage />
  }
  else if(isLoading) {
    return <CustomSpinner />
  }
  else {
    return <Box className="quizBoxMain">
      <Question questionText={questionText} />
      {options.map((option, index) => (
        <Option
          key={index}
          optionText={option}
          onOptionSelected={() => onOptionSelected(index)}
          style={{
            backgroundColor: selectedAnswer === index ? "red" : undefined,
          }}
        />
      ))}
      <Button className="btn" onClick={checkAnswerAndNext}>
        Next
      </Button>
    </Box>
  }
};

export default Quiz;
