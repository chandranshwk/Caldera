import { useState } from "react";
import {
  BiCheckSquare,
  BiChevronDown,
  BiMessageSquare,
  BiSearch,
} from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { FiEdit3, FiPenTool } from "react-icons/fi";
import { faker } from "@faker-js/faker";
import { getInitials } from "../assets/functions";
import { useNavigate } from "react-router-dom";
import ProjectEye from "./ProjectEye";

interface SidebarProps {
  darkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [testUser] = useState(faker.person.fullName());
  const [testEmail] = useState(faker.internet.email());
  const [testRole] = useState(faker.person.jobTitle());
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const [search, setSearch] = useState<string>("");

  const navigate = useNavigate();

  return (
    <motion.div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => {
        setIsOpen(false);
        setActiveMenu(null);
      }}
      animate={{ width: isOpen ? "240px" : "55px" }}
      className={`h-[calc(100vh-1rem)] m-2 mx-1 ${darkMode ? "bg-[#18181b] text-white border-[#242425ab]" : "bg-white border-slate-100"} shadow-lg rounded-lg p-4 pb-0 overflow-hidden border `}
    >
      <div className="flex items-center flex-col gap-4 justify-between h-full">
        <div
          className={`
    flex items-center w-full h-10 transition-all duration-300 rounded-xl overflow-hidden
    ${
      isOpen
        ? darkMode
          ? "bg-[#0f0f11] px-3 border-none"
          : "bg-slate-100/80 px-3 border-none"
        : "bg-transparent justify-center px-0 border-none"
    }
    ${darkMode ? "focus-within:bg-[#27272bd4]" : "focus-within:bg-slate-200/50"} 
  `}
        >
          <BiSearch
            size={22}
            className={`shrink-0 transition-colors ${isOpen ? (darkMode ? "text-slate-50" : "text-slate-500") : darkMode ? "text-100" : "text-slate-600"}`}
          />

          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className="flex-1 ml-3"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={`w-full bg-transparent text-sm font-medium ${darkMode ? "text-white placeholder-text-slate-50" : "text-slate-700 placeholder:text-slate-400"} outline-none border-none focus:ring-0`}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-3 w-full">
          {/* Divider / Section Label */}
          <div className="flex items-center h-6 w-full px-1">
            {isOpen ? (
              <div className="flex items-center gap-3 w-full opacity-60">
                <hr className="flex-1 border-t border-slate-300" />
                <span
                  className={`font-bold uppercase text-[10px] ${darkMode ? "text-white" : "text-slate-900"} tracking-widest whitespace-nowrap`}
                >
                  Main
                </span>
                <hr className="flex-1 border-t border-slate-300" />
              </div>
            ) : (
              <hr className="w-full border-slate-200" />
            )}
          </div>

          {/* Nav Items */}
          {[
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
              icon: <FiPenTool size={22} />,
              label: "The Canvas",
              subLinks: [
                { name: "Dashboard", link: "/canvas/dashboard" },
                { name: "New", link: "/canvas/new" },
                { name: "View All", link: "/canvas/viewAll" }, // Fixed camelCase
              ],
            },
          ].map((item, index) => {
            const isExpanded = activeMenu === index && isOpen;

            return (
              <div key={index} className="flex flex-col w-full">
                {/* Main Link Container */}
                <div
                  onClick={() =>
                    isOpen && setActiveMenu(isExpanded ? null : index)
                  }
                  className={`
            flex items-center w-full gap-4 transition-all duration-300 cursor-pointer group p-2 rounded-xl
            ${isOpen ? (darkMode ? "justify-start hover:bg-[#27272bd4]" : "justify-start hover:bg-slate-50") : "justify-center"}
          `}
                >
                  <div
                    className={`shrink-0 ${darkMode ? "text-slate-200 group-hover:text-white" : "text-slate-600 group-hover:text-indigo-600"}  transition-colors`}
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
                          className={`whitespace-nowrap font-semibold ${darkMode ? "text-slate-50" : "text-slate-700"}  text-sm`}
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
                      className="overflow-hidden flex flex-col pl-12 mt-1 gap-1 border-l-2 border-slate-100 ml-5"
                    >
                      {item.subLinks.map((sub, sIdx) => (
                        <span
                          key={sIdx}
                          className={`text-xs font-medium ${darkMode ? "text-slate-100 hover:text-white/80" : "text-slate-500 hover:text-indigo-600"}  py-1.5 cursor-pointer transition-colors`}
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
          className={`flex flex-col ${isOpen ? "gap-1" : "gap-5"} justify-center item-center w-full`}
        >
          {/* Divider / Section Label */}
          <div className="flex items-center h-6 w-full">
            {isOpen ? (
              <div className="flex items-center gap-3 w-full opacity-60">
                <hr className="flex-1 border-t border-slate-300" />
                <span
                  className={`font-bold uppercase text-[10px] ${darkMode ? "text-white" : "text-slate-900"} tracking-widest whitespace-nowrap`}
                >
                  Projects
                </span>
                <hr className="flex-1 border-t border-slate-300" />
              </div>
            ) : (
              <hr className="w-full border-slate-200" />
            )}
          </div>

          {/* Nav Items */}
          {[
            {
              label: "Grifty",
              color: "from-indigo-500 to-purple-600",
            },
            {
              label: "Llama TB",
              color: "from-emerald-500 to-teal-800",
            },
            {
              label: "Caldera",
              color: "from-orange-400 to-rose-500",
            },
            {
              label: "Samridh",
              color: "from-blue-500 to-cyan-500",
            },

            {
              label: "Heelos",
              color: "from-yellow-500 to-orange-500",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ x: isOpen ? 5 : 0 }} // Subtle shift on hover
              className={`flex items-center w-full gap-4 cursor-pointer group transition-all justify-center duration-300 group ${isOpen ? (darkMode ? "justify-start px-2 py-1.5 rounded-xl hover:bg-[#27272bd4]" : "justify-start px-2 py-1.5 rounded-xl hover:bg-slate-50") : "justify-center"}`}
            >
              {/* Gradient Icon Wrapper */}

              <ProjectEye color={item.color} />

              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -5 }}
                    className={`whitespace-nowrap text-sm font-semibold relative ${darkMode ? "text-slate-200 group-hover:text-slate-100" : "text-slate-600 group-hover:text-slate-900"}  transition-colors flex-1`}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        <div
          className={`flex items-center gap-3 p-2 ${isOpen ? "ml-5" : "m-0"} mt-auto border-t pb-4 border-slate-100/50 transistion-all duration-100 ${darkMode ? "hover:bg-[#27272bd4]" : "hover:bg-slate-50/80"} `}
          onClick={() => navigate("/dashboard")}
        >
          {/* Avatar */}
          <div className="bg-green-800 size-8 rounded-full shrink-0 shadow-sm flex items-center justify-center uppercase font-bold text-white text-xs">
            {getInitials(testUser)}
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
                  {testUser}
                </span>
                <span
                  className={`text-[11px] ${darkMode ? "text-slate-400" : "text-slate-500"}  truncate`}
                >
                  {testEmail}
                </span>
                <span
                  className={`text-[10px] font-semibold ${darkMode ? "text-indigo-200" : "text-indigo-500"}  uppercase tracking-wider truncate w-48 text-wrap mt-1 `}
                >
                  {testRole}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
