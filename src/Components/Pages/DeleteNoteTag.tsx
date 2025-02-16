import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import noteNestLogo from "../../assets/images/noteNestLogo.jpg";

const DeleteNoteTag = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, name } = location.state || {};
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleDeleteTag = async () => {
    try {
      const accessToken = Cookies.get("accessToken");
      await axios.delete(`http://84.21.205.113:3001/api/note-tags/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setSuccess("The tag was successfully deleted.");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setError("Failed to delete the tag.");
    }
  };

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center p-6">
      <div className="w-full flex justify-center mb-6">
        <img
          src={noteNestLogo}
          alt="Note Nest Logo"
          className="w-38 h-38 object-contain"
        />
      </div>
      <div className="w-full max-w-md bg-black p-8 rounded-lg border-2 border-white text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Delete Note Tag</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        {!success && (
          <>
            <p className="text-white mb-4">Are you sure you want to delete the tag "{name}"?</p>
            <div className="flex justify-between gap-4">
              <button
                onClick={handleDeleteTag}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-white hover:text-black transition border-2 border-white w-1/2"
              >
                Delete
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-white hover:text-black transition border-2 border-white w-1/2"
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DeleteNoteTag;