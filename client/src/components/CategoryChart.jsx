import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = ({ breakdown, month }) => {
  const colors = [
    "#34d399",
    "#60a5fa",
    "#f87171",
    "#fbbf24",
    "#a78bfa",
    "#fb923c",
    "#4ade80",
  ];

  const data = {
    labels: breakdown.map((item) => item._id),
    datasets: [
      {
        label: "Expense by Category",
        data: breakdown.map((item) => item.totalAmount),
        backgroundColor: colors,
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  // 💡 Format month string from "2025-04" to "April 2025"
  const formatMonthName = (monthStr) => {
    if (!monthStr) return "";
    const [year, month] = monthStr.split("-");
    const date = new Date(`${month}/01/${year}`);
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-green-700">
        🧁 Category-wise Distribution{" "}
        {month && (
          <span className="text-green-700">({formatMonthName(month)})</span>
        )}
      </h3>
      {breakdown.length > 0 ? (
        <Doughnut data={data} />
      ) : (
        <p className="text-gray-400 col-span-full">No data found 🫤</p>
      )}
    </div>
  );
};

export default CategoryPieChart;
