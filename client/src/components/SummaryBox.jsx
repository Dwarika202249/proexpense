const SummaryBox = ({ total = 0, income = 0 }) => {
  const totalIncome = Number(income) || 0;
  const totalExpenses = Number(total) || 0;
  const balance = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white shadow rounded-lg p-5 border-l-4 border-green-500">
        <p className="text-gray-500">Total Income</p>
        <h3 className="text-xl font-bold text-green-700">
          ₹{totalIncome.toLocaleString()}
        </h3>
      </div>

      <div className="bg-white shadow rounded-lg p-5 border-l-4 border-red-500">
        <p className="text-gray-500">Total Expenses</p>
        <h3 className="text-xl font-bold text-red-600">
          ₹{totalExpenses.toLocaleString()}
        </h3>
      </div>

      <div className="bg-white shadow rounded-lg p-5 border-l-4 border-blue-500">
        <p className="text-gray-500">Balance</p>
        <h3
          className={`text-xl font-bold ${
            balance >= 0 ? "text-blue-600" : "text-red-600"
          }`}
        >
          ₹{balance.toLocaleString()}
        </h3>
      </div>
    </div>
  );
};

export default SummaryBox;
