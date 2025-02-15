import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"; 
import myImage from "../../assets/images/my-image.jpg"; 

const DeleteNoteTag = () => {
  const [tagName, setTagName] = useState("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState("");
  const [tags, setTags] = useState<{ id: string; name: string }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const accessToken = Cookies.get("accessToken");
        const response = await axios.get("http://84.21.205.113:3001/api/note-tags", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setTags(response.data);
      } catch (err) {
        setError("Failed to load tags.");
      }
    };
    fetchTags();
  }, []);

  const handleDeleteTag = async () => {
    if (!tagName.trim()) {
      setError("Please enter the tag name.");
      return;
    }

    const tagToDelete = tags.find((tag) => tag.name === tagName);

    if (!tagToDelete) {
      setError("The tag does not exist.");
      return;
    }

    try {
      const accessToken = Cookies.get("accessToken");

      await axios.delete(`http://84.21.205.113:3001/api/note-tags/${tagToDelete.id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setSuccess("The tag was successfully deleted.");
      setTagName("");
    } catch (err) {
      setError("Failed to delete the tag.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleDeleteTag();
    }
  };

  return (
    <div className="w-full h-screen bg-black flex">

      <div className="w-1/2 flex justify-center items-center p-6">
        <div className="w-full max-w-md bg-black p-8 rounded-lg border-2 border-white">
          <h1 className="text-2xl font-bold mb-4 text-center text-white">Delete Note Tag</h1>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
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
        </div>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <img src={myImage} alt="Login Illustration" className="w-3/4" />
      </div>
    </div>
  );
};

export default DeleteNoteTag;


