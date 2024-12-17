import { Box, Divider, Typography } from "@mui/material";
import OptionsBox from "../../components/OptionsBox";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

const ChooseLevel = () => {
  const levels = ["Easy", "Medium", "Hard"];
  
  const navigate = useNavigate();

  const { setSelectedLevel } = useContext(AppContext);
  const onLevelSelected = (level) => {
    setSelectedLevel(level)
    navigate(`${level}`);
  }
  
  return (
    <Box className="chooseLevel" pt={3} width={"100%"}>
      <Typography
        fontSize={"1.3rem"}
        sx={{
          textShadow: "-0.08em 0.03em 0.12em rgba(0, 0, 0, 0.9)",
          fontWeight: "lighter",
        }}
        pt={1}
        className="mainHead"
      >
        CHOOSE LEVEL
      </Typography>
      <Divider sx={{ borderColor: "whitesmoke", my: 4 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }} gap={4}>
        {levels.map((level, index) => (
          <OptionsBox key={index} option={level} onOptionChosen={onLevelSelected}/>
        ))}
      </Box>
    </Box>
  );
};

export default ChooseLevel;
