import { useState, useEffect } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

const categories = [
  { label: "Food", emoji: "🍕" },
  { label: "Travel", emoji: "🚌" },
  { label: "Shopping", emoji: "🛍️" },
  { label: "Health", emoji: "💊" },
  { label: "Entertainment", emoji: "📺" },
  { label: "Transport", emoji: "🚗" },
  { label: "Bills", emoji: "📄" },
  { label: "Utilities", emoji: "💡" },
  { label: "Education", emoji: "📚" },
  { label: "Other", emoji: "📦" },
];

const AddExpensePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [suggestedCategory, setSuggestedCategory] = useState("");

  useEffect(() => {
    if (formData.title.trim() === "") {
      setSuggestedCategory(""); // 🧽 Clear instantly if title is empty
      return; // 💨 Stop further execution
    }
    const delayDebounce = setTimeout(() => {
      if (formData.title.length > 3) {
        fetchCategorySuggestion(formData.title);
      }
    }, 700);

    return () => clearTimeout(delayDebounce);
  }, [formData.title]);

  const fetchCategorySuggestion = async (title) => {
    try {
      const res = await API.post("/ai/categorize", { title });
      const isValidCategory = categories
        .map((c) => c.label)
        .includes(res.data.category);
      if (res.data?.category && isValidCategory) {
        setSuggestedCategory(res.data.category);
      }
    } catch (error) {
      console.error("AI category fetch error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSuggestionClick = () => {
    setFormData((prev) => ({ ...prev, category: suggestedCategory }));
    setSuggestedCategory("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      await API.post("/expenses", {
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
      setSuggestedCategory("");
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
          className="w-full mb-1 px-4 py-2 border-2 border-green-400 rounded focus:outline-none focus:border-green-600 transition-all"
        />
        {suggestedCategory && (
          <p
            className="text-sm text-green-700 cursor-pointer underline"
            onClick={handleSuggestionClick}
          >
            💡 Suggested: {suggestedCategory} (Click to use)
          </p>
        )}

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
