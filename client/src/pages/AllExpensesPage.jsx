// src/pages/AllExpensesPage.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

const categories = ["Food", "Travel", "Entertainment", "Shopping", "Health", "Other"];

const AllExpensesPage = () => {
  const [filters, setFilters] = useState({
    category: "",
    from: "",
    to: "",
  });

  const [expenses, setExpenses] = useState([]);

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchFilteredExpenses = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await API.get(`/expenses/filter?${query}`);
      setExpenses(res.data);
    } catch (err) {
      toast.error("Failed to fetch filtered expenses");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFilteredExpenses(); // Fetch default on load
  }, []);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchFilteredExpenses();
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-green-700">🔎 All Expenses</h2>

      {/* Filter UI */}
      <form onSubmit={handleFilterSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="p-2 border border-green-400 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="date"
          name="from"
          value={filters.from}
          onChange={handleChange}
          className="p-2 border border-green-400 rounded"
        />

        <input
          type="date"
          name="to"
          value={filters.to}
          onChange={handleChange}
          className="p-2 border border-green-400 rounded"
        />

        <button
          type="submit"
          className="col-span-1 sm:col-span-3 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          Apply Filters
        </button>
      </form>

      {/* Results */}
      {expenses.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-green-100 text-left">
                <th className="py-2 px-4">Title</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Category</th>
                <th className="py-2 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={exp._id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4 capitalize">{exp.title}</td>
                  <td className="py-2 px-4">₹{exp.amount}</td>
                  <td className="py-2 px-4">{exp.category}</td>
                  <td className="py-2 px-4">
                    {new Date(exp.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No expenses found with selected filters.</p>
      )}
    </div>
  );
};

export default AllExpensesPage;
