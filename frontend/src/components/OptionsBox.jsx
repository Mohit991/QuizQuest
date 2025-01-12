import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const OptionsBox = ({ option, onOptionChosen, selected }) => {
  const location = useLocation();
  const isQuizConfigRoute = location.pathname.includes("/quiz/") && location.pathname.includes("/quiz-configuration");
  const boxHeight = isQuizConfigRoute ? 60 : 150;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          width: 275,
          height: boxHeight,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: selected ? "#ffa116" : "#242424",
          border: selected ? "3px solid #ffa116" : "3px solid #393939",
          borderRadius: "12px",
          transition: "all 0.3s ease",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: selected ? "#ffa116" : "#3a3a3a",
            border: "3px solid #ffa116",
            "& .MuiTypography-root": {
              color: selected ? "#393939" : "#ffa116",
            },
          },
        }}
        onClick={() => onOptionChosen(option)}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{
              color: selected ? "#393939" : "#ffa116",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: isQuizConfigRoute ? "1rem" : "1.5rem",
            }}
          >
            {option}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OptionsBox;

