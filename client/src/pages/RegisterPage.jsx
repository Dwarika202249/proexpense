import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import GoogleAuth from "../components/GoogleAuth";

const RegisterPage = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      alert("Registered successfully!");
      navigate("/");
    } catch (err) {
      alert("Registration failed: " + err.response?.data?.msg);
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
        <h2 className="text-3xl font-bold mb-6 text-green-600">Register</h2>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border-2 border-green-400 rounded focus:outline-none focus:border-green-600 transition-all duration-200"
          required
        />
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
          Register
        </button>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-green-600 font-semibold hover:underline">
            Login here
          </Link>
        </p>
        <divs className="w-full mt-5 flex justify-center items-center">
          <GoogleAuth onSuccess={handleGoogleLogin} />
        </divs>
      </form>
    </div>
  );
};

export default RegisterPage;
