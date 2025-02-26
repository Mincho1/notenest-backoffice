import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import noteNestLogo from "../../assets/images/noteNestLogo.jpg";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_BASE_URL; 

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
  const [reload, setReload] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<NoteTag | null>(null);
  const [editedName, setEditedName] = useState("");

  const [deleteError, setDeleteError] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState("");
  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] = useState("");

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
  
        console.log("API Response:", response);
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
  }, [reload]);

  useEffect(() => {
    if (location.state?.reloadData) {
      setReload((prev) => !prev);
    }
  }, [location.state?.reloadData]);

  const handleDelete = (id: string, name: string) => {
    setSelectedTag({ id, name });
    setDeleteOpen(true);
    setDeleteError("");
    setDeleteSuccess("");
  };

  const handleEdit = (id: string, name: string) => {
    setSelectedTag({ id, name });
    setEditedName(name);
    setEditOpen(true);
    setEditError("");
    setEditSuccess("");
  };

  const handleLogout = () => {
    Cookies.remove("accessToken");
    navigate("/");
  };

  const handleDeleteTag = async () => {
    try {
      const accessToken = Cookies.get("accessToken");
      await axios.delete(`${BASE_URL}/api/note-tags/${selectedTag?.id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setDeleteSuccess("The tag was successfully deleted.");
      setTimeout(() => {
        setDeleteOpen(false);
        setReload((prev) => !prev);
      }, 1000);
    } catch (err) {
      setDeleteError("Failed to delete the tag.");
    }
  };

  const handleEditTag = async () => {
    if (!editedName.trim()) {
      setEditError("Please enter a valid tag name.");
      return;
    }

    try {
      const accessToken = Cookies.get("accessToken");
      await axios.patch(
        `${BASE_URL}/api/note-tags/${selectedTag?.id}`,
        { name: editedName },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setEditSuccess("The tag was successfully updated.");
      setTimeout(() => {
        setEditOpen(false);
        setReload((prev) => !prev);
      }, 1000);
    } catch (err) {
      setEditError("Failed to update the tag.");
    }
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
                <div className="flex gap-2">
                  <FaPencilAlt
                    onClick={() => handleEdit(id, name)}
                    className="text-white text-xl cursor-pointer transition-colors duration-300 hover:text-blue-500"
                  />
                  
                  <FaTrashAlt
                    onClick={() => handleDelete(id, name)}
                    className="text-white text-xl cursor-pointer transition-colors duration-300 hover:text-red-500"
                  />
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

      {isEditOpen && selectedTag && (
        <dialog open className="w-full max-w-md bg-black p-8 rounded-lg border-2 border-white text-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <h1 className="text-2xl font-bold text-white mb-4">Edit Note Tag</h1>
          {editError && <p className="text-red-500">{editError}</p>}
          {editSuccess && <p className="text-green-500">{editSuccess}</p>}
          <p className="text-white mb-4">Edit the name of the tag</p>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="w-full px-4 py-2 mb-4 border-2 border-white rounded-lg text-white bg-black"
          />
          <div className="flex justify-between gap-4">
            <button
              onClick={handleEditTag} 
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-white hover:text-black transition border-2 border-white w-1/2"
            >
              Save
            </button>
            <button
              onClick={() => setEditOpen(false)} 
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-white hover:text-black transition border-2 border-white w-1/2"
            >
              Cancel
            </button>
          </div>
        </dialog>
      )}

      {isDeleteOpen && selectedTag && (
        <dialog open className="w-full max-w-md bg-black p-8 rounded-lg border-2 border-white text-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <h1 className="text-2xl font-bold text-white mb-4">Delete Note Tag</h1>
          {deleteError && <p className="text-red-500">{deleteError}</p>}
          {deleteSuccess && <p className="text-green-500">{deleteSuccess}</p>}
          <p className="text-white mb-4">
            Are you sure you want to delete the tag "{selectedTag.name}"?
          </p>
          <div className="flex justify-between gap-4">
            <button
              onClick={handleDeleteTag} 
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-white hover:text-black transition border-2 border-white w-1/2"
            >
              Delete
            </button>
            <button
              onClick={() => setDeleteOpen(false)} 
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-white hover:text-black transition border-2 border-white w-1/2"
            >
              Cancel
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default DashboardPage;
