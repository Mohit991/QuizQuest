import React, { useContext, useEffect, useState } from "react"
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Box,
} from "@mui/material"
import { Delete, Edit, Add } from "@mui/icons-material"
import { fetchCategories } from "../../services/apiService"
import { AppContext } from "../../context/AppContext"

const ManageCategories = () => {

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);
  const { setSelectedCategoryId, setSelectedCategory, token } = useContext(AppContext);


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

  console.log("categories data : ", categories);

  return (
    <Paper elevation={3} sx={{ p: 4, backgroundColor: "#505050", color: "#fff" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h6" component="h2" sx={{ color: "#ffa116" }}>
          Categories
        </Typography>
        <Button
          startIcon={<Add />}
          variant="contained"
          sx={{
            bgcolor: "#ffa116",
            color: "black",
            "&:hover": {
              bgcolor: "#ffc44a",
            },
          }}
        >
          Add Category
        </Button>
      </Box>
      <List>
        {categories.map((category) => (
          <ListItem key={category.category_id} sx={{ borderBottom: "1px solid #ffa116" }}>
            <ListItemText
              primary={category.category_name}
              // secondary={`${category.topicCount} topics`}
              secondaryTypographyProps={{ sx: { color: "#ccc" } }}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" sx={{ color: "#ffa116", mr: 1 }}>
                <Edit />
              </IconButton>
              <IconButton edge="end" aria-label="delete" sx={{ color: "#ffa116" }}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default ManageCategories

