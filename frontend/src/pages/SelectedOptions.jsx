import { Box, Button, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";


const SelectedOptions = () => {

  const { topic, noOfQuestions, level } = useParams();
  const navigate = useNavigate();

  const onStartQuiz = () => {
    navigate(`/start/${topic}/${noOfQuestions}/${level}/selectedOptions/quiz`);
  }

    return(
        <>
        <Box className="selectedOptions">
            <Typography className="text-head" variant="h2" letterSpacing={2}>START QUIZ</Typography>
            
            <Box>
                <Typography py={2} className="text">Topic : {topic}</Typography>
                <Typography py={2} className="text">Questions : {noOfQuestions}</Typography>
                <Typography py={2} className="text">Level : {level}</Typography>
            </Box>

            <Button onClick={onStartQuiz} mt={2} className="btn" >START QUIZ</Button>
        </Box>
        </>
    )
}

export default SelectedOptions