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
              sx={{ letterSpacing: '3px', textShadow: '0.08em 0.03em 0.12em rgba(255, 255, 255, 0.9)' }}
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
          <Typography variant="h3" component="h2" gutterBottom sx={{ mt: 6, mb: 3, color: '#ffa116' }}>
            Featured Quizzes
          </Typography>
          <Grid container spacing={4}>
            {featuredQuizzes.map((quiz, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ backgroundColor: '#505050', color: '#fff', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
                  <CardContent>
                    <Typography variant="h5" component="div" gutterBottom sx={{ color: '#ffa116' }}>
                      {quiz.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ color: '#ccc' }}>
                      {quiz.description}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: '#ffa116' }}>
                      Difficulty: {quiz.difficulty}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" sx={{ color: '#ffa116' }}>
                      Take Quiz
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ mt: 6, mb: 3, color: '#ffa116' }}>
            Why QuizHub?
          </Typography>
          <Grid container spacing={4}>
            {[
              { icon: School, title: 'Learn', text: 'Discover new topics and grow your expertise.' },
              { icon: EmojiEvents, title: 'Compete', text: 'Challenge friends and climb the leaderboard.' },
              { icon: TrendingUp, title: 'Improve', text: 'Track your progress and enhance your skills.' },
            ].map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper elevation={3} sx={{ p: 3, backgroundColor: '#505050', color: '#fff', height:"130px" }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <item.icon fontSize="large" sx={{ color: '#ffa116' }} />
                    <Typography variant="h6" component="h3" sx={{ mt: 2, color: '#ffa116' }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body1" align="center" sx={{ color: '#ccc' }}>
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
