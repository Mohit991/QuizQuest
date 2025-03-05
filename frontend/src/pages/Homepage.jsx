import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Container, Typography, Grid, Paper, Divider } from '@mui/material';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { School, EmojiEvents, TrendingUp, Quiz } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { getUserProgress } from '../services/apiService';

const HomePage = () => {
  const [progressData, setProgressData] = useState([]);
  const [quizCount, setQuizCount] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const { userName, token, userId } = useContext(AppContext);
  const navigate = useNavigate();

  const quizCountMotion = useMotionValue(0);
  const highestScoreMotion = useMotionValue(0);
  const quizCountDisplay = useTransform(quizCountMotion, Math.round);
  const highestScoreDisplay = useTransform(highestScoreMotion, Math.round);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserProgress(userId, token);
        setProgressData(data);
        // console.log("user progress data in homepage:: ", data);
      } catch (error) {
        console.error('Failed to fetch user progress:', error);
      }
    };

    fetchData();
  }, [userId, token]);

  useEffect(() => {
    setQuizCount(progressData.length);

    const maxScore = progressData.reduce((max, quiz) =>
      quiz.correct_answers > max ? quiz.correct_answers : max, 0
    );
    setHighestScore(maxScore);

    animate(quizCountMotion, progressData.length, { duration: 1 });
    animate(highestScoreMotion, maxScore, { duration: 1 });
  }, [progressData]);

  const startSelection = () => {
    navigate('/quiz');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Container maxWidth="lg" sx={{ backgroundColor: '#393939', color: '#fff', borderRadius: '10px', py: 4, px: 2 }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <motion.div variants={itemVariants}>
            <Typography variant="h1" component="h1" gutterBottom sx={{ color: '#ffa116' }}>
              Welcome back, <span style={{ color: "#fff" }}>{userName}!</span>
            </Typography>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Typography variant="h5" component="h2" gutterBottom>
              Ready to challenge yourself today?
            </Typography>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Button
              variant="contained"
              size="large"
              onClick={startSelection}
              startIcon={<Quiz />}
              sx={{
                mt: 2,
                color: 'black',
                backgroundColor: '#ffa116',
                '&:hover': {
                  backgroundColor: '#ffc44a',
                  boxShadow: 'none',
                },
              }}
            >
              Start New Quiz
            </Button>
          </motion.div>

          <Divider sx={{ my: 4, borderColor: '#ffa116' }} />

          <Box pt={3}>
            <Typography
              fontWeight={600}
              fontSize="1.5rem"
              sx={{ letterSpacing: '3px' }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Quizzes Attempted</Typography>
                <motion.span>{quizCountDisplay}</motion.span>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Highest Score</Typography>
                <motion.span>{highestScoreDisplay}</motion.span>
              </Box>
            </Typography>
          </Box>
        </Box>

        <motion.div variants={itemVariants}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ mt: 6, mb: 3, color: '#ffa116' }}>
            Why QuizQuest?
          </Typography>
          <Grid container spacing={4} direction="column">
            {[{
              icon: School, title: 'Learn', text: 'Discover new topics and grow your expertise. Access resources, tips, and challenges designed to make learning engaging and effective.',
            }, {
              icon: EmojiEvents, title: 'Compete', text: 'Challenge friends, participate in tournaments, and see your name on the leaderboard. Competition fuels growth!',
            }, {
              icon: TrendingUp, title: 'Improve', text: 'Track your progress with detailed analytics. Identify areas of improvement and strive for mastery.',
            }].map((item, index) => (
              <Grid item xs={12} key={index}>
                <Paper elevation={3} sx={{ p: 4, backgroundColor: '#505050', color: '#fff' }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <item.icon fontSize="large" sx={{ color: '#ffa116', fontSize: '3rem' }} />
                    <Typography variant="h5" component="h3" sx={{ mt: 2, color: '#ffa116' }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body1" align="center" sx={{ color: '#ccc', mt: 1 }}>
                      {item.text}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default HomePage;
