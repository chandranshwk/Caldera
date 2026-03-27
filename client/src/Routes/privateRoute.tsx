import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import type { User } from "@supabase/supabase-js";

interface PrivateRouteProps {
  darkMode: boolean;
  user: User; // Add user prop here
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ darkMode, user }) => {
  const token = localStorage.getItem("token");

  // If no token, bounce to login
  if (!token) return <Navigate to="/auth" replace />;

  return (
    <div
      className={`flex w-screen h-screen overflow-hidden ${
        darkMode ? "bg-[#0b0b0d]" : "bg-[#f0f0f0]"
      }`}
    >
      {/* Pass user to Sidebar if it needs to show the name/avatar */}
      <Sidebar darkMode={darkMode} user={user} />

      <main className="flex-1 h-screen overflow-auto">
        {/* 'context' makes the user object available to any component inside the Outlet */}
        <Outlet context={{ user, darkMode }} />
      </main>
    </div>
  );
};

export default PrivateRoute;
