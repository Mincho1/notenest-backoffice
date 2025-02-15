import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; 
import { useNavigate } from "react-router-dom";
import noteNestLogog from "../../assets/images/noteNestLogo.jpg";

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
    <div className="flex flex-col justify-center items-center min-h-screen bg-black">
      <img
        src={noteNestLogog}  
        alt="Note Nest Logo"
        className="absolute top-0 mb-4 w-38 h-38 object-contain"
      />

      <h1 className="text-3xl font-bold mb-6 text-white">All Note Tags</h1>

      <div className="w-full max-w-4xl bg-black border-2 border-white shadow-md rounded-lg">
        {noteTags.length === 0 ? (
          <p className="text-center py-4 text-white">No Tags available.</p>
        ) : (
          <ul className="divide-y divide-gray-300">
            {noteTags.map((noteTag) => (
              <li key={noteTag.id} className="px-6 py-4 text-white">
                <span>{noteTag.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={() => navigate("/dashboard")} 
        className="mt-6 px-4 py-2 bg-black text-white rounded-lg hover:bg-white hover:text-black transition border-2 border-white"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default ListAllNoteTags;


