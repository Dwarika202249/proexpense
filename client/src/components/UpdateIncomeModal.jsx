import { useEffect, useRef, useState } from "react";
import API from "../services/api";

const UpdateIncomeModal = ({ isOpen, onClose, currentIncome, onUpdate }) => {
  const [income, setIncome] = useState(currentIncome);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const res = await API.put("/users/income", { income });
      onUpdate(res.data.income);
      setLoading(false);
      onClose();
    } catch (err) {
      console.error("Failed to update income:", err);
      setLoading(false);
    }
  };

  // 🔻 Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-24 right-8 z-50">
      <div
        ref={modalRef}
        className="relative bg-white shadow-lg border border-gray-200 rounded-lg p-6 w-[300px]"
      >
        {/* ❌ Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 text-lg hover:text-red-700 cursor-pointer"
        >
          <span className="text-2xl">&times;</span>
        </button>

        <h3 className="text-lg font-semibold text-gray-700 mb-3">Edit Income</h3>

        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(Number(e.target.value))}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="text-sm px-3 py-1.5 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="text-sm px-3 py-1.5 rounded bg-green-600 text-white hover:bg-green-700 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateIncomeModal;
