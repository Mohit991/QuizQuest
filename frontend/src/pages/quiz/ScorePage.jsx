import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from 'react';
import { AppContext } from "../../context/AppContext";
import CustomSpinner from "../../components/CustomSpinner";
import { postUserProgress } from '../../api/api';

const ScorePage = () => {
    const { token, userId, score, selectedTopicId, selectedCategory, selectedTopic, selectedNoOfQuestions, selectedLevel } = useContext(AppContext);
    const navigate = useNavigate();
    const [isNavigating, setIsNavigating] = useState(false); // State to track navigation and spinner
    console.log(score, selectedTopicId);
    useEffect(() => {
        const correct_answers = score;
        const total_questions = selectedNoOfQuestions;
        const percentage = (correct_answers / total_questions) * 100;
        const quiz_date = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        const newProgress = {
            user_id: userId,
            topic_id: selectedTopicId,
            score,
            total_questions,
            correct_answers,
            quiz_date,
            percentage
        }
        const createUserProgress = async () => {
            try {
                await postUserProgress(newProgress, token);
            } catch (error) {
                console.error('Error creating user progress:', error);
            }
        };

        createUserProgress();
    }, [userId, selectedTopicId, score, selectedNoOfQuestions, token]);

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
