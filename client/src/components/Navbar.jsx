import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
      };
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-green-600">💰 ProExpense</h1>
      <ul className="flex gap-6 text-gray-700 font-medium">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/add-expense">Add</Link></li>
        <li><Link to="/all-expenses">All</Link></li>
        <li onClick={handleLogout} className="bg-white text-green-600 px-3 py-1 rounded hover:bg-green-100 cursor-pointer">Logout</li>
      </ul>
    </nav>
  );
};

export default Navbar;
