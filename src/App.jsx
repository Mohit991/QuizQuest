import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/Homepage";
import ChooseNoOfQuestions from "./pages/ChooseNoOfQuestions";
import ChooseLevel from "./pages/ChooseLevel";
import ChooseTopic from "./pages/ChooseTopic";
import Quiz from "./pages/Quiz";
import SelectedOptions from "./pages/SelectedOptions";

function App() {
  return (
    <>
    {/* <Quiz /> */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/start"
            element={<ChooseTopic />}
          />
          <Route
            path="/start/:topic"
            element={<ChooseNoOfQuestions />}
          />
          <Route
            path="/start/:topic/:noOfQuestions"
            element={<ChooseLevel />}
          />
          <Route
            path="/start/:topic/:noOfQuestions/:level/selectedOptions"
            element={<SelectedOptions />}
          />
          <Route
            path="/start/:topic/:noOfQuestions/:level/selectedOptions/quiz"
            element={<Quiz />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
