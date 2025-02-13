import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import myImage from "../assets/images/my-image.jpg";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://84.21.205.113:3001/api/auth/login", { email, password });
      localStorage.setItem("myToken", response.data.accessToken);
      console.log("Отговор от сървъра:", response.data);

      navigate("/dashboard");
    } catch (error: any) {
      setError("Грешен имейл или парола.");
    }
  };

  

  return (
    <div className="flex min-h-screen bg-black">
      <div className="hidden lg:flex w-1/2 bg-white-500 justify-center items-center">
        <img src={myImage} alt="Login Illustration" className="w-3/4" />
      </div>

      <div className="w-full lg:w-1/2 flex justify-center items-center p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center">Вход в системата</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Имейл</label>
              <input
                id="email"
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Вашият имейл"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Парола</label>
              <input
                id="password"
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Вашата парола"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Вход
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;



  