import { Box, Divider, Typography } from "@mui/material";
import OptionsBox from "../../components/OptionsBox";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

const ChooseNoOfQuestions = () => {
  const quizQuestions = [10, 25, 50];
  const navigate = useNavigate();

  const { setSelectedNoOfQuestions } = useContext(AppContext);

  const onNoOfQuestionsSelected = (noOfQuestions) => {
    setSelectedNoOfQuestions(noOfQuestions)
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
        {quizQuestions.map((noOfQuestions, index) => (
          <OptionsBox
            key={index}
            option={noOfQuestions}
            onOptionChosen={onNoOfQuestionsSelected}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ChooseNoOfQuestions;
