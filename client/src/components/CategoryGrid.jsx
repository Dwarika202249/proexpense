const CategoryGrid = ({ breakdown }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-green-700">📊 Category Breakdown</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {breakdown.length > 0 ? (
          breakdown.map((cat, idx) => (
            <div
              key={idx}
              className="bg-white p-4 shadow rounded-lg border-l-4 border-green-500 hover:scale-105 transition-transform duration-200"
            >
              <div className="flex justify-between">
              <span className="text-xl">{getCategoryEmoji(breakdown.category)}</span>
              <div>
              <p className="text-gray-500">{cat._id}</p>
              <h4 className="text-xl font-bold text-yellow-500">₹{cat.totalAmount}</h4>
              </div>
              </div>
              
            </div>
          ))
        ) : (
          <p className="text-gray-400 col-span-full">No data found 🫤</p>
        )}
      </div>
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

export default CategoryGrid;
