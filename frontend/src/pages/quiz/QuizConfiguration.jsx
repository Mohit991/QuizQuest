import { Box, Button, Divider, Typography } from "@mui/material";
import OptionsBox from "../../components/OptionsBox";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchLevels, fetchQuestionCounts, fetchTopicsOfCategory } from "../../api/api";
import ErrorPage from "../ErrorPage";
import CustomSpinner from "../../components/CustomSpinner";

console.log("quiz configuration loaded");

const QuizConfiguration = () => {
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
    return (
      <Box>
        <ErrorPage />
      </Box>
    );
  }

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
        CONFIGURE YOUR QUIZ
      </Typography>
      <Divider sx={{ borderColor: "whitesmoke", my: 4 }} />

      {/* Selected Category */}
      <Box mb={4}>
        <Typography fontSize="1.1rem" fontWeight="bold">
          Selected Category: {selectedCategory}
        </Typography>
      </Box>

      {/* Topic Selection */}
      <Box mb={4}>
        <Typography fontSize="1.1rem" fontWeight="bold">
          Choose Topic:
        </Typography>
        {isLoading ? (
          <CustomSpinner />
        ) : (
          <Box sx={{ display: "flex", justifyContent: "space-between" }} gap={4}>
            {topics.map((topic) => (
              <OptionsBox
                key={topic.topic_id}
                option={topic.topic_name}
                selected={selectedTopic === topic.topic_name}
                onOptionChosen={() => onTopicSelected(topic)}
              />
            ))}
          </Box>
        )}
      </Box>

      {/* Level Selection */}
      <Box mb={4}>
        <Typography fontSize="1.1rem" fontWeight="bold">
          Choose Level:
        </Typography>
        {isLoading ? (
          <CustomSpinner />
        ) : (
          <Box sx={{ display: "flex", justifyContent: "space-between" }} gap={4}>
            {levels.map((level, index) => (
              <OptionsBox
                key={index}
                option={level.name}
                selected={selectedLevel === level.name}
                onOptionChosen={() => onLevelSelected(level)}
              />
            ))}
          </Box>
        )}
      </Box>

      {/* Number of Questions Selection */}
      <Box mb={4}>
        <Typography fontSize="1.1rem" fontWeight="bold">
          Choose Number of Questions:
        </Typography>
        {isLoading ? (
          <CustomSpinner />
        ) : (
          <Box sx={{ display: "flex", justifyContent: "space-between" }} gap={4}>
            {quizQuestions.map((questionCounts, index) => (
              <OptionsBox
                key={index}
                option={questionCounts.count}
                selected={selectedNoOfQuestions === questionCounts.count}
                onOptionChosen={() => onNoOfQuestionsSelected(questionCounts)}
              />
            ))}
          </Box>
        )}
      </Box>

      {/* Proceed Button */}
      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleProceed}
          disabled={isProceedDisabled}
          sx={{ width: "100%" }}
        >
          Proceed
        </Button>
      </Box>
    </Box>
  );
};

export default QuizConfiguration;
