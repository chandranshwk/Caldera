import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilePlus, FiGrid, FiLayers } from "react-icons/fi";
import {
  BiCheckSquare,
  BiMessageSquare,
  BiMoon,
  BiSun,
  BiSearch,
  BiSolidHome,
} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { PiCommandLight } from "react-icons/pi";
import { FaRegFolderOpen } from "react-icons/fa";

interface CommandBarProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

interface CommandItemProps {
  icon: React.ReactNode;
  title: string;
  module: string;
  darkMode: boolean;
  shortcut?: string;
  action?: () => void;
  isSelected?: boolean;
}

const CommandBar: React.FC<CommandBarProps> = ({
  isOpen,
  onClose,
  darkMode,
  setDarkMode,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const searchRef = useRef(search);

  // Sync ref to avoid stale closures in the keydown event listener
  useEffect(() => {
    searchRef.current = search;
  }, [search]);

  const allActions = useMemo(
    () => [
      {
        id: "dark",
        icon: <BiMoon />,
        title: "Switch to Dark Mode",
        shortcut: "/dark",
        module: "System",
        category: "System Setting",
        action: () => setDarkMode(true),
      },
      {
        id: "light",
        icon: <BiSun />,
        title: "Switch to Light Mode",
        shortcut: "/light",
        module: "System",
        category: "System Setting",
        action: () => setDarkMode(false),
      },
      {
        id: "new-doc",
        icon: <FiFilePlus />,
        title: "New Document",
        shortcut: "/n-docs",
        module: "Forge",
        category: "Quick Actions",
        action: () => navigate("/forge/docs"),
      },
      {
        id: "new-sheet",
        icon: <FiGrid />,
        title: "New Spreadsheet",
        shortcut: "/n-sheets",
        module: "Forge",
        category: "Quick Actions",
        action: () => navigate("/forge/sheets"),
        hideByDefault: true,
      },
      {
        id: "new-canvas",
        icon: <FiLayers />,
        title: "New Canvas",
        shortcut: "/n-canvas",
        module: "Canvas",
        category: "Quick Actions",
        action: () => navigate("/canvas"),
      },
      {
        id: "open",
        icon: <FaRegFolderOpen />,
        title: "Open Document",
        shortcut: "/o",
        module: "Caldera",
        category: "Quick Actions",
        action: () => navigate("/profile"),
        hideByDefault: true,
      },
      {
        id: "profile",
        icon: <BiSolidHome />,
        title: "Profile",
        shortcut: "/profile",
        module: "Caldera",
        category: "Core",
        action: () => navigate("/profile"),
      },
      {
        id: "forge",
        icon: <BiCheckSquare />,
        title: "Forge",
        shortcut: "/forge",
        module: "Management",
        category: "Modules",
        action: () => navigate("/forge"),
      },
      {
        id: "nexus",
        icon: <BiCheckSquare />,
        title: "Nexus Tasks",
        shortcut: "/nexus",
        module: "Management",
        category: "Modules",
        action: () => navigate("/nexus"),
      },
      {
        id: "hearth",
        icon: <BiMessageSquare />,
        title: "Hearth Chat",
        shortcut: "/hearth",
        module: "Collaboration",
        category: "Modules",
        action: () => navigate("/hearth"),
      },
      {
        id: "canvas",
        icon: <BiCheckSquare />,
        title: "Canvas",
        shortcut: "/canvas",
        module: "Management",
        category: "Modules",
        action: () => navigate("/canvas"),
      },
    ],
    [setDarkMode, navigate],
  );

  const filteredActions = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (query === "") return allActions.filter((item) => !item.hideByDefault);

    return allActions.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.shortcut?.toLowerCase().includes(query),
    );
  }, [search, allActions]);

  const handleExecute = (commandText: string) => {
    const query = commandText.toLowerCase().trim();

    // 1. Priority: If an item is highlighted via Arrow Keys, execute it
    if (selectedIndex >= 0 && filteredActions[selectedIndex]) {
      filteredActions[selectedIndex].action();
    }
    // 2. Fallback: Parse the typed string (handles /dark, /n-sheets, /n -sheets, etc.)
    else {
      const exactMatch = allActions.find((a) => a.shortcut === query);
      if (exactMatch) {
        exactMatch.action();
      } else if (query.startsWith("/n")) {
        // Space-agnostic sub-command parsing
        if (query.includes("-docs")) navigate("/forge/docs");
        else if (query.includes("-sheets")) navigate("/forge/sheets");
        else if (query.includes("-canvas")) navigate("/canvas");
        else navigate("/profile");
      }
    }
    cleanup();
  };

  const cleanup = () => {
    setSearch("");
    setSelectedIndex(-1);
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filteredActions.length > 0 ? (prev + 1) % filteredActions.length : 0,
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filteredActions.length > 0
            ? (prev - 1 + filteredActions.length) % filteredActions.length
            : filteredActions.length - 1,
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleExecute(searchRef.current);
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, filteredActions, selectedIndex]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedIndex(-1);
  }, [search]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 10);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const theme = {
    overlay:
      "fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4",
    backdrop: "fixed inset-0",
    panel: `relative w-full border-1 border-zinc-500/80 max-w-xl overflow-hidden border border-zinc-400/20 rounded-xl shadow-2xl transition-all duration-300 ${
      darkMode
        ? "bg-zinc-900/90 border-white/10 text-white shadow-black/50"
        : "bg-white/90 border-black/5 text-zinc-900 shadow-black/10"
    } backdrop-blur-2xl`,
    input:
      "w-full p-4 bg-transparent outline-none text-sm placeholder:text-zinc-500",
    kbd: `px-1.5 py-0.5 rounded text-[10px] border font-bold ${darkMode ? "bg-zinc-800 border-white/10 text-zinc-500" : "bg-zinc-100 border-black/10 text-zinc-400"}`,
  };

  return (
    <AnimatePresence mode="popLayout">
      <div className={theme.overlay}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className={theme.backdrop}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={theme.panel}
        >
          <div
            className={`flex items-center px-5 border-b ${darkMode ? "border-white/10" : "border-black/5"}`}
          >
            <div
              className={`flex items-center justify-center mr-2 px-1.5 py-0.5 rounded text-[10px] border font-bold ${darkMode ? "bg-zinc-800 border-white/10 text-zinc-500" : "bg-zinc-100 border-black/10 text-zinc-400"}`}
            >
              <PiCommandLight size={15} />K
            </div>
            <BiSearch
              className={darkMode ? "text-zinc-400" : "text-zinc-500"}
              size={18}
            />
            <div className="flex items-center flex-1">
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type /n-docs or search modules..."
                className={theme.input}
              />
              <AnimatePresence>
                {search.toLowerCase().startsWith("/n") && (
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="text-[10px] font-medium text-blue-500 animate-pulse pr-4 whitespace-nowrap"
                  >
                    Try -docs, -sheets, or -canvas
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="max-h-[50vh] overflow-y-auto py-3">
            <AnimatePresence mode="popLayout">
              {filteredActions.length > 0 ? (
                filteredActions.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                  >
                    {(index === 0 ||
                      item.category !==
                        filteredActions[index - 1].category) && (
                      <p className="px-4 py-2 text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">
                        {item.category}
                      </p>
                    )}
                    <CommandItem
                      {...item}
                      darkMode={darkMode}
                      isSelected={index === selectedIndex}
                      action={() => {
                        item.action();
                        cleanup();
                      }}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 text-center text-zinc-500 text-xs italic"
                >
                  No commands matching "{search}"
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div
            className={`p-3 flex justify-between text-[10px] font-medium border-t opacity-60 ${darkMode ? "border-white/5" : "border-black/5"}`}
          >
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="font-bold border border-current px-1 rounded">
                  Enter
                </kbd>{" "}
                to execute
              </span>
              <span className="flex items-center gap-1">
                ESC or <PiCommandLight size={15} />K to close
              </span>
            </div>
            <span>Caldera OS V 1.0.4</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const CommandItem: React.FC<CommandItemProps> = ({
  icon,
  title,
  shortcut,
  module,
  darkMode,
  action,
  isSelected,
}) => (
  <div
    className={`mx-2 flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${isSelected ? (darkMode ? "bg-white/10" : "bg-black/5") : ""}`}
    onClick={action}
  >
    <div className="flex items-center gap-4">
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-md text-lg ${isSelected && darkMode ? "bg-blue-600 text-white" : darkMode ? "bg-zinc-800 text-zinc-400" : "bg-zinc-100 text-zinc-600"}`}
      >
        {icon}
      </div>
      <div>
        <div
          className={`text-[13px] font-medium ${darkMode ? "text-zinc-200" : "text-zinc-800"}`}
        >
          {title}
        </div>
        <div className="text-[11px] opacity-40 font-medium">{module}</div>
      </div>
    </div>
    {shortcut && (
      <span
        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${darkMode ? "border-white/10 text-zinc-500" : "border-black/10 text-zinc-400"}`}
      >
        {shortcut}
      </span>
    )}
  </div>
);

export default CommandBar;
