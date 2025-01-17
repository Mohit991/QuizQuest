import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const LeaderboardsContent = () => {
  return (
    <Box sx={{ mt: 4, width: '100%', maxWidth: 600, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 3, backgroundColor: '#242424', color: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <EmojiEventsIcon sx={{ fontSize: 40, color: '#ffa116', mr: 2 }} />
          <Typography variant="h5" component="h2" sx={{ color: '#ffa116' }}>
            Welcome to the Leaderboards!
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Here you can view the top performers across various categories. To get started:
        </Typography>
        <ol style={{ paddingLeft: '20px' }}>
          <li>Select a category from the dropdown menu above</li>
          <li>View the leaderboard for your chosen category</li>
          <li>See how you stack up against other participants</li>
        </ol>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Challenge yourself to climb the ranks and become a top performer!
        </Typography>
      </Paper>
    </Box>
  );
};

export default LeaderboardsContent;