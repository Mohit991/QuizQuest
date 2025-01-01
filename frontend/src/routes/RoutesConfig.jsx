import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Homepage"
import ChooseCategory from "../pages/quiz/ChooseCategory";
import ChooseTopic from "../pages/quiz/ChooseTopic";
import ChooseNoOfQuestions from "../pages/quiz/ChooseNoOfQuestions";
import ChooseLevel from "../pages/quiz/ChooseLevel";
import SelectedQuizOptions from "../pages/quiz/SelectedQuizOptions";
import Quiz from "../pages/quiz/Quiz";
import ScorePage from "../pages/quiz/ScorePage";
import StartQuizLayout from "../pages/layouts/StartQuizLayout";
import UserProgress from "../pages/user/UserProgress";

const RoutesConfig = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/quiz" element={<StartQuizLayout />}>
      <Route index element={<ChooseCategory />} />
      <Route path=":category" element={<ChooseTopic />} />
      <Route path="/quiz/:category/:topic" element={<ChooseNoOfQuestions />} />
      <Route path="/quiz/:category/:topic/:noOfQuestions" element={<ChooseLevel />} />
      <Route path="/quiz/:category/:topic/:noOfQuestions/:level" element={<SelectedQuizOptions />} />
      <Route path="/quiz/:category/:topic/:noOfQuestions/:level/start" element={<Quiz />} />
    </Route>
    <Route path="/user-progress" element={<UserProgress />} />
    <Route path="/quiz/score" element={<ScorePage />} />
  </Routes>
);

export default RoutesConfig;
