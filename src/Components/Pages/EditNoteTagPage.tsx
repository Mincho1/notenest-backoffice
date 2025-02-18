import { useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import noteNestLogo from "../../assets/images/noteNestLogo.jpg";

const EditNoteTag = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, tagId } = location.state || {};

  const [tagName, setTagName] = useState(name || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleEdit = async () => {
    if (!tagName.trim()) {
      setError("Please enter a valid tag name.");
      return;
    }
  
    try {
      setError("");
      setSuccess("");
      const accessToken = Cookies.get("accessToken");
  
      if (!accessToken) {
        setError("No access token found. Please log in.");
        return;
      }
  
      await axios.patch(
        `http://84.21.205.113:3001/api/note-tags/${tagId}`,
        { name: tagName },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
  
      setSuccess("Tag successfully updated.");
      setTimeout(() => navigate("/dashboard", { state: { reloadData: true } }), 1500);
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };
  
  return (
    <div className="w-full h-screen bg-black flex flex-col items-center p-6">
      <div className="w-full flex justify-center mb-6">
        <img src={noteNestLogo} alt="Note Nest Logo" className="w-38 h-38 object-contain" />
      </div>
      <div className="w-full max-w-md bg-black p-8 rounded-lg border-2 border-white text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Edit Note Tag</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <input
          type="text"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          className="w-full px-4 py-2 border-2 border-white rounded-lg mb-4 text-white bg-black"
        />
        <button
          onClick={handleEdit}
          className="w-full px-6 py-2 bg-black text-white rounded-lg hover:bg-white hover:text-black transition border-2 border-white"
        >
          Save Changes
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full px-6 py-2 bg-black text-white rounded-lg hover:bg-white hover:text-black transition border-2 border-white mt-4"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default EditNoteTag;

