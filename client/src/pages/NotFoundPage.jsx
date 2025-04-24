import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <h1 className="text-6xl font-bold text-green-600 mb-4">404</h1>
      <p className="text-2xl font-semibold text-gray-700 mb-2">
        Oops! Page Not Found
      </p>
      <p className="text-gray-500 mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
