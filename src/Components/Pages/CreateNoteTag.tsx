import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import myImage from "../../assets/images/my-image.jpg"; 

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

      await axios.post("http://84.21.205.113:3001/api/note-tags",{ name: tagName },
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
    <div className="w-full h-screen bg-black flex">
      <div className="w-1/2 flex justify-center items-center">
        <img src={myImage} alt="Login Illustration" className="w-3/4" />
      </div>

      <div className="w-1/2 flex justify-center items-center p-6">
        <div className="w-full max-w-md bg-black p-8 rounded-lg border-2 border-white">
          <h1 className="text-2xl font-bold mb-4 text-center text-white">Create Note Tag</h1>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <input
            type="text"
            placeholder="Tag name"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-2 border-2 border-white rounded-lg mb-4 text-white bg-black"
          />
          <div className="flex justify-between gap-4">
            <button
              onClick={handleCreateTag}
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-white hover:text-black transition border-2 border-white w-1/2"
            >
              Create
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-white hover:text-black transition border-2 border-white w-1/2"
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



