import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { FaPencilAlt, FaTrashAlt, FaPlus } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface NoteTag {
  id: string;
  name: string;
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [noteTags, setNoteTags] = useState<NoteTag[]>([]);
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);

  const [tagName, setTagName] = useState("");
  const [editedName, setEditedName] = useState("");
  const [error, setError] = useState("");
  const [selectedTag, setSelectedTag] = useState<NoteTag | null>(null);

  // Функция за зареждане на таговете от API
  useEffect(() => {
    const fetchNoteTags = async () => {
      try {
        const accessToken = Cookies.get("accessToken");
        if (!accessToken) {
          setError("No access token found. Please log in.");
          return;
        }

        const response = await axios.get(`${BASE_URL}/api/note-tags`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (Array.isArray(response.data)) {
          setNoteTags(response.data);
        } else {
          setError("Invalid response from server.");
        }
      } catch (err) {
        setError("Failed to load Note Tags.");
      }
    };

    fetchNoteTags();
  }, [location.state?.reloadData]);

  // Функция за създаване на нов таг
  const handleCreateTag = async () => {
    if (!tagName.trim()) {
      setError("The tag name cannot be empty.");
      return;
    }

    try {
      const accessToken = Cookies.get("accessToken");
      await axios.post(
        `${BASE_URL}/api/note-tags`,
        { name: tagName },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      setTagName("");
      setCreateOpen(false);
      setError("");
      location.state = { reloadData: true };
      window.location.reload();
    } catch (err) {
      setError("Failed to create tag.");
    }
  };

  // Функция за редактиране на таг
  const handleEditTag = async () => {
    if (!editedName.trim()) {
      setError("Tag name cannot be empty.");
      return;
    }

    try {
      const accessToken = Cookies.get("accessToken");
      await axios.patch(
        `${BASE_URL}/api/note-tags/${selectedTag?.id}`,
        { name: editedName },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      setEditOpen(false);
      setSelectedTag(null);
      location.state = { reloadData: true };
      window.location.reload();
    } catch (err) {
      setError("Failed to update tag.");
    }
  };

  // Функция за изтриване на таг
  const handleDeleteTag = async () => {
    try {
      const accessToken = Cookies.get("accessToken");
      await axios.delete(`${BASE_URL}/api/note-tags/${selectedTag?.id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setDeleteOpen(false);
      setSelectedTag(null);
      location.state = { reloadData: true };
      window.location.reload();
    } catch (err) {
      setError("Failed to delete tag.");
    }
  };

  // Логин и навигация
  const handleLogout = () => {
    Cookies.remove("accessToken");
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white p-6">
      <h1 className="text-6xl font-extrabold mb-8 text-center tracking-wide uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 shadow-xl">
        Note Nest
      </h1>

      <div className="w-full max-w-3xl bg-black border border-white/20 rounded-2xl shadow-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-semibold">Tags</span>
          <div className="flex gap-4">
            <button
              onClick={() => setCreateOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg hover:brightness-90 transition-all shadow-md font-bold"
            >
              <FaPlus /> Create Tag
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-3 border border-white rounded-lg text-white hover:bg-white hover:text-black font-bold transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        {noteTags.length === 0 ? (
          <p className="text-center text-white/60 italic">No tags available.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {noteTags.map(({ id, name }) => (
              <div
                key={id}
                className="flex justify-between items-center p-5 bg-white/5 rounded-xl border border-white/10"
              >
                <span className="text-lg">{name}</span>
                <div className="flex gap-4">
                  <FaPencilAlt
                    onClick={() => {
                      setSelectedTag({ id, name });
                      setEditedName(name);
                      setEditOpen(true);
                    }}
                    className="cursor-pointer text-white/60 hover:text-white transition"
                  />
                  <FaTrashAlt
                    onClick={() => {
                      setSelectedTag({ id, name });
                      setDeleteOpen(true);
                    }}
                    className="cursor-pointer text-red-500 hover:text-red-700 transition"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Modal */}
      {isCreateOpen && (
        <dialog open className="w-full max-w-md bg-black/90 p-8 rounded-xl border border-white/20 text-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 shadow-2xl backdrop-blur-md">
          <h1 className="text-3xl font-bold mb-4 text-white">Create Note Tag</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <input
            type="text"
            placeholder="Tag name"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreateTag();
            }}
            className="w-full px-4 py-3 border border-white/10 rounded-lg bg-white/10 text-white focus:outline-none mb-4"
          />
          <div className="flex justify-between gap-4">
            <button
              onClick={() => {
                setCreateOpen(false);
                setTagName("");
                setError("");
              }}
              className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 w-1/2 font-bold"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateTag}
              className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-300 w-1/2 font-bold"
            >
              Create
            </button>
          </div>
        </dialog>
      )}

      {/* Edit Modal */}
      {isEditOpen && selectedTag && (
        <dialog open className="w-full max-w-md bg-black/90 p-8 rounded-xl border border-white/20 text-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 shadow-2xl backdrop-blur-md">
          <h1 className="text-3xl font-bold mb-4 text-white">Edit Note Tag</h1>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="w-full px-4 py-3 mb-4 border border-white/10 rounded-lg bg-white/10 text-white focus:outline-none"
            placeholder="Enter new tag name"
          />
          <div className="flex justify-between gap-4">
            <button
              onClick={() => setEditOpen(false)}
              className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 w-1/2 font-bold"
            >
              Cancel
            </button>
            <button
              onClick={handleEditTag}
              className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-300 w-1/2 font-bold"
            >
              Save
            </button>
          </div>
        </dialog>
      )}

      {/* Delete Modal */}
      {isDeleteOpen && selectedTag && (
        <dialog open className="w-full max-w-md bg-black/90 p-8 rounded-xl border border-white/20 text-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 shadow-2xl backdrop-blur-md">
          <h1 className="text-3xl font-bold mb-4 text-white">Delete Note Tag</h1>
          <p className="mb-6 text-lg text-white/90">
            Are you sure you want to delete <strong>{selectedTag.name}</strong>?
          </p>
          <div className="flex justify-between gap-4">
            <button
              onClick={() => setDeleteOpen(false)}
              className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 w-1/2 font-bold"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteTag}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 w-1/2 font-bold"
            >
              Delete
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default DashboardPage;
