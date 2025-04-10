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
              <p className="text-gray-500">{cat._id}</p>
              <h4 className="text-xl font-bold text-green-700">₹{cat.totalAmount}</h4>
            </div>
          ))
        ) : (
          <p className="text-gray-400 col-span-full">No data found 🫤</p>
        )}
      </div>
    </div>
  );
};

export default CategoryGrid;
