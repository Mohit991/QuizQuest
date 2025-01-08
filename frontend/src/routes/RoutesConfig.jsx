import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Homepage";
import ChooseCategory from "../pages/quiz/ChooseCategory";
import SelectedQuizOptions from "../pages/quiz/SelectedQuizOptions";
import Quiz from "../pages/quiz/Quiz";
import ScorePage from "../pages/quiz/ScorePage";
import StartQuizLayout from "../pages/layouts/StartQuizLayout";
import UserProgress from "../pages/user/UserProgress";
import QuizConfiguration from "../pages/quiz/QuizConfiguration"; 
import User from "../pages/user/User";
import Leaderboards from "../pages/user/Leaderboards";

const RoutesConfig = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/quiz" element={<StartQuizLayout />}>
      <Route index element={<ChooseCategory />} />
      <Route path="/quiz/:category/quiz-configuration" element={<QuizConfiguration />} /> 
      <Route path="/quiz/:category/quiz-configuration/selected-options" element={<SelectedQuizOptions />} />
      <Route path="/quiz/:category/quiz-configuration/selected-options/start" element={<Quiz />} />
    </Route>
    <Route path="/user" element={<User />} />
    <Route path="/user-progress" element={<UserProgress />} />
    <Route path="/leaderboards" element={<Leaderboards />} />
    <Route path="/quiz/score" element={<ScorePage />} />
  </Routes>
);

export default RoutesConfig;
