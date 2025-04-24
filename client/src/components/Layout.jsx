import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <main className="p-6 bg-gray-100 min-h-screen">
        <Outlet /> {/* ✅ This renders Dashboard, AddExpense etc. */}
      </main>
    </>
  );
};

export default Layout;
