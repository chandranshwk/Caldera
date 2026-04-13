import { useEffect, useState } from "react";
import { BiCheckSquare, BiChevronDown, BiMessageSquare } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { FiEdit3, FiLayers } from "react-icons/fi";
import { getInitials } from "../assets/functions";
import {
  useLocation,
  useNavigate,
  type NavigateFunction,
} from "react-router-dom";
import type { MenuItem } from "./Dropdown";
import { IoIosArrowForward } from "react-icons/io";
import Dropdown from "./Dropdown";
import type { User } from "@supabase/supabase-js";
import ProjectIcon from "./ProjectIcon";

interface SidebarProps {
  darkMode: boolean;
  user: User;
}

const Sidebar: React.FC<SidebarProps> = ({ darkMode, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const fullName = user?.user_metadata?.full_name || "User";
  const email = user?.email;
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const navigate = useNavigate();

  const NAVITEMS = [
    {
      label: "Grifty",
      color: "from-indigo-500 to-purple-600",
      link: "/project/grifty",
    },
    {
      label: "Llama TB",
      color: "from-emerald-500 to-teal-800",
      link: "/project/llamatb",
    },
    {
      label: "Caldera",
      color: "from-orange-400 to-rose-500",
      link: "/project/caldera",
    },
    {
      label: "Samridh",
      color: "from-blue-500 to-cyan-500",
      link: "/project/samridh",
    },
  ];

  const PAGES = [
    {
      icon: <FiEdit3 size={22} />,
      label: "The Forge",
      subLinks: [
        { name: "Dashboard", link: "/forge/dashboard" },
        { name: "Documents", link: "/forge/docs" },
        { name: "Sheets", link: "/forge/sheets" },
        { name: "Pdfs", link: "/forge/pdfs" },
      ],
    },
    {
      icon: <BiCheckSquare size={22} />,
      label: "The Nexus",
      subLinks: [
        { name: "Dashboard", link: "/nexus/dashboard" },
        { name: "Manage Tasks", link: "/nexus/manage" },
        { name: "Calendar", link: "/nexus/calendar" },
      ],
    },
    {
      icon: <BiMessageSquare size={22} />,
      label: "The Hearth",
      subLinks: [
        { name: "Dashboard", link: "/hearth/dashboard" }, // Added for consistency
        { name: "Personal", link: "/hearth/personal" },
        { name: "Channels", link: "/hearth/channels" },
      ],
    },
    {
      icon: <FiLayers size={22} />,
      label: "The Strata",
      subLinks: [
        { name: "Dashboard", link: "/Strata/dashboard" },
        { name: "New", link: "/Strata/new" },
      ],
    },
  ];

  const [currentSite, setCurrentSide] = useState<{
    name: string;
    icon: React.ReactNode;
  }>({ name: "Caldera", icon: null }); // Set a safe initial state

  const location = useLocation();

  useEffect(() => {
    const pathParts = location.pathname.split("/");

    // 1. Check if we are in a project route (e.g., /project/grifty)
    if (location.pathname.startsWith("/project") && pathParts[2]) {
      const projectId = pathParts[2];

      // Find the matching item in NAVITEMS to get its specific color
      const matchedProject = NAVITEMS.find(
        (item) => item.link === `/project/${projectId}`,
      );

      if (matchedProject) {
        setCurrentSide({
          name: matchedProject.label,
          icon: (
            <div
              className={`h-8 w-8 rounded-full hover:scale-110 relative shrink-0 size-5 transition-transform duration-300 group-hover:scale-110 border bg-linear-to-br ${matchedProject.color} p-px rounded-full flex items-center justify-center shadow-lg shadow-orange-500/10`}
            />
          ),
        });
        return; // Exit early if found
      }
    }

    // 2. Default Fallback (Caldera)
    setCurrentSide({
      name: "Caldera",
      icon: (
        <img
          src="/icon-caldera.png"
          alt="Logo"
          className={`h-8 w-8 rounded-full border transition-transform duration-300 group-hover:scale-110 relative ${
            darkMode
              ? "border-slate-700 shadow-lg"
              : "border-slate-200 shadow-sm"
          }`}
        />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, darkMode]);

  const filteredItems = NAVITEMS.filter(
    (item) => item.link !== location.pathname,
  );

  const formatProjectMenuItems = (
    items: typeof NAVITEMS,
    navigate: NavigateFunction, // Fixed the 'any' error here
    currentPath: string,
  ): MenuItem[] => {
    const filtered = items.filter((item) => item.link !== currentPath);

    // 2. Map to MenuItem interface
    const mappedItems: MenuItem[] = filtered.map((item) => ({
      label: item.label,
      icon: <ProjectIcon color={item.color} />,
      onClick: () => navigate(item.link),
      variant: "default",
    }));

    // 3. Add "Global Dashboard" if inside a project
    if (currentPath.startsWith("/project")) {
      mappedItems.push({
        label: "Global Dashboard",
        icon: (
          <img
            src="/icon-caldera.png"
            alt="Caldera"
            className="size-5 rounded-full border border-slate-700 shadow-sm"
          />
        ),
        onClick: () => navigate("/profile"),
        variant: "primary",
        separator: true,
      });
    }

    return mappedItems;
  };

  useEffect(() => {
    setOpenDialog(false);
  }, [isOpen]);

  return (
    <div className="mr-1">
      <motion.div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => {
          setIsOpen(false);
          setActiveMenu(null);
        }}
        animate={{ width: isOpen ? "240px" : "55px" }}
        /* 1. SINGLE CONTAINER: Essential for consistent animation speed */
        className={`relative h-[calc(100vh-1rem)] justify-evenly gap-2 m-2 mt-2 mx-1 flex flex-col rounded-lg transition-colors duration-300 overflow-visible z-50 border-0`}
      >
        {/* TOP SECTION: Project Switcher */}
        <div
          className={`flex items-center p-3 gap-3 h-16 shrink-0 border-b border-transparent rounded-lg ${darkMode ? "bg-[#18181b] text-white border-[#242425ab]" : "bg-white border-slate-100"}`}
        >
          <div className="relative shrink-0 flex items-center justify-center">
            {currentSite.icon}
            {darkMode && (
              <div className="absolute inset-0 bg-orange-500/10 blur-md rounded-full -z-10" />
            )}
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex-1 min-w-0 flex items-center justify-between ml-1"
              >
                <div
                  className={`font-bold tracking-tight text-sm truncate ${darkMode ? "text-slate-100" : "text-slate-900"}`}
                >
                  {currentSite.name}
                </div>

                <div className="relative mt-2">
                  <Dropdown
                    darkMode={darkMode}
                    width="w-60"
                    items={formatProjectMenuItems(
                      NAVITEMS,
                      navigate,
                      location.pathname,
                    )}
                    trigger={
                      <div
                        className={`p-1 rounded-md transition-all duration-300 cursor-pointer shadow-sm ${darkMode ? "bg-[#232326cf]" : "bg-slate-100"}  ${openDialog ? "rotate-180" : "rotate-90"}  hover:scale-110`}
                        onClick={() => setOpenDialog((prev) => !prev)}
                      >
                        <IoIosArrowForward
                          size={14}
                          className="transition-transform duration-300"
                        />
                      </div>
                    }
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* NAVIGATION BODY: Scrollable area */}
        <div
          className={`flex-1 overflow-y-auto rounded-lg overflow-x-hidden justify-between flex flex-col p-3 pt-2 custom-scrollbar ${darkMode ? "bg-[#18181b] text-white border-[#242425ab]" : "bg-white border-slate-100"}`}
        >
          <div>
            <div className="flex flex-col gap-4 mt-2">
              {/* Main Divider */}
              <div className="flex items-center h-2 pt-2 w-full px-1">
                {isOpen ? (
                  <div className="flex items-center gap-3 w-full opacity-60">
                    <hr className="flex-1 border-t border-slate-300" />
                    <span
                      className={`font-bold uppercase text-[10px] ${darkMode ? "text-white" : "text-slate-900"} tracking-widest`}
                    >
                      Main
                    </span>
                    <hr className="flex-1 border-t border-slate-300" />
                  </div>
                ) : (
                  <hr className="w-full border-slate-200" />
                )}
              </div>

              {/* PAGES Mapping */}
              {PAGES.map((item, index) => {
                const isExpanded = activeMenu === index && isOpen;

                return (
                  <div key={index} className="flex flex-col w-full">
                    <div
                      onClick={() =>
                        isOpen && setActiveMenu(isExpanded ? null : index)
                      }
                      className={`flex items-center w-full gap-4 transition-all duration-300 cursor-pointer group p-2 rounded-xl 
                  ${isOpen ? (darkMode ? "justify-start hover:bg-[#27272bd4]" : "justify-start hover:bg-slate-50") : "justify-center"}`}
                    >
                      <div
                        className={`shrink-0 ${darkMode ? "text-slate-200 group-hover:text-white" : "text-slate-600 group-hover:text-indigo-600"}`}
                      >
                        {item.icon}
                      </div>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -5 }}
                            className="flex items-center justify-between flex-1 overflow-hidden"
                          >
                            <span
                              className={`whitespace-nowrap font-semibold ${darkMode ? "text-slate-50" : "text-slate-700"} text-sm`}
                            >
                              {item.label}
                            </span>
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              className="text-slate-400"
                            >
                              <BiChevronDown size={18} />
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Submenu Logic */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden flex flex-col pl-10 mt-1 gap-1 border-l-2 border-slate-100 ml-4"
                        >
                          {item.subLinks.map((sub, sIdx) => (
                            <span
                              key={sIdx}
                              className={`text-xs font-medium py-1.5 cursor-pointer transition-colors ${darkMode ? "text-slate-100 hover:text-white/80" : "text-slate-500 hover:text-indigo-600"}`}
                              onClick={() => navigate(sub.link)}
                            >
                              {sub.name}
                            </span>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div
              className={`flex flex-col mt-4 ${isOpen ? "gap-1" : "gap-3"} justify-center item-center w-full`}
            >
              {/* Divider / Section Label */}
              <div className="flex items-center h-6 w-full">
                {isOpen ? (
                  <div className="flex items-center gap-3 w-full opacity-60">
                    <hr className="flex-1 border-t border-slate-300" />
                    <span
                      className={`font-bold uppercase text-[10px] ${darkMode ? "text-white" : "text-slate-900"} tracking-widest whitespace-nowrap`}
                    >
                      Recent Projects
                    </span>
                    <hr className="flex-1 border-t border-slate-300" />
                  </div>
                ) : (
                  <hr className="w-full border-slate-200" />
                )}
              </div>

              {/* Projects Items */}
              <div className="flex flex-col gap-1">
                {/* 1. MAP PROJECT ITEMS */}
                <div className="flex flex-col gap-1">
                  <AnimatePresence initial={false}>
                    {filteredItems.map((item) => (
                      <motion.div
                        layout // 1. CRITICAL: Smoothly slides other items into new positions
                        key={item.label} // 2. MUST use a unique ID (not index) for layout to work
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{
                          opacity: 0,
                          scale: 0.9,
                          transition: { duration: 0.15 },
                        }}
                        whileHover={{ x: isOpen ? 5 : 0 }}
                        className={`flex items-center w-full gap-4 cursor-pointer group transition-all duration-300 ${isOpen ? "justify-start px-2 py-1.5 rounded-xl" : "justify-center p-2 py-1 rounded-2xl"} ${darkMode ? "hover:bg-[#27272bd4]" : "hover:bg-slate-50"} `}
                        onClick={() => navigate(item.link)}
                      >
                        <div className="shrink-0 flex items-center justify-center w-6">
                          <ProjectIcon color={item.color} />
                        </div>

                        <AnimatePresence mode="wait">
                          {isOpen && (
                            <motion.span
                              layout // Ensures text stays aligned with the sliding container
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -5 }}
                              className={`whitespace-nowrap text-[13px] font-bold flex-1 
                ${darkMode ? "text-slate-200 group-hover:text-slate-100" : "text-slate-600 group-hover:text-slate-900"}`}
                            >
                              {item.label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`flex items-center gap-3 flex-col justify-between  ${isOpen ? "pl-2" : "pl-0"} py-3 border-slate-100/50 transistion-all duration-100 ${darkMode ? "hover:bg-[#27272bd4] hover:rounded-md" : "hover:bg-slate-200/20 hover:rounded-md hover:shadow-md hover:-translate-y-2"} `}
            onClick={() => navigate("/profile")}
          >
            <div className="flex items-center h-2 pt-2 w-full px-1">
              {isOpen ? (
                <div className="flex items-center gap-3 w-full opacity-60">
                  <hr className="flex-1 border-t border-slate-300" />
                </div>
              ) : (
                <hr className="w-full border-slate-200" />
              )}
            </div>
            <div className="flex items-center gap-10 justify-between">
              {/* Avatar */}
              <div className="bg-green-800 size-8 rounded-full shrink-0 shadow-sm flex items-center justify-center uppercase font-bold text-white text-xs">
                {getInitials(fullName)}
              </div>

              {/* Animated Text Container */}
              <AnimatePresence mode="wait">
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col min-w-0 justify-center leading-tight flex-wrap"
                  >
                    <span
                      className={`text-[13px] font-bold ${darkMode ? "text-slate-100" : "text-slate-900"}  truncate`}
                    >
                      {fullName}
                    </span>
                    <span
                      className={`text-[11px] ${darkMode ? "text-slate-400" : "text-slate-500"}  truncate`}
                    >
                      {email}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
