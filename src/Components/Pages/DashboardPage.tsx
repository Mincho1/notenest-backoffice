import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import noteNestLogo from "../../assets/images/noteNestLogo.jpg";

interface NoteTag {
  id: string;
  name: string;
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [noteTags, setNoteTags] = useState<NoteTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(false); // Track reload to refetch tags

  // Fetch Note Tags
  useEffect(() => {
    const fetchNoteTags = async () => {
      try {
        const accessToken = Cookies.get("accessToken");
        if (!accessToken) {
          setError("No access token found. Please log in.");
          return;
        }

        const response = await axios.get("http://84.21.205.113:3001/api/note-tags", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (Array.isArray(response.data)) {
          setNoteTags(response.data);
        } else {
          setError("Invalid response from server.");
        }
      } catch (err) {
        console.error("Error loading Note Tags:", err);
        setError("Failed to load Note Tags. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchNoteTags();
  }, [reload]); // Trigger reload when `reload` state changes

  // Reload logic from navigation state
  useEffect(() => {
    if (location.state?.reloadData) {
      setReload((prev) => !prev); // Toggle reload state to refetch tags
    }
  }, [location.state?.reloadData]);

  const handleDelete = (id: string, name: string) => {
    navigate("/delete-note-tag", { state: { id, name } });
  };

  const handleLogout = () => {
    Cookies.remove("accessToken");
    navigate("/");
  };

  if (loading) return <div className="text-white text-center mt-6">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-6">{error}</div>;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black">
      <div className="w-full flex justify-center mb-6">
        <img src={noteNestLogo} alt="Note Nest Logo" className="w-38 h-38 object-contain" />
      </div>
      <h1 className="text-3xl font-bold text-white">Note Nest Backoffice</h1>

      <div className="w-full max-w-4xl bg-black border-2 border-white shadow-md rounded-lg mt-6">
        <div className="flex justify-between px-6 py-4 border-b border-gray-300">
          <span className="text-white font-bold">Tag</span>
          <button
            onClick={() => navigate("/create-note-tag")}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-white hover:text-black border-2 border-white transition"
          >
            Create Tag
          </button>
        </div>
        <div className="flex justify-between px-6 py-4 border-b border-gray-300">
          <span className="text-white">Name</span>
          <span className="text-white">Actions</span>
        </div>

        {noteTags.length === 0 ? (
          <p className="text-center py-4 text-white">No Tags available.</p>
        ) : (
          <ul className="divide-y divide-gray-300">
            {noteTags.map(({ id, name }) => (
              <li key={id} className="flex justify-between px-6 py-4 text-white">
                <span>{name}</span>
                <div>
                  <button
                    onClick={() => navigate(`/edit-note-tag/${id}`, { state: { name } })}
                    className="px-4 py-2 mr-2 bg-black text-white rounded-lg hover:bg-white hover:text-black border-2 border-white transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(id, name)}
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-white hover:text-black border-2 border-white transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 px-6 py-2 bg-black text-white rounded-lg hover:bg-white hover:text-black border-2 border-white transition"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;
