// src/components/SummaryBox.jsx
const SummaryBox = ({ total, income}) => {
  const balance = income - total;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white shadow rounded-lg p-5 border-l-4 border-green-500">
        <p className="text-gray-500">Total Income</p>
        <h3 className="text-xl font-bold text-green-700">₹{income.toLocaleString()}</h3>
      </div>
      <div className="bg-white shadow rounded-lg p-5 border-l-4 border-red-500">
        <p className="text-gray-500">Total Expenses</p>
        <h3 className="text-xl font-bold text-red-600">₹{total.toLocaleString()}</h3>
      </div>
      <div className="bg-white shadow rounded-lg p-5 border-l-4 border-blue-500">
        <p className="text-gray-500">Balance</p>
        <h3 className="text-xl font-bold text-blue-600">₹{balance.toLocaleString()}</h3>
      </div>
    </div>
  );
};

export default SummaryBox;
