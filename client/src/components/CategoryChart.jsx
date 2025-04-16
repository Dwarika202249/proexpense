import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = ({ breakdown }) => {
  const colors = [
    "#34d399", "#60a5fa", "#f87171", "#fbbf24", "#a78bfa", "#fb923c", "#4ade80",
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

  return (
    <div className="bg-white p-10 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-green-700">🧁 Category-wise Distribution</h3>
      <Doughnut data={data} />
    </div>
  );
};

export default CategoryPieChart;
