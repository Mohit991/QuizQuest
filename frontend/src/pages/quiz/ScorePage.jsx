import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Paper, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { AppContext } from "../../context/AppContext";
import CustomSpinner from "../../components/CustomSpinner";
import { postUserProgress } from '../../services/apiService';

const ScorePage = () => {
    const { token, userId, score, selectedTopicId, selectedCategory, selectedTopic, selectedNoOfQuestions, selectedLevel } = useContext(AppContext);
    const navigate = useNavigate();
    const [isNavigating, setIsNavigating] = useState(false);
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        const correct_answers = score;
        const total_questions = selectedNoOfQuestions;
        const calculatedPercentage = (correct_answers / total_questions) * 100;
        setPercentage(calculatedPercentage);
        const quiz_date = new Date().toISOString().split('T')[0];
        const newProgress = {
            user_id: userId,
            topic_id: selectedTopicId,
            score,
            total_questions,
            correct_answers,
            quiz_date,
            percentage: calculatedPercentage
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
        setIsNavigating(true);
        setTimeout(() => {
            navigate(`/quiz/${selectedCategory}/quiz-configuration`);
        }, 1000);
    };

    if (isNavigating) {
        return <CustomSpinner />;
    }

    return (
        <Box sx={{
            minHeight: "86vh",
            backgroundColor: "#393939",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pt: 4
        }}>
            <Paper elevation={3} sx={{
                maxWidth: "600px",
                width: "100%",
                p: 4,
                backgroundColor: "#242424",
                color: "#ffa116",
                borderRadius: "16px",
                textAlign: "center"
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                        Quiz Results
                    </Typography>
                    <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3 }}>
                        <CircularProgress
                            variant="determinate"
                            value={percentage}
                            size={120}
                            thickness={5}
                            sx={{
                                color: '#ffa116',
                                '& .MuiCircularProgress-circle': {
                                    strokeLinecap: 'round',
                                },
                            }}
                        />
                        <Box
                            sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography variant="h5" component="div" color="#ffa116">
                                {`${Math.round(percentage)}%`}
                            </Typography>
                        </Box>
                    </Box>
                    <Typography variant="h5" gutterBottom>
                        Your Score: {score} / {selectedNoOfQuestions}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Topic: {selectedTopic}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Difficulty: {selectedLevel}
                    </Typography>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Button 
                            variant="contained" 
                            onClick={onQuizTryAgain}
                            sx={{
                                mt: 2,
                                backgroundColor: "#ffa116",
                                color: "#242424",
                                '&:hover': {
                                    backgroundColor: "#ff8c00",
                                },
                            }}
                        >
                            Try Again
                        </Button>
                    </motion.div>
                </motion.div>
            </Paper>
        </Box>
    );
};

export default ScorePage;

