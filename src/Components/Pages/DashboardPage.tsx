import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; 
import noteNestLogog from "../../assets/images/noteNestLogo.jpg";

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    navigate("/");
  };
  

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black">
      <img
        src={noteNestLogog}  
        alt="Note Nest Logo"
        className="absolute top-0 mb-4 w-38 h-38 object-contain"
      />
      <h1 className="text-3xl font-bold mb-6 text-white">Note Nest Backoffice</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl">
        
        <button
          onClick={() => navigate("/create-note-tag")}
          className="w-full px-6 py-4 bg-black border-2 border-white text-white rounded-lg hover:bg-white hover:text-black transition"
        >
          Create Note Tag
        </button>

        <button
          onClick={() => navigate("/delete-note-tag")}
          className="w-full px-6 py-4 bg-black border-2 border-white text-white rounded-lg hover:bg-white hover:text-black transition"
        >
          Delete Note Tag
        </button>

        <button
          onClick={() => navigate("/list-all-note-tags")}
          className="w-full px-6 py-4 bg-black border-2 border-white text-white rounded-lg hover:bg-white hover:text-black transition"
        >
          All Note Tags
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 bg-black text-white rounded-lg hover:bg-white hover:text-black border-2 border-white  transition"
      >
        Log out
      </button>
    </div>
  );
};

export default DashboardPage;


