import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Question from "../components/Question";
import Option from "../components/Option";
import { Box, Button } from "@mui/material";

const Quiz = () => {
  const { topic, noOfQuestions, level } = useParams();

  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(-1);
  const [selectedAnswer, setSelectedAnswer] = useState(-1);

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
    ];

    setQuestionText(response[0].question);
    setOptions([
      response[0].answers.answer_a,
      response[0].answers.answer_b,
      response[0].answers.answer_c,
      response[0].answers.answer_d,
    ]);

    if (response[0].answers.answer_e) {
      setOptions((prevOption) => [...prevOption, response[0].answers.answer_e]);
    }
    if (response[0].answers.answer_f) {
      setOptions((prevOption) => [...prevOption, response[0].answers.answer_f]);
    }

    let index = 0;
    for (let answer in response[0].correct_answers) {
      if (response[0].correct_answers[answer] === "true") {
        setCorrectAnswer(index);
      }
      index += 1;
    }

    console.log("useEffect Called");
  }, []);

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
  }

  console.log(level)

  return (
    <Box className="quizBoxMain">
      <Question questionText={questionText} />
      {options.map((option, index) =>
        selectedAnswer == index ? (
          <Option
            key={index}
            optionText={option}
            onOptionSelected={() => onOptionSelected(index)}
            style={{ fontSize:"20px" }}
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
