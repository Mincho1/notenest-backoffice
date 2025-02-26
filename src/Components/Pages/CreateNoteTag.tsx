import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import myImage from "../../assets/images/my-image-removebg-preview.png";

const CreateNoteTag = () => {
  const [tagName, setTagName] = useState("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleCreateTag = async () => {
    if (!tagName.trim()) {
      setError("The tag name cannot be empty.");
      return;
    }

    try {
      const accessToken = Cookies.get("accessToken");

      // Използване на .env променливата за URL
      const BASE_URL = import.meta.env.VITE_BASE_URL;

      await axios.post(
        `${BASE_URL}/api/note-tags`,
        { name: tagName },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/dashboard");
    } catch (err) {
      console.error("Error creating the tag:", err);
      setError("Failed to create the tag.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCreateTag();
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-900 to-black">
      <div className="w-1/2 flex justify-center items-center">
        <img src={myImage} alt="Tag Illustration" className="w-3/4 opacity-90 transform transition duration-300 hover:scale-105 hover:opacity-100" />
      </div>

      <div className="w-1/2 flex justify-center items-center p-6">
        <div className="w-full max-w-md bg-black p-8 rounded-lg border-2 border-white shadow-xl">
          <h1 className="text-3xl font-semibold text-center text-white mb-6">Create Note Tag</h1>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          
          <input
            type="text"
            placeholder="Tag name"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-3 border-2 border-white rounded-lg mb-6 text-white bg-black focus:outline-none focus:ring-2 focus:ring-white"
          />
          
          <div className="flex justify-between gap-4">
            <button
              onClick={handleCreateTag}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-white hover:text-black transition transform duration-300 hover:scale-105 border-2 border-white w-1/2"
            >
              Create
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-white hover:text-black transition transform duration-300 hover:scale-105 border-2 border-white w-1/2"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNoteTag;
