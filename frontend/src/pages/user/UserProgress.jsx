import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
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

  // Mock data
  const mockProgressData = [
    {
      user_id: 1,
      topic_id: 101,
      score: 85,
      total_questions: 100,
      correct_answers: 85,
      quiz_date: "2023-12-30T12:34:56Z",
      percentage: 85.0,
    },
    {
      user_id: 1,
      topic_id: 102,
      score: 90,
      total_questions: 100,
      correct_answers: 90,
      quiz_date: "2023-12-29T14:30:00Z",
      percentage: 90.0,
    },
    {
      user_id: 1,
      topic_id: 103,
      score: 75,
      total_questions: 100,
      correct_answers: 75,
      quiz_date: "2023-12-28T10:15:00Z",
      percentage: 75.0,
    },
  ];

  useEffect(() => {
    // Simulate data fetching
    const fetchData = () => {
      setTimeout(() => {
        setProgressData(mockProgressData);
        setLoading(false);
      }, 1000); // Simulate network delay
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#050801",
        }}
      >
        <Typography variant="h6" sx={{ color: "white" }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "transparent",
        color: "white",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          marginBottom: "20px",
          textAlign: "center",
          color: "#004c70",
          fontWeight: "900"
        }}
      >
        User Progress
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "transparent",
          color: "white",
          boxShadow: "0px 2px 8px rgba(255, 255, 255, 0.1)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {["User ID", "Topic ID", "Score", "Total Questions", "Correct Answers", "Quiz Date", "Percentage"].map(
                (header) => (
                  <TableCell
                    key={header}
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      borderBottom: "1px solid white",
                    }}
                  >
                    {header}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {progressData.map((row, index) => (
              <TableRow
                key={index}
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
    </Box>
  );
};

export default UserProgress;
