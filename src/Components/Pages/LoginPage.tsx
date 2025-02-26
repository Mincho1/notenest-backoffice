import { FaGoogle } from "react-icons/fa"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import myImage from "../../assets/images/my-image-removebg-preview.png";

const BASE_URL = import.meta.env.VITE_BASE_URL; 

const LoginPage = () => { 
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
      console.log("Login Response:", response); 
      Cookies.set("accessToken", response.data.accessToken);
      Cookies.set("refreshToken", response.data.refreshToken);

      navigate("/dashboard");
    } catch (error: any) {
      setError("Incorrect email or password.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${BASE_URL}/auth/google-login`; 
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-900 to-black">
      <div className="hidden lg:flex w-1/2 justify-center items-center overflow-hidden">
        <img 
          src={myImage} 
          alt="Login Illustration" 
          className="w-full h-full object-cover rounded-lg shadow-2xl" 
        />
      </div>

      <div className="w-full lg:w-1/2 flex justify-center items-center p-6">
        <div className="w-full max-w-md bg-gray-800 p-10 rounded-lg border border-gray-600 shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Welcome Back</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
              <input
                id="email"
                type="text"
                className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
              <input
                id="password"
                type="password"
                className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full p-4 bg-blue-600 text-white rounded-lg border-2 border-blue-600 hover:bg-blue-500 transition">
              Log In
            </button>
          </form>

          <div className="mt-4 flex justify-center">
            <button
              onClick={handleGoogleLogin}
              className="w-full p-4 bg-gray-700 text-white rounded-lg hover:bg-blue-500 transition border-2 border-gray-600 flex items-center justify-center space-x-3"
            >
              <FaGoogle className="text-2xl" /> 
              <span>Login with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
