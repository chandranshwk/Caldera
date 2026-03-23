import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

interface PrivateRouteProps {
  darkMode: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ darkMode }) => {
  const token = localStorage.getItem("token");

  return token ? (
    <div
      className={`flex w-screen min-h-screen ${darkMode ? "bg-[#000000d4]" : "bg-[#f0f0f0]"}]`}
    >
      <Sidebar darkMode={darkMode} />
      {/* flex-1 expands to fill all space not taken by Sidebar */}
      <main className="flex-1 h-screen overflow-auto">
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate to={"/auth"} replace />
  );
};

export default PrivateRoute;
