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
    <Box pt={9} width={'100%'} className="user-progress container">
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "#282828",
          color: "#eff1f6bf",
          width: "100%",
          maxWidth: "100%",
          margin: "auto",
          boxShadow: "none",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#ffa116",
                justifyContent: 'space-evenly'
              }}
            >
              <TableCell sx={{ color: "#eff1f6bf", fontWeight: "bold", px: 7 }}>Category</TableCell>
              <TableCell sx={{ color: "#eff1f6bf", fontWeight: "bold", px: 7 }}>Topic</TableCell>
              <TableCell sx={{ color: "#eff1f6bf", fontWeight: "bold", px: 7 }}>Total Questions</TableCell>
              <TableCell sx={{ color: "#eff1f6bf", fontWeight: "bold", px: 7 }}>Correct Answers</TableCell>
              <TableCell sx={{ color: "#eff1f6bf", fontWeight: "bold", px: 7 }}>Quiz Date</TableCell>
              <TableCell sx={{ color: "#eff1f6bf", fontWeight: "bold", px: 7 }}>Percentage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {progressData.map((row) => (
              <TableRow
                key={row.user_id}
                sx={{
                  "&:nth-of-type(odd)": { backgroundColor: "#282828" },
                  "&:nth-of-type(even)": { backgroundColor: "#15171b" },
                  "&:hover": { backgroundColor: "#1c1f25" },
                }}
              >
                <TableCell sx={{ color: "#eff1f6bf",  px: 7 }}>{row.category_name}</TableCell>
                <TableCell sx={{ color: "#eff1f6bf",  px: 7 }}>{row.topic_name}</TableCell>
                <TableCell sx={{ color: "#eff1f6bf",  px: 7 }}>{row.total_questions}</TableCell>
                <TableCell sx={{ color: "#eff1f6bf",  px: 7 }}>{row.correct_answers}</TableCell>
                <TableCell sx={{ color: "#eff1f6bf",  px: 7 }}>
                  {new Date(row.quiz_date).toLocaleDateString()}
                </TableCell>
                <TableCell sx={{ color: "#eff1f6bf" }}>{row.percentage}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserProgress;
