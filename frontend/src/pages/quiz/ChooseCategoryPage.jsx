import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Typography, Container, Grid } from "@mui/material";
import { motion } from "framer-motion";
import OptionsBox from "../../components/OptionsBox";
import ErrorPage from "../ErrorPage";
import CustomSpinner from "../../components/CustomSpinner";
import { AppContext } from "../../context/AppContext";
import { fetchCategories } from "../../services/apiService";

const ChooseCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
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
    setSelectedCategoryId(category.category_id);
    setSelectedCategory(category.category_name);
    navigate(`/quiz/${category.category_name}/quiz-configuration`);
  };

  if (isError) return <ErrorPage />;
  if (isLoading) return <CustomSpinner />;

  return (
    <Box sx={{ backgroundColor: "#393939", minHeight: "81vh", pt: 8 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "lighter",
              color: "#ffa116",
              textAlign: "center",
              mb: 4,
            }}
          >
            CHOOSE CATEGORY
          </Typography>
        </motion.div>

        <Grid container spacing={4} justifyContent="center">
          {categories.map((category, index) => (
            <Grid item key={category.category_id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <OptionsBox
                  option={category.category_name}
                  onOptionChosen={() => onCategorySelected(category)}
                />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ChooseCategoryPage;

