import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Container, Paper, Grid } from "@mui/material";
import { motion } from "framer-motion";
import OptionsBox from "../../components/OptionsBox";
import { AppContext } from "../../context/AppContext";
import { fetchLevels, fetchQuestionCounts, fetchTopicsOfCategory } from "../../services/apiService";
import ErrorPage from "../ErrorPage";
import CustomSpinner from "../../components/CustomSpinner";

const SelectQuizConfigPage = () => {
  const [levels, setLevels] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedNoOfQuestions, setSelectedNoOfQuestions] = useState(null);

  const {
    selectedCategoryId,
    selectedCategory,
    setSelectedLevel: setGlobalLevel,
    setSelectedNoOfQuestions: setGlobalNoOfQuestions,
    setSelectedTopic: setGlobalTopic,
    setSelectedTopicId: setGlobalTopicId,
    token,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const levelsData = await fetchLevels(token);
      const questionsData = await fetchQuestionCounts(token);
      const topicsData = await fetchTopicsOfCategory(token, selectedCategoryId);

      setLevels(levelsData);
      setQuizQuestions(questionsData);
      setTopics(topicsData);
    } catch (error) {
      setIsError(true);
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, selectedCategoryId]);

  const onLevelSelected = (level) => {
    setSelectedLevel(level.name);
    setGlobalLevel(level.name);
  };

  const onNoOfQuestionsSelected = (noOfQuestions) => {
    setSelectedNoOfQuestions(noOfQuestions.count);
    setGlobalNoOfQuestions(noOfQuestions.count);
  };

  const onTopicSelected = (topic) => {
    setSelectedTopic(topic.topic_name);
    setSelectedTopicId(topic.topic_id);
    setGlobalTopic(topic.topic_name);
    setGlobalTopicId(topic.topic_id);
  };

  const handleProceed = () => {
    if (selectedTopic && selectedLevel && selectedNoOfQuestions) {
      navigate(`/quiz/:category/quiz-configuration/selected-options`);
    }
  };

  const isProceedDisabled = !(selectedTopic && selectedLevel && selectedNoOfQuestions);

  if (isError) {
    return <ErrorPage />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <Box
      sx={{
        minHeight: "81vh",
        backgroundColor: "#393939",
        pt: 8,
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              backgroundColor: "#242424",
              color: "#ffa116",
              borderRadius: "16px",
            }}
          >
            <motion.div variants={itemVariants}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "lighter",
                  textAlign: "center",
                  mb: 4,
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                }}
              >
                CONFIGURE YOUR QUIZ
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Selected Category: {selectedCategory}
              </Typography>
            </motion.div>

            <Grid container spacing={4}>
              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  {/* <Typography variant="h6" fontWeight="bold" mb={2}>
                    Choose Topic:
                  </Typography> */}
                  {isLoading ? (
                    <CustomSpinner />
                  ) : (
                    <Grid container spacing={2}>
                      {topics.map((topic) => (
                        <Grid item xs={12} sm={6} md={4} key={topic.topic_id}>
                          <OptionsBox
                            option={topic.topic_name}
                            selected={selectedTopic === topic.topic_name}
                            onOptionChosen={() => onTopicSelected(topic)}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </motion.div>
              </Grid>

              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  {/* <Typography variant="h6" fontWeight="bold" mb={2}>
                    Choose Level:
                  </Typography> */}
                  {isLoading ? (
                    <CustomSpinner />
                  ) : (
                    <Grid container spacing={2}>
                      {levels.map((level, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <OptionsBox
                            option={level.name}
                            selected={selectedLevel === level.name}
                            onOptionChosen={() => onLevelSelected(level)}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </motion.div>
              </Grid>

              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  {/* <Typography variant="h6" fontWeight="bold" mb={2}>
                    Choose Number of Questions:
                  </Typography> */}
                  {isLoading ? (
                    <CustomSpinner />
                  ) : (
                    <Grid container spacing={2}>
                      {quizQuestions.map((questionCounts, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <OptionsBox
                            option={questionCounts.count}
                            selected={selectedNoOfQuestions === questionCounts.count}
                            onOptionChosen={() => onNoOfQuestionsSelected(questionCounts)}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </motion.div>
              </Grid>
            </Grid>

            <motion.div variants={itemVariants}>
              <Box mt={4}>
                <Button
                  variant="contained"
                  onClick={handleProceed}
                  disabled={isProceedDisabled}
                  sx={{
                    width: "100%",
                    backgroundColor: "#ffa116",
                    color: "#242424",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#ff8c00",
                    },
                    "&:disabled": {
                      backgroundColor: "#6b6b6b",
                      color: "#a0a0a0",
                    },
                  }}
                >
                  Proceed
                </Button>
              </Box>
            </motion.div>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default SelectQuizConfigPage;

