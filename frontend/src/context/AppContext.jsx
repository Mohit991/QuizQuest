import { createContext, useState } from "react";

// Create the context
export const AppContext = createContext();

// Create the provider component
export const AppProvider = ({ children }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedNoOfQuestions, setSelectedNoOfQuestions] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [score, setScore] = useState(null)

  const [userName, setUserName] = useState(null)
  const [userId, setUserId] = useState(null)
  const [userEmail, setUserEmail] = useState(null)

  return (
    <AppContext.Provider
      value={{
        selectedCategoryId,
        setSelectedCategoryId,
        selectedCategory,
        setSelectedCategory,
        selectedTopic,
        setSelectedTopic,
        selectedTopicId,
        setSelectedTopicId,
        selectedNoOfQuestions, 
        setSelectedNoOfQuestions,
        selectedLevel, 
        setSelectedLevel,
        score, 
        setScore,
        userName,
        setUserName,
        userId,
        setUserId,
        userEmail,
        setUserEmail
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
