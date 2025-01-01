import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from "../../context/AppContext";
import { getUserProgress } from '../../api/api';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const UserProgress = () => {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId, token } = useContext(AppContext);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserProgress(userId, token);
        setProgressData(data);
        console.log(data);
      } catch (error) {
        console.error('Failed to fetch user progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell>Topic ID</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Total Questions</TableCell>
            <TableCell>Correct Answers</TableCell>
            <TableCell>Quiz Date</TableCell>
            <TableCell>Percentage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {progressData.map((row) => (
            <TableRow
              key={row.user_id}
              sx={{
                "&:nth-of-type(odd)": { backgroundColor: "#0a0c10" },
                "&:nth-of-type(even)": { backgroundColor: "#15171b" },
                "&:hover": { backgroundColor: "#1c1f25" },
              }}
            >
              <TableCell sx={{ color: "white" }}>{row.user_id}</TableCell>
              <TableCell sx={{ color: "white" }}>{row.topic_id}</TableCell>
              <TableCell sx={{ color: "white" }}>{row.score}</TableCell>
              <TableCell sx={{ color: "white" }}>{row.total_questions}</TableCell>
              <TableCell sx={{ color: "white" }}>{row.correct_answers}</TableCell>
              <TableCell sx={{ color: "white" }}>
                {new Date(row.quiz_date).toLocaleDateString()}
              </TableCell>
              <TableCell sx={{ color: "white" }}>{row.percentage}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserProgress;