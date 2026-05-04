import type { User } from "@supabase/supabase-js";
import { Outlet, Link, useLocation } from "react-router-dom";
import { ALL_BACKGROUNDS, type Background } from "../../assets/BGEcho_O.tsx";
import { useEffect, useState } from "react";

interface Props {
  darkMode: boolean;
  user: User;
}

const ECHO_O: React.FC<Props> = ({ darkMode, user }) => {
  console.log(user.email);
  const location = useLocation();

  // Logic to extract the sub-page name for the breadcrumb
  const pathParts = location.pathname.split("/").filter(Boolean);
  const currentPage = pathParts[pathParts.length - 1] || "Settings";
  const formattedPage =
    currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
  const [selectedBg, setSelectedBg] = useState<Background>(() => {
    const saved = localStorage.getItem("selected-bg");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return ALL_BACKGROUNDS[0];
      }
    }
    return ALL_BACKGROUNDS[0];
  });

  // Inside ECHO_O.tsx (or your main layout)
  useEffect(() => {
    //FIXED: CHANGES NOT REFLECTING
    // 1. Define the event as a CustomEvent to avoid 'any'
    // 2. Use 'event' instead of 'e' (or just remove the name if unused)
    const handleThemeChange = (event: Event) => {
      const customEvent = event as CustomEvent<Background>;
      if (customEvent.detail) {
        setSelectedBg(customEvent.detail);
      }
    };

    window.addEventListener("theme-change", handleThemeChange);
    return () => window.removeEventListener("theme-change", handleThemeChange);
  }, [setSelectedBg]);

  // 2. Save to localStorage whenever selectedBg changes
  useEffect(() => {
    localStorage.setItem("selected-bg", JSON.stringify(selectedBg));
  }, [selectedBg]);

  return (
    <div
      className={`h-screen w-full flex flex-col transition-colors duration-300 border-l ${
        darkMode
          ? "bg-[#18181b] border-slate-800 text-slate-100"
          : "bg-white border-slate-200 text-slate-900"
      } ${
        location.pathname === "/ECHO_O/settings" ? "pt-5 pb-4 pr-1 px-4" : "p-0"
      }`}
    >
      {/* Header Section */}
      {/* Breadcrumb Navigation */}
      {location.pathname === "/ECHO_O/settings" && (
        <div
          className={`flex mb-2 border-b text-sm justify-between pb-2 transition-colors ${
            darkMode ? "border-slate-800" : "border-slate-100"
          }`}
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              {/* Root Link (Muted) */}
              <Link
                to="/ECHO_O/settings"
                className={`font-semibold transition-colors ${
                  darkMode
                    ? "text-slate-500 hover:text-slate-400"
                    : "text-slate-400 hover:text-slate-500"
                }`}
              >
                The ECHO_O
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
        <Outlet context={{ user, darkMode, selectedBg, setSelectedBg }} />
      </div>
    </div>
  );
};

export default ECHO_O;
