import { Box, Divider, Typography } from "@mui/material";
import OptionsBox from "../../components/OptionsBox";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";
import { fetchQuestionCounts } from "../../api/api"

const ChooseNoOfQuestions = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const navigate = useNavigate();
  const { setSelectedNoOfQuestions, token } = useContext(AppContext);

  useEffect(() => {
    const getQuestionCounts = async () => {
      const data = await fetchQuestionCounts(token);
      console.log(data);
      setQuizQuestions(data);
    };
    getQuestionCounts();
  }, [token]);

  const onNoOfQuestionsSelected = (noOfQuestions) => {
    setSelectedNoOfQuestions(noOfQuestions);
    // Navigate to the relative path for the next step
    navigate(`${noOfQuestions}`);
  };

  return (
    <Box className="content" pt={3} width={"100%"}>
      <Typography
        fontSize={"1.3rem"}
        sx={{
          textShadow: "-0.08em 0.03em 0.12em rgba(0, 0, 0, 0.9)",
          fontWeight: "lighter",
        }}
        pt={1}
      >
        CHOOSE NUMBER OF QUESTIONS
      </Typography>
      <Divider sx={{ borderColor: "whitesmoke", my: 4 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }} gap={4}>
        {quizQuestions.map((questionCounts, index) => (
          <OptionsBox
            key={index}
            option={questionCounts.count}
            onOptionChosen={() => onNoOfQuestionsSelected(questionCounts.count)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ChooseNoOfQuestions;
