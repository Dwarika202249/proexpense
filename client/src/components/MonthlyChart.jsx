import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

// 🔥 Month names array for mapping
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const MonthlyChart = ({ stats }) => {
  const data = {
    labels: stats.map((item) => MONTH_NAMES[item._id - 1]), // 🧠 converting 1-12 -> Jan-Dec
    datasets: [
      {
        label: "Monthly Expenses",
        data: stats.map((item) => item.totalAmount),
        fill: false,
        borderColor: "rgb(34, 197, 94)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-green-700">📈 Monthly Expenses</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default MonthlyChart;
