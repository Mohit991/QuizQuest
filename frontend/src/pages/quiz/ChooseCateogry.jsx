import { Box, Divider, Typography } from "@mui/material";
import OptionsBox from "../../components/OptionsBox";
import { useNavigate } from "react-router-dom";

const ChooseCateogry = () => {
  const currentCategories = ["Technology", "HP GK", "English"];
  const navigate = useNavigate();

  const onCategorySelected = (category) => {
    // Navigate to the nested route for the chosen category
    console.log(`category = `, category);
    navigate(`${category}`);
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
        CHOOSE CATEGORY
      </Typography>
      <Divider sx={{ borderColor: "whitesmoke", my: 4 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between" }} gap={4}>
        {currentCategories.map((category, index) => (
          <OptionsBox
            key={index}
            option={category}
            onOptionChosen={onCategorySelected}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ChooseCateogry;
