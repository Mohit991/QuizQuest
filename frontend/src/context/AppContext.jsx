import { createContext, useState, useEffect } from "react";

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

  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

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
        setUserEmail,
        token,
        setToken
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
