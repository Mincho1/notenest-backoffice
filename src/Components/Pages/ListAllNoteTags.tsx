import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; 
import { useNavigate } from "react-router-dom";

interface NoteTag {
  id: string;
  name: string;
}

const ListAllNoteTags = () => {
  const [noteTags, setNoteTags] = useState<NoteTag[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNoteTags = async () => {
      try {
        const accessToken = Cookies.get("accessToken");

        const response = await axios.get("http://84.21.205.113:3001/api/note-tags", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setNoteTags(response.data);
        setLoading(false);
      } catch (err: any) {
        setError("Error loading Note Tags.");
        setLoading(false);
      }
    };

    fetchNoteTags();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">All Note Tags</h1>

      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg">
        {noteTags.length === 0 ? (
          <p className="text-center py-4">No Tags available.</p>
        ) : (
          <ul className="divide-y divide-gray-300">
            {noteTags.map((noteTag) => (
              <li key={noteTag.id} className="px-6 py-4">
                <span>{noteTag.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={() => navigate("/dashboard")} 
        className="mt-6 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default ListAllNoteTags;


