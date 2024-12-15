import { createContext, useState } from "react";

// Create the context
export const AppContext = createContext();

// Create the provider component
export const AppProvider = ({ children }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  return (
    <AppContext.Provider
      value={{
        selectedCategoryId,
        setSelectedCategoryId,
        selectedTopic,
        setSelectedTopic
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
