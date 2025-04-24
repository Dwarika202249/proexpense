import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import GoogleAuth from "../components/GoogleAuth";

const LoginPage = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      localStorage.setItem("token", res.data.token);
      // alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed: " + err.response?.data?.msg);
    }
  };

  const handleGoogleLogin = async (token) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/google",

        {
          id_token: token,
        }
      );
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      setError("Google login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-xl rounded-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-green-600">Login</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border-2 border-green-400 rounded focus:outline-none focus:border-green-600 transition-all duration-200"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 border-2 border-green-400 rounded focus:outline-none focus:border-green-600 transition-all duration-200"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 cursor-pointer"
        >
          Login
        </button>
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-green-600 font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
        <div className="w-full mt-5 flex justify-center items-center">
          <GoogleAuth onSuccess={handleGoogleLogin} />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
