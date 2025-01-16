import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from "../../context/AppContext";
import { getUserProgress } from '../../services/apiService';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { motion } from 'framer-motion';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const UserProgress = () => {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId, token } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserProgress(userId, token);
        setProgressData(data);
        console.log("user progress data :: ",data);
      } catch (error) {
        console.error('Failed to fetch user progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, token]);

  const calculateAveragePercentage = () => {
    if (progressData.length === 0) return 0;
    const sum = progressData.reduce((acc, curr) => acc + curr.percentage, 0);
    return (sum / progressData.length).toFixed(2);
  };

  const getPerformanceTrend = () => {
    if (progressData.length < 2) return 'neutral';
    const sortedData = [...progressData].sort((a, b) => new Date(b.quiz_date) - new Date(a.quiz_date));
    const recentPerformances = sortedData.slice(0, 3);
    const trend = recentPerformances[0].percentage - recentPerformances[recentPerformances.length - 1].percentage;
    return trend > 0 ? 'improving' : trend < 0 ? 'declining' : 'neutral';
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: "#393939" }}>
        <CircularProgress sx={{ color: "#ffa116" }} />
      </Box>
    );
  }

  return (
    <Box sx={{
      minHeight: "86vh",
      backgroundColor: "#393939",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      pt: 6,
      px: 2,
      maxWidth: "1200px",
      mx:'auto'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: "#ffa116", mb: 3, textAlign: 'center' }}>
          Your Learning Progress
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Box sx={{ width: '100%', mb: 3 }}>
          <Typography variant="h6" sx={{ color: "#ffa116" }}>
            Average Score: {calculateAveragePercentage()}%
          </Typography>
          <Typography variant="h6" sx={{ color: "#ffa116", display: 'flex', alignItems: 'center' }}>
            Performance Trend: 
            {getPerformanceTrend() === 'improving' && (
              <Tooltip title="Your performance is improving">
                <TrendingUpIcon sx={{ color: 'green', ml: 1 }} />
              </Tooltip>
            )}
            {getPerformanceTrend() === 'declining' && (
              <Tooltip title="Your performance is declining">
                <TrendingDownIcon sx={{ color: 'red', ml: 1 }} />
              </Tooltip>
            )}
            {getPerformanceTrend() === 'neutral' && (
              <Tooltip title="Your performance is stable">
                <span style={{ color: 'yellow', marginLeft: '8px' }}>•</span>
              </Tooltip>
            )}
          </Typography>
        </Box>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{ width: '100%' }}
      >
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "#242424",
            color: "#eff1f6bf",
            width: "100%",
            maxWidth: "100%",
            margin: "auto",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#ffa116",
                }}
              >
                <TableCell sx={{ color: "#242424", fontWeight: "bold", textAlign: 'center' }}>Category</TableCell>
                <TableCell sx={{ color: "#242424", fontWeight: "bold", textAlign: 'center' }}>Topic</TableCell>
                <TableCell sx={{ color: "#242424", fontWeight: "bold", textAlign: 'center' }}>Total Questions</TableCell>
                <TableCell sx={{ color: "#242424", fontWeight: "bold", textAlign: 'center' }}>Correct Answers</TableCell>
                <TableCell sx={{ color: "#242424", fontWeight: "bold", textAlign: 'center' }}>Quiz Date</TableCell>
                <TableCell sx={{ color: "#242424", fontWeight: "bold", textAlign: 'center' }}>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {progressData.map((row, index) => (
                <motion.tr
                  key={`${row.user_id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <TableCell sx={{ color: "#eff1f6bf", textAlign: 'center' }}>{row.category_name}</TableCell>
                  <TableCell sx={{ color: "#eff1f6bf", textAlign: 'center' }}>{row.topic_name}</TableCell>
                  <TableCell sx={{ color: "#eff1f6bf", textAlign: 'center' }}>{row.total_questions}</TableCell>
                  <TableCell sx={{ color: "#eff1f6bf", textAlign: 'center' }}>{row.correct_answers}</TableCell>
                  <TableCell sx={{ color: "#eff1f6bf", textAlign: 'center' }}>
                    {new Date(row.quiz_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={{ color: "#eff1f6bf", textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CircularProgress
                        variant="determinate"
                        value={row.percentage}
                        size={40}
                        thickness={4}
                        sx={{
                          color: row.percentage >= 70 ? 'green' : row.percentage >= 40 ? 'orange' : 'red',
                          mr: 1
                        }}
                      />
                      <Typography variant="body2">{row.percentage}%</Typography>
                    </Box>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </motion.div>
    </Box>
  );
};

export default UserProgress;

