import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DeleteNoteTag = () => {
  const [tagName, setTagName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [tags, setTags] = useState<{ id: string; name: string }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const token = localStorage.getItem("myToken");
        const response = await axios.get("http://84.21.205.113:3001/api/note-tags", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTags(response.data); 
      } catch (err) {
        setError("Неуспешно зареждане на тагове");
      }
    };
    fetchTags();
  }, []);

  const handleDeleteTag = async () => {
    if (!tagName.trim()) {
      setError("Моля, въведете име на тага");
      return;
    }

    const tagToDelete = tags.find((tag) => tag.name === tagName); 

    if (!tagToDelete) {
      setError("Тагът не съществува");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://84.21.205.113:3001/api/note-tags/${tagToDelete.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Тагът беше успешно изтрит");
      setTagName("");
    } catch (err) {
      setError("Неуспешно изтриване на тага");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleDeleteTag();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Изтриване на Note Tag</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <input
        type="text"
        placeholder="Въведете име на тага"
        value={tagName}
        onChange={(e) => setTagName(e.target.value)}
        onKeyDown={handleKeyDown}
        className="px-4 py-2 border rounded-lg mb-4 w-80"
      />
      <button
        onClick={handleDeleteTag}
        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Изтрий
      </button>
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
      >
        Назад
      </button>
    </div>
  );
};

export default DeleteNoteTag;


