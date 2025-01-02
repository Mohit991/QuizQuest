import * as React from "react";
import { useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

export default function OptionsBox({ option, onOptionChosen, selected }) {
  const location = useLocation();

  // Determine height based on the path
  const boxHeight =
    location.pathname === "/quiz/:category/quiz-configuration" ? 60 : 150;

  return (
    <Box className="option-box">
      <Card
        className="card"
        sx={{
          minWidth: 275,
          height: boxHeight, 
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: selected ? "#39ff14" : "#242424",
          border: selected ? "2px solid #39ff14" : "2px solid transparent",
          "&:hover": {
            backgroundColor: "#3a3a3a",
            "& .text": {
              color: selected ? "#242424" : "#39ff14",
            },
          },
        }}
        onClick={() => onOptionChosen(option)}
      >
        <CardContent>
          <Typography
            className="text"
            gutterBottom
            sx={{
              color: selected ? "#242424" : "#3fc028",
              fontSize: 30,
            }}
          >
            {option}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
