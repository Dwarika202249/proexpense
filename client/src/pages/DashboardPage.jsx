// // src/pages/DashboardPage.jsx
// import { useEffect, useState } from "react";
// import API from "../services/api";
// import SummaryBox from "../components/SummaryBox";
// import CategoryGrid from "../components/CategoryGrid";
// import RecentExpenses from "../components/RecentExpenses";
// import MonthlyChart from "../components/MonthlyChart";
// import CategoryChart from "../components/CategoryChart";
// import UpdateIncomeModal from "../components/UpdateIncomeModal";

// const DashboardPage = () => {
//   const [summary, setSummary] = useState(null);
//   const [monthlyStats, setMonthlyStats] = useState([]);
//   const [recentExpenses, setRecentExpenses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [income, setIncome] = useState(0);

//   const fetchDashboardData = async () => {
//     try {
//       const [summaryRes, monthlyRes, allExpensesRes, userRes] = await Promise.all([
//         API.get("/expenses/summary"),
//         API.get("/expenses/monthly"),
//         API.get("/expenses"), // for recent expenses
//         API.get("/users/me"), // Get user data including income
//       ]);

//       setSummary(summaryRes.data);
//       setMonthlyStats(monthlyRes.data);
//       setRecentExpenses(allExpensesRes.data.slice(0, 5)); // latest 5
//       setIncome(userRes.data.income);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching dashboard data:", err);
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);


//   const handleIncomeUpdate = (newIncome) => {
//     setIncome(newIncome);
//   };

//   if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;

//   return (
//     <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-green-700">Welcome back, DK! 👋</h2>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
//         >
//           ✏️ Edit Income
//         </button>
//       </div>

//       <SummaryBox total={summary.totalSpent} income={income} />

//       <CategoryGrid breakdown={summary.categoryBreakdown} />
//       <RecentExpenses expenses={recentExpenses} />

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <MonthlyChart stats={monthlyStats} />
//         <CategoryChart breakdown={summary.categoryBreakdown} />
//       </div>

//       {/* 💸 Update Income Modal */}
//       <UpdateIncomeModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         currentIncome={income}
//         onUpdate={handleIncomeUpdate}
//       />
//     </div>
//   );
// };

// export default DashboardPage;


import { useEffect, useState } from "react";
import API from "../services/api";
import SummaryBox from "../components/SummaryBox";
import CategoryGrid from "../components/CategoryGrid";
import RecentExpenses from "../components/RecentExpenses";
import MonthlyChart from "../components/MonthlyChart";
import CategoryChart from "../components/CategoryChart";
import MonthlyIncomeCard from "../components/MonthlyIncomeCard";
import { getCurrentMonth } from "../utils/dateUtils";
import { fetchMonthlyIncome } from "../services/incomeApi";

const DashboardPage = () => {
  const [summary, setSummary] = useState(null);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [income, setIncome] = useState(0);
  const [month, setMonth] = useState(getCurrentMonth());

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [summaryRes, monthlyRes, allExpensesRes] = await Promise.all([
        API.get(`/expenses/summary?month=${month}`),
        API.get("/expenses/monthly"),
        API.get(`/expenses?month=${month}`),
      ]);

      const incomeRes = await fetchMonthlyIncome(month);

      setSummary(summaryRes.data);
      setMonthlyStats(monthlyRes.data);
      setRecentExpenses(allExpensesRes.data.slice(0, 5));
      setIncome(incomeRes.amount || 0);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [month]);

  if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-700">Welcome back, DK! 👋</h2>
      </div>

      {/* 🔁 Monthly Income + Month Picker */}
      <MonthlyIncomeCard
        month={month}
        setMonth={setMonth}
        income={income}
        setIncome={setIncome}
      />

      {/* ✅ Month-based Summary */}
      <SummaryBox total={summary.totalSpent} income={income} />

      {/* ✅ Month-based Category Breakdown */}
      <CategoryGrid breakdown={summary.categoryBreakdown} month={month} />

      {/* ✅ Month-based Recent Expenses */}
      <RecentExpenses expenses={recentExpenses} />

      {/* ✅ Charts (monthly trend + current month pie) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MonthlyChart stats={monthlyStats} />
        <CategoryChart breakdown={summary.categoryBreakdown} month={month} />
      </div>
    </div>
  );
};

export default DashboardPage;
