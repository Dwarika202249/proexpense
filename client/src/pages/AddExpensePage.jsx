import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

const categories = [
  { label: "Food", emoji: "🍕" },
  { label: "Travel", emoji: "🚌" },
  { label: "Entertainment", emoji: "📺" },
  { label: "Shopping", emoji: "🛍️" },
  { label: "Health", emoji: "💊" },
  { label: "Other", emoji: "📦" },
];

const AddExpensePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📤 Submitting Form:", formData);
  
    const today = new Date().toISOString().split("T")[0];
  
    if (
      !formData.title ||
      Number(formData.amount) <= 0 ||
      !formData.category ||
      !formData.date
    ) {
      toast.error("Please fill all fields correctly");
      return;
    }
  
    if (formData.date > today) {
      toast.error("Date cannot be in the future");
      return;
    }
  
    try {
      const res = await API.post("/expenses", {
        ...formData,
        amount: Number(formData.amount),
      });
      toast.success("Expense added successfully 💸");
  
      setFormData({
        title: "",
        amount: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
      });
    } catch (err) {
      toast.error("Failed to add expense 😢");
      console.error(err);
    }
  };
  

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-bold mb-4 text-green-700">Add New Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Expense Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border-2 border-green-400 rounded focus:outline-none focus:border-green-600 transition-all"
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount (Rs.)"
          value={formData.amount}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border-2 border-green-400 rounded focus:outline-none focus:border-green-600 transition-all"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border-2 border-green-400 rounded focus:outline-none focus:border-green-600 transition-all"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.label} value={cat.label}>
              {cat.emoji} {cat.label}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border-2 border-green-400 rounded focus:outline-none focus:border-green-600 transition-all"
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-full cursor-pointer"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpensePage;
