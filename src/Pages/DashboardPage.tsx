import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/"); 
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Note Nest Backoffice</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl">
        <button
          onClick={() => navigate("/create-note-tag")}
          className="w-full px-6 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Създаване на Note Tag
        </button>

        <button
          onClick={() => navigate("/delete-note-tag")}
          className="w-full px-6 py-4 bg-red-500 text-white rounded-lg hover:bg-yellow-600 transition"
        >
          Изтриване на Note Tag
        </button>

        <button
          onClick={() => navigate("/list-all-note-tags")}
          className="w-full px-6 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Изброяване на всички Note Tags
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Изход
      </button>
    </div>
  );
};

export default DashboardPage;

