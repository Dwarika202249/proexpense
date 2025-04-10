// src/pages/DashboardPage.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import SummaryBox from "../components/SummaryBox";
import CategoryGrid from "../components/CategoryGrid";
import RecentExpenses from "../components/RecentExpenses";
import MonthlyChart from "../components/MonthlyChart";
import CategoryChart from "../components/CategoryChart";

const DashboardPage = () => {
  const [summary, setSummary] = useState(null);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const [summaryRes, monthlyRes, allExpensesRes] = await Promise.all([
        API.get("/expenses/summary"),
        API.get("/expenses/monthly"),
        API.get("/expenses"), // for recent expenses
      ]);

      setSummary(summaryRes.data);
      setMonthlyStats(monthlyRes.data);
      setRecentExpenses(allExpensesRes.data.slice(0, 5)); // latest 5
      setLoading(false);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-green-700">
        Welcome back, DK! 👋
      </h2>

      {/* Summary Section */}
      <SummaryBox total={summary.totalSpent} />

      {/* Category Grid */}
      <CategoryGrid breakdown={summary.categoryBreakdown} />

      {/* Recent Expenses */}
      <RecentExpenses expenses={recentExpenses} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MonthlyChart stats={monthlyStats} />
        <CategoryChart breakdown={summary.categoryBreakdown} />
      </div>
    </div>
  );
};

export default DashboardPage;
