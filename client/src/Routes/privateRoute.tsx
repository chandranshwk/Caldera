import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

interface PrivateRouteProps {
  darkMode: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ darkMode }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/auth" replace />;

  return (
    <div
      className={`flex w-screen h-screen overflow-hidden ${darkMode ? "bg-[#0b0b0d]" : "bg-[#f0f0f0]"}`}
    >
      {/* Sidebar is now global for all protected routes */}
      <Sidebar darkMode={darkMode} />

      <main className="flex-1 h-screen overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateRoute;
