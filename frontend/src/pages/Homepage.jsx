import React, { useContext } from 'react';
import { Box, Button, Container, Typography, Grid, Paper, Card, CardContent, CardActions, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { School, EmojiEvents, TrendingUp, Quiz } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const HomePage = () => {
  const { userName, clearContext } = useContext(AppContext);
  const navigate = useNavigate();

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

  const featuredQuizzes = [
    { title: 'Science Spectacular', description: 'Test your knowledge of the natural world', difficulty: 'Medium' },
    { title: 'History Heroes', description: 'Journey through time with this historical quiz', difficulty: 'Hard' },
    { title: 'Pop Culture Mania', description: 'Stay up-to-date with the latest trends', difficulty: 'Easy' },
  ];

  return (
    <Container maxWidth="lg">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <motion.div variants={itemVariants}>
            <Typography variant="h1" component="h1" gutterBottom>
              Welcome back, {userName}!
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
              color="primary"
              size="large"
              onClick={startSelection}
              startIcon={<Quiz />}
              sx={{ mt: 2 }}
            >
              Start New Quiz
            </Button>
          </motion.div>

          <Divider sx={{ my: 4 }} />

          <Box pt={3}>
            <Typography
              fontWeight={600}
              fontSize="1.5rem"
              sx={{ letterSpacing: '3px', textShadow: '0.08em 0.03em 0.12em rgba(0, 0, 0, 0.9)' }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Quizzes Attempted</Typography>
                <Typography>10</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Highest Score</Typography>
                <Typography>19</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Current Rank</Typography>
                <Typography>7</Typography>
              </Box>
            </Typography>
          </Box>
        </Box>

        <motion.div variants={itemVariants}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ mt: 6, mb: 3 }}>
            Featured Quizzes
          </Typography>
          <Grid container spacing={4}>
            {featuredQuizzes.map((quiz, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                      {quiz.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {quiz.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Difficulty: {quiz.difficulty}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Take Quiz
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ mt: 6, mb: 3 }}>
            Why QuizHub?
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                  <School fontSize="large" color="primary" />
                  <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 1 }}>
                    Learn
                  </Typography>
                  <Typography variant="body1" align="center">
                    Expand your knowledge with our diverse range of quiz topics. From science to pop culture, we've got you covered.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                  <EmojiEvents fontSize="large" color="primary" />
                  <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 1 }}>
                    Compete
                  </Typography>
                  <Typography variant="body1" align="center">
                    Challenge friends and climb the leaderboard to prove your expertise. Earn badges and unlock achievements as you go.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                  <TrendingUp fontSize="large" color="primary" />
                  <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 1 }}>
                    Improve
                  </Typography>
                  <Typography variant="body1" align="center">
                    Track your progress and watch your scores improve over time. Personalized recommendations help you focus on areas for growth.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default HomePage;