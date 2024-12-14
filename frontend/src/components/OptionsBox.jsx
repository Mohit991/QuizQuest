import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

export default function OptionsBox({ option, onOptionChosen }) {
  return (
    <Box className="option-box">
      <Card
        className="card"
        sx={{
          minWidth: 275,
          minHeight: 150,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#242424",
          "&:hover": {
            "& .text": {
              color: "#39ff14",
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
              color: "#3fc028",
              fontSize: 30,
              fontFamily: "monospace",
            }}
          >
            {option}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
