import { useState, useEffect } from "react";
import { fetchMonthlyIncome } from "../services/incomeApi";
import API from "../services/api";
import { toast } from "react-toastify";
import { getCurrentMonth } from "../utils/dateUtils";
import { FaSpinner } from "react-icons/fa"; // Spinner icon

const MonthlyBudgetAdvisor = () => {
  const [income, setIncome] = useState(0);
  const [editingIncome, setEditingIncome] = useState(false);
  const [tempIncome, setTempIncome] = useState("");
  const [prompt, setPrompt] = useState("");
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  const month = getCurrentMonth();

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const res = await fetchMonthlyIncome(month);
        setIncome(res.amount || 0);
        setTempIncome(res.amount || 0);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch monthly income 😢");
      }
    };
    fetchIncomeData();
  }, [month]);

  const fetchBudgetAdvice = async () => {
    if (!income) {
      toast.error("Income not found. Please update your income first 😢");
      return;
    }
    if (advice) {
      handleClose();
    }
    setLoading(true);
    try {
      setPrompt("");
      const res = await API.post("/ai/budget-advice", { income, customPrompt: prompt });
      setAdvice(res.data.advice);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch budget advice 😢");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setAdvice("");
  };

  const handleIncomeSave = () => {
    const updatedIncome = parseInt(tempIncome);
    if (isNaN(updatedIncome) || updatedIncome < 0) {
      toast.error("Invalid income amount");
      return;
    }
    setIncome(updatedIncome);
    setEditingIncome(false);
  };

  return (
    <div className="flex flex-col items-center mb-8 gap-5">
      {/* Income Section */}
      <div className="flex items-center gap-3">
        {editingIncome ? (
          <>
            <input
              type="number"
              value={tempIncome}
              onChange={(e) => setTempIncome(e.target.value)}
              className="border px-2 py-1 rounded w-32"
            />
            <button
              onClick={handleIncomeSave}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setEditingIncome(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <p className="text-gray-600">
              <span className="font-semibold">Your Income:</span> ₹{income}
            </p>
            <button
              onClick={() => setEditingIncome(true)}
              className="text-sm text-blue-600 hover:underline"
            >
              Edit
            </button>
          </>
        )}
      </div>

      {/* Optional Prompt Section */}
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="(Optional) Add your custom instructions for the AI..."
        className="border rounded p-2 w-full max-w-2xl text-sm text-gray-700"
        rows={3}
      />

      {/* Button */}
      <button
        onClick={fetchBudgetAdvice}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded flex items-center gap-2"
      >
        {loading ? (
          <>
            <FaSpinner className="animate-spin" /> Generating...
          </>
        ) : (
          "Get Budget Advice"
        )}
      </button>

      {/* Advice Box */}
      {advice && (
        <div className="bg-white p-4 mt-4 rounded shadow max-w-2xl w-full relative">
          {/* Cross Button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg font-bold"
          >
            ×
          </button>

          <h3 className="text-lg font-semibold mb-2 text-green-700">
            Your AI Budget Advice
          </h3>
          <p className="text-gray-700 whitespace-pre-line">{advice}</p>
        </div>
      )}
    </div>
  );
};

export default MonthlyBudgetAdvisor;
