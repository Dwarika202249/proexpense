import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // 🔥 Active class logic
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-green-600 font-semibold border-b-2 border-green-600 pb-1"
      : "hover:text-green-600";

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <NavLink to="/" className="text-xl font-bold text-green-600">
        💰 ProExpense
      </NavLink>

      <ul className="flex gap-6 text-gray-700 font-medium">
        {token ? (
          <>
            <li>
              <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/add-expense" className={navLinkClass}>Add</NavLink>
            </li>
            <li>
              <NavLink to="/all-expenses" className={navLinkClass}>All</NavLink>
            </li>
            <li
              onClick={handleLogout}
              className="bg-white text-green-600 px-3 py-1 rounded hover:bg-green-100 cursor-pointer"
            >
              Logout
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login" className={navLinkClass}>Login</NavLink>
            </li>
            <li>
              <NavLink to="/register" className={navLinkClass}>Register</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
