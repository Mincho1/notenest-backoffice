import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateNoteTag = () => {
  const [tagName, setTagName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateTag = async () => {
    if (!tagName.trim()) {
      setError("Името на тага не може да бъде празно");
      return;
    }
  
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        "http://84.21.205.113:3001/api/note-tags",
        { name: tagName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/dashboard");
    } catch (err) {
      setError("Неуспешно създаване на тага");
    }
  };
  

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Създаване на Note Tag</h1>
      <input
        type="text"
        placeholder="Въведете име на тага"
        value={tagName}
        onChange={(e) => setTagName(e.target.value)}
        className="px-4 py-2 border rounded-lg mb-4 w-80"
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleCreateTag}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Създай
      </button>
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-4 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
      >
        Отказ
      </button>
    </div>
  );
};

export default CreateNoteTag;
