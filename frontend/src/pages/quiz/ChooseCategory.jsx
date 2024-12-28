import { Box, Divider, Typography } from "@mui/material";
import OptionsBox from "../../components/OptionsBox";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from 'react'
import ErrorPage from "../ErrorPage";
import CustomSpinner from "../../components/CustomSpinner";
import { AppContext } from "../../context/AppContext";
import { fetchCategories } from  "../../api/api"

const ChooseCategory = () => {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const { setSelectedCategoryId, setSelectedCategory, token } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategories(token);
        setCategories(data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, [token]);

  const onCategorySelected = (category) => {
    setSelectedCategoryId(category.category_id)
    setSelectedCategory(category.category_name)

    // Navigate to the nested route for the chosen category
    navigate(`${category.category_name}`);
  };

  if (isError) {
    return <ErrorPage />
  }
  else if (isLoading) {
    return <CustomSpinner />
  }
  else {
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
          {categories.map((category) => (
            <OptionsBox
              key={category.category_id}
              option={category.category_name}
              onOptionChosen={() => onCategorySelected(category)}
            />
          ))}
        </Box>
      </Box>
    );
  };
}

export default ChooseCategory;
