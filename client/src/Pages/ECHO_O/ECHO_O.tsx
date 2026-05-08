import { Outlet, Link, useLocation } from "react-router-dom";
import { ALL_BACKGROUNDS, type Background } from "../../assets/BGEcho_O.tsx";
import { useEffect, useMemo, useState } from "react";
import Search from "./Search.tsx";
import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid";

interface Props {
  darkMode: boolean;
  user: User;
}
export interface User {
  type: "user";
  id: string;
  name: string;
  dp: string;
}

export interface Group {
  type: "group";
  id: string;
  name: string;
  dp: string;
  users: User[];
}

const ECHO_O: React.FC<Props> = ({ darkMode, user }) => {
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

  const [openSearch, setOpenSearch] = useState<boolean>(false);

  const messegers = useMemo(() => {
    faker.seed(123);
    const generateUser = (): User => ({
      type: "user",
      id: uuid(),
      name: faker.person.firstName(),
      dp: faker.image.personPortrait(),
    });

    return Array.from({ length: 65 }, () =>
      faker.number.int({ min: 1, max: 10 }) > 5
        ? generateUser()
        : ({
            type: "group",
            id: uuid(),
            name: faker.color.human(),
            dp: faker.image.avatarGitHub(),
            users: Array.from(
              { length: faker.number.int({ min: 1, max: 5 }) },
              () => generateUser(),
            ),
          } as Group),
    );
  }, []);

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
      {openSearch && <Search darkMode={darkMode} setSearch={setOpenSearch} />}
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
        <Outlet
          context={{ user, darkMode, selectedBg, setSelectedBg, messegers }}
        />
      </div>
    </div>
  );
};

export default ECHO_O;
