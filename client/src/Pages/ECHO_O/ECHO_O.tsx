import { Outlet, Link, useLocation } from "react-router-dom";
import { ALL_BACKGROUNDS, type Background } from "../../assets/BGEcho_O.tsx";
import { useEffect, useMemo, useState } from "react";
import Search from "./Search.tsx";
import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid";
import type { User } from "@supabase/supabase-js";

interface Props {
  darkMode: boolean;
  user: User;
}

export interface UserP {
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
  users: UserP[];
}

const ECHO_O: React.FC<Props> = ({ darkMode, user }) => {
  const location = useLocation();
  const [openSearch, setOpenSearch] = useState<boolean>(false);

  // Extract page names for breadcrumbs
  const pathParts = location.pathname.split("/").filter(Boolean);
  const currentPage = pathParts[pathParts.length - 1] || "Settings";
  const formattedPage =
    currentPage.charAt(0).toUpperCase() + currentPage.slice(1);

  // Initialize selected background
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

  // CRITICAL FIX 1: Global shortcut listener placed in layout
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.code === "KeyM" && e.ctrlKey) {
        e.preventDefault();
        setOpenSearch((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown, true);
    return () =>
      window.removeEventListener("keydown", handleGlobalKeyDown, true);
  }, []);

  // Sync theme changes from custom application events
  useEffect(() => {
    const handleThemeChange = (event: Event) => {
      const customEvent = event as CustomEvent<Background>;
      if (customEvent.detail) {
        setSelectedBg(customEvent.detail);
      }
    };
    window.addEventListener("theme-change", handleThemeChange);
    return () => window.removeEventListener("theme-change", handleThemeChange);
  }, []);

  // Save selection states to disk
  useEffect(() => {
    localStorage.setItem("selected-bg", JSON.stringify(selectedBg));
  }, [selectedBg]);

  // Generate mockup search items
  const messegers = useMemo(() => {
    faker.seed(123);
    const generateUser = (): UserP => ({
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
      } ${location.pathname === "/ECHO_O/settings" ? "pt-5 pb-4 pr-1 px-4" : "p-0"}`}
    >
      {openSearch && (
        <Search
          darkMode={darkMode}
          setSearchOpen={setOpenSearch}
          contacts={messegers}
        />
      )}

      {/* Breadcrumb Navigation */}
      {location.pathname === "/ECHO_O/settings" && (
        <div
          className={`flex mb-2 border-b text-sm justify-between pb-2 transition-colors ${darkMode ? "border-slate-800" : "border-slate-100"}`}
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Link
                to="/ECHO_O/settings"
                className={`font-semibold transition-colors ${darkMode ? "text-slate-500 hover:text-slate-400" : "text-slate-400 hover:text-slate-500"}`}
              >
                The ECHO_O
              </Link>
              <span
                className={`font-light ${darkMode ? "text-slate-700" : "text-slate-200"}`}
              >
                {" "}
                /{" "}
              </span>
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
      {/* CRITICAL FIX 2: Removed layout-breaking whitespace text element */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Outlet
          context={{ user, darkMode, selectedBg, setSelectedBg, messegers }}
        />
      </div>
    </div>
  );
};

export default ECHO_O;
