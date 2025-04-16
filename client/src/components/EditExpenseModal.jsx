// src/components/EditExpenseModal.jsx
import { useState, useEffect } from "react";
import API from "../services/api";

const categories = ["Food", "Travel", "Entertainment", "Shopping", "Health", "Other"];

const EditExpenseModal = ({ isOpen, onClose, expense, onUpdated }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    if (expense) {
      setFormData({
        title: expense.title || "",
        amount: expense.amount || "",
        category: expense.category || "",
        date: expense.date?.slice(0, 10) || "",
      });
    }
  }, [expense]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await API.put(`/expenses/${expense._id}`, formData);
      onUpdated(res.data); // send updated data to parent
      onClose();
    } catch (err) {
      console.error("Failed to update expense:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-[90%] max-w-md relative transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl text-gray-500 hover:text-red-500"
        >
          &times;
        </button>

        <h3 className="text-xl font-semibold mb-5 text-green-700">Edit Expense</h3>

        <div className="space-y-4">
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditExpenseModal;
