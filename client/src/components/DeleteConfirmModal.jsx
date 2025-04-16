// src/components/DeleteConfirmModal.jsx
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, expenseTitle }) => {
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
  
          <h3 className="text-xl font-semibold text-red-600 mb-4">Delete Expense</h3>
          <p className="text-gray-700">
            Are you sure you want to delete <span className="font-medium text-black">"{expenseTitle}"</span>?
          </p>
  
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DeleteConfirmModal;
  