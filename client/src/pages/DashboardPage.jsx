// src/pages/DashboardPage.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import SummaryBox from "../components/SummaryBox";
import CategoryGrid from "../components/CategoryGrid";
import RecentExpenses from "../components/RecentExpenses";
import MonthlyChart from "../components/MonthlyChart";
import CategoryChart from "../components/CategoryChart";
import UpdateIncomeModal from "../components/UpdateIncomeModal";

const DashboardPage = () => {
  const [summary, setSummary] = useState(null);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [income, setIncome] = useState(0);

  const fetchDashboardData = async () => {
    try {
      const [summaryRes, monthlyRes, allExpensesRes, userRes] = await Promise.all([
        API.get("/expenses/summary"),
        API.get("/expenses/monthly"),
        API.get("/expenses"), // for recent expenses
        API.get("/users/me"), // Get user data including income
      ]);

      setSummary(summaryRes.data);
      setMonthlyStats(monthlyRes.data);
      setRecentExpenses(allExpensesRes.data.slice(0, 5)); // latest 5
      setIncome(userRes.data.income);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // const handleIncomeUpdate = async () => {
  //   const newIncome = prompt("Enter your new income:", income);
  //   if (newIncome && !isNaN(newIncome)) {
  //     try {
  //       const res = await API.put("/users/income", { income: Number(newIncome) });
  //       setIncome(res.data.income);
  //     } catch (err) {
  //       console.error("Failed to update income:", err);
  //     }
  //   }
  // };

  const handleIncomeUpdate = (newIncome) => {
    setIncome(newIncome);
  };

  if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-700">Welcome back, DK! 👋</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
        >
          ✏️ Edit Income
        </button>
      </div>

      <SummaryBox total={summary.totalSpent} income={income} />

      <CategoryGrid breakdown={summary.categoryBreakdown} />
      <RecentExpenses expenses={recentExpenses} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MonthlyChart stats={monthlyStats} />
        <CategoryChart breakdown={summary.categoryBreakdown} />
      </div>

      {/* 💸 Update Income Modal */}
      <UpdateIncomeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentIncome={income}
        onUpdate={handleIncomeUpdate}
      />
    </div>
  );
};

export default DashboardPage;
