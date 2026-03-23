import { Outlet, Link, useLocation } from "react-router-dom";

interface Props {
  darkMode: boolean;
}

const Canvas: React.FC<Props> = ({ darkMode }) => {
  const location = useLocation();

  // Logic to extract the sub-page name for the breadcrumb (e.g., "dashboard" -> "Dashboard")
  const pathParts = location.pathname.split("/").filter(Boolean);
  const currentPage = pathParts[pathParts.length - 1] || "Dashboard";
  const formattedPage =
    currentPage.charAt(0).toUpperCase() + currentPage.slice(1);

  return (
    <div
      className={`h-screen w-full p-8 pt-5 transition-colors duration-300 border-l flex flex-col ${
        darkMode
          ? "bg-slate-900 border-slate-800 text-slate-100"
          : "bg-white border-slate-200 text-slate-900"
      }`}
    >
      <div
        className={`flex mb-5 border-b justify-between pb-4 transition-colors ${
          darkMode ? "border-slate-800" : "border-slate-100"
        }`}
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            {/* Root Link (Always Muted) */}
            <Link
              to="/canvas/dashboard"
              className={`text-lg font-semibold transition-colors ${
                darkMode
                  ? "text-slate-500 hover:text-slate-400"
                  : "text-slate-400 hover:text-slate-500"
              }`}
            >
              The Canvas
            </Link>

            <span
              className={`text-lg font-light ${darkMode ? "text-slate-700" : "text-slate-200"}`}
            >
              /
            </span>

            {/* Dashboard Logic */}
            {formattedPage === "Dashboard" ? (
              // If we are ON the dashboard, it is the active Bold title
              <h1
                className={`text-lg font-bold tracking-tight ${darkMode ? "text-white" : "text-slate-900"}`}
              >
                Dashboard
              </h1>
            ) : (
              // If we are deeper, Dashboard becomes a muted link
              <>
                <Link
                  to="/canvas/dashboard"
                  className={`text-lg font-semibold transition-colors ${
                    darkMode
                      ? "text-slate-500 hover:text-slate-400"
                      : "text-slate-400 hover:text-slate-500"
                  }`}
                >
                  Dashboard
                </Link>

                <span
                  className={`text-lg font-light ${darkMode ? "text-slate-700" : "text-slate-200"}`}
                >
                  /
                </span>

                {/* The Sub-page is now the Bold title */}
                <h1
                  className={`text-lg font-bold tracking-tight ${darkMode ? "text-white" : "text-slate-900"}`}
                >
                  {formattedPage}
                </h1>
              </>
            )}
          </div>

          <p
            className={`text-[11px] mt-1 font-medium uppercase tracking-wider ${
              darkMode ? "text-slate-600" : "text-slate-400"
            }`}
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

      {/* Main Content Render Area */}
      <div className="flex-1 overflow-auto canvas-content-area animate-in fade-in duration-500">
        <Outlet />
      </div>
    </div>
  );
};

export default Canvas;
