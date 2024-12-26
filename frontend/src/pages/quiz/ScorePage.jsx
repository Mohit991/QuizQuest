import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useContext, useState } from 'react';
import { AppContext } from "../../context/AppContext";
import CustomSpinner from "../../components/CustomSpinner";

const ScorePage = () => {
    const { score, selectedCategory, selectedTopic, selectedNoOfQuestions, selectedLevel } = useContext(AppContext);
    const navigate = useNavigate();

    const [isNavigating, setIsNavigating] = useState(false); // State to track navigation and spinner

    const onQuizTryAgain = () => {
        setIsNavigating(true); // Show spinner
        setTimeout(() => {
            navigate(`/quiz/${selectedCategory}/${selectedTopic}/${selectedNoOfQuestions}/${selectedLevel}`);
        }, 1000); // Add delay before navigating
    };

    return (
        <>
            {isNavigating ? (
                <CustomSpinner /> // Show spinner while navigating
            ) : (
                <>
                    <h1>Your Score: {score}</h1>
                    <Button variant="contained" onClick={onQuizTryAgain}>
                        Try Again
                    </Button>
                </>
            )}
        </>
    );
};

export default ScorePage;
