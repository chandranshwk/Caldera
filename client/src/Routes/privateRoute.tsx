import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  return token ? (
    <div className="flex w-screen min-h-screen bg-slate-50">
      <Sidebar />
      {/* flex-1 expands to fill all space not taken by Sidebar */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate to={"/auth"} replace />
  );
};

export default PrivateRoute;
