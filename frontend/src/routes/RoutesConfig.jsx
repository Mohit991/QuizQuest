import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Homepage";
import ChooseCategoryPage from "../pages/quiz/ChooseCategoryPage";
import SelectedQuizConfigPage from "../pages/quiz/SelectedQuizConfigPage";
import Quiz from "../components/Quiz";
import ScorePage from "../pages/quiz/ScorePage";
import StartQuizLayout from "../layouts/StartQuizLayout";
import UserProgress from "../pages/user/UserProgress";
import SelectQuizConfigPage from "../pages/quiz/SelectQuizConfigPage"; 
import UserInfo from "../pages/user/UserInfo";
import Leaderboards from "../pages/user/Leaderboards";
import AdminPanel from "../pages/admin/AdminPanel";

const RoutesConfig = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/quiz" element={<StartQuizLayout />}>
      <Route index element={<ChooseCategoryPage />} />
      <Route path="/quiz/:category/quiz-configuration" element={<SelectQuizConfigPage />} /> 
      <Route path="/quiz/:category/quiz-configuration/selected-options" element={<SelectedQuizConfigPage />} />
      <Route path="/quiz/:category/quiz-configuration/selected-options/start" element={<Quiz />} />
    </Route>
    <Route path="/user" element={<UserInfo />} />
    <Route path="/user-progress" element={<UserProgress />} />
    <Route path="/leaderboards" element={<Leaderboards />} />
    <Route path="/quiz/score" element={<ScorePage />} />
    <Route path="/admin/*" element={<AdminPanel />} />
  </Routes>
);

export default RoutesConfig;
