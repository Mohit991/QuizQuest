import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Question from "../components/Question";
import Option from "../components/Option";
import { Box, Button } from "@mui/material";
import {convertDifficulty} from '../utils/conversions'

const Quiz = () => {
  const { topic, noOfQuestions, level } = useParams();

  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(-1);
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    const apiKey = 'TRoLR2UY81kGKq25N7VNwcZ7UaJWNJrKupFlqXrF'; // Replace with your actual API key
    const url = 'https://quizapi.io/api/v1/questions';
    console.log(convertDifficulty(level));
    
    fetch(`${url}?apiKey=${apiKey}&limit=${noOfQuestions}&category=${topic}&difficulty=${convertDifficulty(level)}`, {
      method: 'GET',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        
        // setQuestions(data);
        // setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        
        // setError(error);
        // setLoading(false);
      });
  }, []);
  useEffect(() => {
    const response = [
      {
        id: 1,
        question: "How to delete a directory in Linux?",
        description: "delete folder",
        answers: {
          answer_a: "ls",
          answer_b: "delete",
          answer_c: "remove",
          answer_d: "rmdir",
          answer_e: "cd",
          answer_f: "xf",
        },
        multiple_correct_answers: "false",
        correct_answers: {
          answer_a_correct: "false", 
          answer_b_correct: "false",
          answer_c_correct: "false",
          answer_d_correct: "true",
          answer_e_correct: "false",
          answer_f_correct: "false",
        },
        explanation: "rmdir deletes an empty directory",
        tip: null,
        tags: [],
        category: "linux",
        difficulty: "Easy",
      },
      {
        id: 2,
        question: "How to create a directory in Linux?",
        description: "create folder",
        answers: {
          answer_a: "ls",
          answer_b: "delete",
          answer_c: "remove",
          answer_d: "mkdir",
          answer_e: "cd",
          answer_f: "xf",
        },
        multiple_correct_answers: "false",
        correct_answers: {
          answer_a_correct: "false",
          answer_b_correct: "false",
          answer_c_correct: "false",
          answer_d_correct: "true",
          answer_e_correct: "false",
          answer_f_correct: "false",
        },
        explanation: "rmdir deletes an empty directory",
        tip: null,
        tags: [],
        category: "linux",
        difficulty: "Easy",
      }
    ];

    setQuestionText(response[questionIndex].question);
    setOptions([
      response[questionIndex].answers.answer_a,
      response[questionIndex].answers.answer_b,
      response[questionIndex].answers.answer_c,
      response[questionIndex].answers.answer_d,
    ]);

    if (response[questionIndex].answers.answer_e) {
      setOptions((prevOption) => [...prevOption, response[questionIndex].answers.answer_e]);
    }
    if (response[questionIndex].answers.answer_f) {
      setOptions((prevOption) => [...prevOption, response[questionIndex].answers.answer_f]);
    }

    let index = 0;
    for (let answer in response[questionIndex].correct_answers) {
      if (response[questionIndex].correct_answers[answer] === "true") {
        setCorrectAnswer(index);
      }
      index += 1;
    }

    console.log("useEffect Called");
  }, [questionIndex]);

  const onOptionSelected = (index) => {
    setSelectedAnswer(index);
  };

  const checkAnswerAndNext = () => {
    if(selectedAnswer == -1){
      return 
    }
    if(selectedAnswer == correctAnswer){
      console.log('Correct');
    }
    else{
      console.log('Incorrect');
    }
    setQuestionIndex(questionIndex+1)
  }

  return (
    <Box className="quizBoxMain">
      <Question questionText={questionText} />
      {options.map((option, index) =>
        selectedAnswer == index ? (
          <Option
            key={index}
            optionText={option}
            onOptionSelected={() => onOptionSelected(index)}
            style={{ backgroundColor:"red" }}
          />
        ) : (
          <Option
            key={index}
            optionText={option}
            onOptionSelected={() => onOptionSelected(index)}
          />
        )
      )}
      <Button
      className="btn"
        onClick={checkAnswerAndNext}
      >
        Next
      </Button>
    </Box>
  );
};

export default Quiz;
