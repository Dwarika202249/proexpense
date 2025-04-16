const RecentExpenses = ({ expenses }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-green-700">Recent Expenses</h3>

      {expenses.length === 0 ? (
        <p className="text-gray-500">No recent expenses found.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {expenses.map((expense) => (
            <li key={expense._id} className="py-3 flex justify-between items-start gap-4">
              {/* LEFT SIDE: Emoji + Title + Date */}
              <div className="flex items-start gap-3">
                <span className="text-xl">{getCategoryEmoji(expense.category)}</span>
                <div>
                  <p className="text-md font-medium text-gray-800 capitalize">{expense.title}</p>
                  <p className="text-sm text-gray-500">{new Date(expense.date).toDateString()}</p>
                </div>
              </div>

              {/* RIGHT SIDE: Amount + Category */}
              <div className="text-right">
                <p className="font-semibold text-red-600">- ₹{expense.amount}</p>
                <p className="text-xs text-gray-400">{expense.category}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ✨ Emoji helper
const getCategoryEmoji = (category) => {
  const emojis = {
    Food: "🍕",
    Travel: "🚌",
    Entertainment: "📱",
    Shopping: "🛍️",
    Bills: "💡",
    Other: "💸",
  };
  return emojis[category] || "💰";
};

export default RecentExpenses;
