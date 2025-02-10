import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import DashboardPage from "./DashboardPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
