import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"; 

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
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Delete Note Tag</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <input
        type="text"
        placeholder="Tag name"
        value={tagName}
        onChange={(e) => setTagName(e.target.value)}
        onKeyDown={handleKeyDown}
        className="px-4 py-2 border rounded-lg mb-4 w-80"
      />
      <button
        onClick={handleDeleteTag}
        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Delete
      </button>
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
      >
        Back
      </button>
    </div>
  );
};

export default DeleteNoteTag;


