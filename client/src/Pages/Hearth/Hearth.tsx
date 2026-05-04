import type { User } from "@supabase/supabase-js";
import { Outlet, Link, useLocation } from "react-router-dom";

interface Props {
  darkMode: boolean;
  user: User;
}

const Hearth: React.FC<Props> = ({ darkMode, user }) => {
  console.log(user.email);
  const location = useLocation();

  // Logic to extract the sub-page name for the breadcrumb
  const pathParts = location.pathname.split("/").filter(Boolean);
  const currentPage = pathParts[pathParts.length - 1] || "Settings";
  const formattedPage =
    currentPage.charAt(0).toUpperCase() + currentPage.slice(1);

  return (
    <div
      className={`h-screen w-full flex flex-col transition-colors duration-300 border-l ${
        darkMode
          ? "bg-[#18181b] border-slate-800 text-slate-100"
          : "bg-white border-slate-200 text-slate-900"
      } ${
        location.pathname === "/hearth/settings" ? "pt-5 pb-4 pr-1 px-4" : "p-0"
      }`}
    >
      {/* Header Section */}
      {/* Breadcrumb Navigation */}
      {location.pathname === "/hearth/settings" && (
        <div
          className={`flex mb-2 border-b text-sm justify-between pb-2 transition-colors ${
            darkMode ? "border-slate-800" : "border-slate-100"
          }`}
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              {/* Root Link (Muted) */}
              <Link
                to="/hearth/settings"
                className={`font-semibold transition-colors ${
                  darkMode
                    ? "text-slate-500 hover:text-slate-400"
                    : "text-slate-400 hover:text-slate-500"
                }`}
              >
                The Hearth
              </Link>

              <span
                className={`font-light ${darkMode ? "text-slate-700" : "text-slate-200"}`}
              >
                /
              </span>

              {/* Dynamic Breadcrumb Logic */}

              <h1
                className={`font-bold tracking-tight ${darkMode ? "text-white" : "text-slate-900"}`}
              >
                {formattedPage}
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* Content Injection Point */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {" "}
        {/* Changed overflow-auto to hidden to prevent double scrollbars */}
        <Outlet context={{ user, darkMode }} />
      </div>
    </div>
  );
};

export default Hearth;
