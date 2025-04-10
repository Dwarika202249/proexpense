import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AddExpensePage from "./pages/AddExpensePage";
import AllExpensesPage from "./pages/AllExpensesPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Layout routes */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/add-expense" element={<AddExpensePage />} />
          <Route path="/all-expenses" element={<AllExpensesPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
