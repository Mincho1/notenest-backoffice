import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import DashboardPage from "./Pages/DashboardPage";
import CreateNoteTag from "./Pages/CreateNoteTag";
import DeleteNoteTag from "./Pages/DeleteNoteTag";
import ListAllNoteTags from "./Pages/ListAllNoteTags";
import EditNoteTagPage from "./Pages/EditNoteTagPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/create-note-tag" element={<CreateNoteTag />}/>
        <Route path="/delete-note-tag" element={<DeleteNoteTag />}/>
        <Route path="/list-all-note-tags" element={<ListAllNoteTags />}/>
        <Route path="/edit-note-tag" element={<EditNoteTagPage />}/>
        <Route path="/edit-note-tag/:id" element={<EditNoteTagPage />} />
        <Route path="/delete-note-tag/:id" element={<DeleteNoteTag />} />

      </Routes>
    </Router>
  );
};

export default AppRouter;

