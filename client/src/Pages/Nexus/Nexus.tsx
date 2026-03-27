import { Outlet, Link, useLocation } from "react-router-dom";

interface Props {
  darkMode: boolean;
}

const Nexus: React.FC<Props> = ({ darkMode }) => {
  const location = useLocation();

  // Logic to extract the sub-page name for the breadcrumb
  const pathParts = location.pathname.split("/").filter(Boolean);
  const currentPage = pathParts[pathParts.length - 1] || "Dashboard";
  const formattedPage =
    currentPage.charAt(0).toUpperCase() + currentPage.slice(1);

  return (
    <div
      className={`h-screen w-full p-8 pt-5 transition-colors duration-300 border-l flex flex-col ${
        darkMode
          ? "bg-[#18181b] border-slate-800 text-slate-100"
          : "bg-white border-slate-200 text-slate-900"
      }`}
    >
      {/* Header Section */}
      <div
        className={`flex mb-5 border-b justify-between pb-4 transition-colors ${
          darkMode ? "border-slate-800" : "border-slate-100"
        }`}
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            {/* Root Link (Muted) */}
            <Link
              to="/forge/dashboard"
              className={`text-lg font-semibold transition-colors ${
                darkMode
                  ? "text-slate-500 hover:text-slate-400"
                  : "text-slate-400 hover:text-slate-500"
              }`}
            >
              The Nexus
            </Link>

            <span
              className={`text-lg font-light ${darkMode ? "text-slate-700" : "text-slate-200"}`}
            >
              /
            </span>

            {/* Dynamic Breadcrumb Logic */}

            <h1
              className={`text-lg font-bold tracking-tight ${darkMode ? "text-white" : "text-slate-900"}`}
            >
              {formattedPage}
            </h1>
          </div>

          <p
            className={`text-[11px] mt-1 font-medium uppercase tracking-wider ${
              darkMode ? "text-slate-600" : "text-slate-400"
            }`}
          >
            Project Management & Task Orchestration
          </p>
        </div>

        {/* Version Indicator */}
        <span
          className={`text-[12px] mt-4 uppercase tracking-tighter font-bold ${
            darkMode ? "text-slate-700" : "text-slate-300"
          }`}
        >
          V 1.0.4
        </span>
      </div>

      {/* Content Injection Point */}
      <div className="flex-1 overflow-auto forge-content-area animate-in fade-in slide-in-from-bottom-2 duration-500">
        <Outlet />
      </div>
    </div>
  );
};

export default Nexus;
