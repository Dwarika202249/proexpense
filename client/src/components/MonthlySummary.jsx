import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

const MonthlySummary = () => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const res = await API.post("/ai/summary");
      setSummary(res.data.summary);
      setShowSummary(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch AI summary 😢");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowSummary(false);
    setTimeout(() => {
      setSummary("");
    }, 300);
  };

  return (
    <div className="flex flex-col items-center mb-6">
      {/* 👉 Fetch Summary Button */}
      <button
        onClick={fetchSummary}
        disabled={loading}
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded flex items-center gap-2"
      >
        {loading && (
          <svg
            className="animate-spin h-5 w-5 text-white"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8h4z"
            ></path>
          </svg>
        )}
        {loading ? "Generating..." : "Get AI Monthly Summary"}
      </button>

      {/* 👉 Animated Summary Box */}
      {summary && (
        <div
          className={`bg-white p-4 mt-4 rounded shadow max-w-2xl w-full relative transition-all duration-300 ease-in-out transform ${
            showSummary ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* ❌ Cross Button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg font-bold"
          >
            ×
          </button>

          <h3 className="text-lg font-semibold mb-2 text-green-700">
            AI Summary
          </h3>
          <p className="text-gray-700 whitespace-pre-line">{summary}</p>
        </div>
      )}
    </div>
  );
};

export default MonthlySummary;
