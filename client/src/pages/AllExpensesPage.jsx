import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditExpenseModal from "../components/EditExpenseModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { saveAs } from "file-saver";

const categories = [
  "Food",
  "Travel",
  "Entertainment",
  "Shopping",
  "Health",
  "Other",
];

const ITEMS_PER_PAGE = 6;

const AllExpensesPage = () => {
  const [editingExpense, setEditingExpense] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [filters, setFilters] = useState({ category: "", from: "", to: "" });

  const [expenses, setExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchFilteredExpenses = async () => {
    try {
      const query = new URLSearchParams(
        Object.fromEntries(Object.entries(filters).filter(([_, val]) => val))
      ).toString();
      const res = await API.get(`/expenses/filter?${query}`);
      setExpenses(res.data);
      setCurrentPage(1);
    } catch (err) {
      toast.error("Failed to fetch filtered expenses");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFilteredExpenses();
  }, [filters]);

  const clearFilters = () => {
    setFilters({ category: "", from: "", to: "" });
  };

  const totalSum = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const handleEditClick = (expense) => {
    setEditingExpense(expense);
    setShowEditModal(true);
  };

  const handleExpenseUpdated = async () => {
    setShowEditModal(false);
    await fetchFilteredExpenses();
  };

  const handleDeleteClick = (expense) => {
    setSelectedExpense(expense);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await API.delete(`/expenses/${selectedExpense._id}`);
      toast.success("Expense deleted successfully");
      setExpenses((prev) =>
        prev.filter((exp) => exp._id !== selectedExpense._id)
      );
      setDeleteModalOpen(false);
    } catch (err) {
      toast.error("Failed to delete expense");
    }
  };

  const handleDownloadCSV = () => {
    const csvHeader = "Title,Amount,Category,Date\n";
    const csvBody = expenses
      .map(
        (exp) =>
          `${exp.title},${exp.amount},${exp.category},${new Date(
            exp.date
          ).toLocaleDateString()}`
      )
      .join("\n");

    const blob = new Blob([csvHeader + csvBody], { type: "text/csv" });
    saveAs(blob, "expenses.csv");
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = expenses.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(expenses.length / ITEMS_PER_PAGE);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-700">🔎 All Expenses</h2>
        <button
          onClick={handleDownloadCSV}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded text-sm"
        >
          Download CSV
        </button>
      </div>

      {/* Filter Box */}
      <div className="bg-white p-4 rounded shadow space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="p-2 border border-green-400 rounded"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
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
        </div>

        {(filters.category || filters.from || filters.to) && (
          <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
            <div>
              Active Filters:
              {filters.category && (
                <span> Category: <strong>{filters.category}</strong> </span>
              )}
              {filters.from && (
                <span> From: <strong>{filters.from}</strong> </span>
              )}
              {filters.to && (
                <span> To: <strong>{filters.to}</strong> </span>
              )}
            </div>
            <button
              onClick={clearFilters}
              className="text-red-500 hover:underline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Expense Table */}
      {currentItems.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-green-100 text-left">
                <th className="py-2 px-4">Title</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Category</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((exp, index) => (
                <tr
                  key={exp._id}
                  className={`border-t hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="py-2 px-4 capitalize">{exp.title}</td>
                  <td className="py-2 px-4">₹{exp.amount}</td>
                  <td className="py-2 px-4">{exp.category}</td>
                  <td className="py-2 px-4">
                    {new Date(exp.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => handleEditClick(exp)}
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(exp)}
                      className="text-red-600 hover:underline cursor-pointer"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total sum */}
          <div className="text-right p-4 font-medium text-green-700 border-t">
            Total Spent: ₹{totalSum}
          </div>

          {/* Pagination */}
          <div className="flex justify-end items-center gap-4 px-4 pb-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="text-sm text-gray-600 hover:text-green-700"
            >
              ⬅ Prev
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="text-sm text-gray-600 hover:text-green-700"
            >
              Next ➡
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No expenses found with selected filters.</p>
      )}

      {/* Modals */}
      {showEditModal && editingExpense && (
        <EditExpenseModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          expense={editingExpense}
          onUpdated={handleExpenseUpdated}
        />
      )}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        expenseTitle={selectedExpense?.title}
      />
    </div>
  );
};

export default AllExpensesPage;
