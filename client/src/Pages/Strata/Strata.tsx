import type { User } from "@supabase/supabase-js";
import { Outlet, Link, useLocation } from "react-router-dom";

interface Props {
  darkMode: boolean;
  user: User;
}

const Strata: React.FC<Props> = ({ darkMode, user }) => {
  const location = useLocation();

  const pathParts = location.pathname.split("/").filter(Boolean);
  const currentPage = pathParts[pathParts.length - 1] || "Dashboard";
  const formattedPage =
    currentPage.charAt(0).toUpperCase() + currentPage.slice(1);

  const isNewPage = location.pathname.includes("/new");

  return (
    <div
      className={`h-screen w-full transition-colors duration-300 border-l flex flex-col overflow-hidden ${
        darkMode
          ? "bg-[#18181b] border-slate-800 text-slate-100"
          : "bg-white border-slate-200 text-slate-900"
      }`}
    >
      {!isNewPage && (
        <div
          className={`flex border-b justify-between transition-colors p-8 pt-5 mb-5 pb-4 ${
            darkMode ? "border-slate-800" : "border-slate-100"
          }`}
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Link
                to="/strata/dashboard"
                className={`text-lg font-semibold ${darkMode ? "text-slate-500 hover:text-slate-400" : "text-slate-400 hover:text-slate-500"}`}
              >
                The Strata
              </Link>
              <span
                className={`text-lg font-light ${darkMode ? "text-slate-700" : "text-slate-200"}`}
              >
                /
              </span>
              <h1
                className={`text-lg font-bold tracking-tight ${darkMode ? "text-white" : "text-slate-900"}`}
              >
                {formattedPage}
              </h1>
            </div>
            <p
              className={`text-[11px] mt-1 font-medium uppercase tracking-wider ${darkMode ? "text-slate-600" : "text-slate-400"}`}
            >
              Spatial Brainstorming & Ideation
            </p>
          </div>
          <span
            className={`text-[12px] mt-4 uppercase tracking-tighter font-bold ${darkMode ? "text-slate-700" : "text-slate-300"}`}
          >
            V 1.0.4
          </span>
        </div>
      )}

      <div
        className={`flex-1 relative w-full h-full ${
          isNewPage
            ? "overflow-hidden"
            : "overflow-auto px-8 animate-in fade-in slide-in-from-bottom-2 duration-500"
        }`}
      >
        <Outlet context={{ user, darkMode }} />
      </div>
    </div>
  );
};

export default Strata;
