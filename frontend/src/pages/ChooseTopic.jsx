import { Box, Divider, Typography } from "@mui/material";
import OptionsBox from "../components/OptionsBox";
import { useNavigate } from "react-router-dom";

const ChooseTopic = () => {
  const currentTopics = ["HTML", "CSS", "JavaScript"];

  const navigate = useNavigate();

  const onTopicSelected = (topic) => {
    navigate(`/start/${topic}`);
  };

  return (
    <Box pt={3} width={"100%"}>
      <Typography
        fontSize={"1.3rem"}
        sx={{
          textShadow: "-0.08em 0.03em 0.12em rgba(0, 0, 0, 0.9)",
          fontWeight: "lighter",
        }}
        pt={1}
      >
        CHOOSE TOPIC
      </Typography>
      <Divider sx={{ borderColor: "whitesmoke", my: 4 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between" }} gap={4}>
        {currentTopics.map((topic, index) => (
          <OptionsBox
            key={index}
            option={topic}
            onOptionChosen={onTopicSelected}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ChooseTopic;
