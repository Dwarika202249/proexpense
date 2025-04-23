import { useEffect, useState } from "react";
import { fetchMonthlyIncome, updateMonthlyIncome } from "../services/incomeApi";
import { toast } from "react-toastify";

const MonthlyIncomeCard = ({ month, setMonth, income, setIncome }) => {
  const [editing, setEditing] = useState(false);
  const [newIncome, setNewIncome] = useState("");

  useEffect(() => {
    const loadIncome = async () => {
      try {
        const data = await fetchMonthlyIncome(month);
        setIncome(data.amount || 0);
        setNewIncome(data.amount || 0);
      } catch (err) {
        toast.error("Failed to load income");
        console.error(err);
      }
    };

    loadIncome();
  }, [month, setIncome]);

  const handleUpdate = async () => {
    try {
      const updated = await updateMonthlyIncome({ amount: newIncome, month });
      setIncome(updated.amount);
      setEditing(false);
      toast.success("Income updated");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const formatMonthName = (monthStr) => {
    if (!monthStr) return "";
    const [year, month] = monthStr.split("-");
    const date = new Date(`${month}/01/${year}`);
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-green-700">
          Monthly Income {month && (
          <span className="text-green-700">({formatMonthName(month)})</span>
        )}
        </h3>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border p-1 rounded text-sm"
        />
      </div>

      {editing ? (
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={newIncome}
            onChange={(e) => setNewIncome(e.target.value)}
            className="border px-2 py-1 rounded w-32"
          />
          <button
            onClick={handleUpdate}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Save
          </button>
          <button
            onClick={() => setEditing(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold text-gray-800">₹{income}</p>
          <button
            onClick={() => setEditing(true)}
            className="text-sm text-blue-600 hover:underline"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default MonthlyIncomeCard;
