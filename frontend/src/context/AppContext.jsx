import { createContext, useState } from "react";

// Create the context
export const AppContext = createContext();

// Create the provider component
export const AppProvider = ({ children }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [selectedNoOfQuestions, setSelectedNoOfQuestions] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [score, setScore] = useState(null)

  return (
    <AppContext.Provider
      value={{
        selectedCategoryId,
        setSelectedCategoryId,
        selectedTopicId,
        setSelectedTopicId,
        selectedNoOfQuestions, 
        setSelectedNoOfQuestions,
        selectedLevel, 
        setSelectedLevel,
        score, 
        setScore
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
