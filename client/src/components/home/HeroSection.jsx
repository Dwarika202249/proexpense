// src/components/home/HeroSection.jsx
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };
  return (
    <section className="bg-gradient-to-r from-green-100 to-green-50 py-20 px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-6">
        Take Control of Your Expenses 💸
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mb-8">
        Smart. Simple. AI-Powered Expense Tracking to help you save better.
      </p>
      <div className="mt-6">
        <button
          onClick={handleClick}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Get Started
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
