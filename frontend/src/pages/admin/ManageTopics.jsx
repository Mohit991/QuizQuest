import React, { useContext, useEffect } from "react"
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
import { useState } from "react"
import { AppContext } from "../../context/AppContext"
import { fetchCategories, fetchTopicsOfCategory } from "../../services/apiService"
const ManageTopics = () => {
  
  const { token } = useContext(AppContext);
  const [topicsOfCategory, setTopicsOfCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);


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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTopicsOfCategory(token,selectedCategory);
        setTopicsOfCategory(data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, [token]);

  console.log("topics of category : : ", topicsOfCategory)

  return (
    <Paper elevation={3} sx={{ p: 4, backgroundColor: "#505050", color: "#fff" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h6" component="h2" sx={{ color: "#ffa116" }}>
          Topics
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
          Add Topic
        </Button>
      </Box>
      <List>
        {topicsOfCategory.map((topic) => (
          <ListItem key={topic.topic_id} sx={{ borderBottom: "1px solid #ffa116" }}>
            <ListItemText
              primary={topic.topic_name}
              secondary={`${topic.questionCount} questions`}
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

export default ManageTopics

