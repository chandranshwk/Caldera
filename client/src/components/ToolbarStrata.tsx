import React, { useState, useEffect, type ElementType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuScaling,
  LuSpline,
  LuType,
  LuEraser,
  LuHighlighter,
  LuMousePointer2,
  LuChevronLeft,
  LuChevronRight,
  LuShapes,
  LuScissors,
  LuHand,
  LuLayers,
  LuPointer,
  LuArrowRight,
  LuNetwork,
  LuGroup,
  LuZap,
} from "react-icons/lu";
import {
  BiCheckSquare,
  BiCodeBlock,
  BiGitCommit,
  BiGrid,
  BiMessageSquare,
} from "react-icons/bi";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { HiOutlinePhoto } from "react-icons/hi2";
import { FiFilePlus } from "react-icons/fi";

// --- Types ---
type ToolId = string;

interface ToolConfig {
  id: ToolId;
  icon: ElementType;
  label: string;
  color?: string;
}

interface ToolbarProps {
  darkMode: boolean;
  onToolSelect?: (id: ToolId) => void;
}

// --- 3 Logical Sections (Paginated) ---
const PAGES: ToolConfig[][] = [
  // PAGE 1: Core Interaction & Freeform Drawing
  [
    { id: "select", icon: LuMousePointer2, label: "Select" },
    { id: "hand", icon: LuHand, label: "Hand/Pan" },
    { id: "draw", icon: LuHighlighter, color: "#f1c40f", label: "Draw" },
    { id: "pen", icon: LuSpline, color: "#8e44ad", label: "Pen Tool" },
    { id: "erase", icon: LuEraser, label: "Eraser" },
    { id: "laser", icon: LuPointer, color: "#e67e22", label: "Laser Pointer" },
    { id: "shapes", icon: LuShapes, color: "#9b59b6", label: "Shapes" },
    { id: "text", icon: LuType, color: "#e74c3c", label: "Text" },
  ],
  // PAGE 2: Structured Content & Logic
  [
    {
      id: "sticky",
      icon: MdOutlineStickyNote2,
      color: "#2ecc71",
      label: "Note",
    },
    { id: "image", icon: HiOutlinePhoto, color: "#3498db", label: "Image" },
    { id: "file", icon: FiFilePlus, label: "File Attachment" },
    { id: "flow", icon: LuArrowRight, color: "#1abc9c", label: "Flow Line" },
    { id: "nodes", icon: LuNetwork, color: "#34495e", label: "Logic Node" },
    { id: "commit", icon: BiGitCommit, color: "#f39c12", label: "Nodes" },
    { id: "zap", icon: LuZap, color: "#f1c40f", label: "Automation" },
  ],
  // PAGE 3: Editing, Collaboration & Settings
  [
    { id: "task", icon: BiCheckSquare, color: "#e91e63", label: "Task Card" },
    { id: "chat", icon: BiMessageSquare, color: "#607d8b", label: "Team Chat" },
    { id: "group", icon: LuGroup, label: "Group Items" },
    { id: "layers", icon: LuLayers, label: "Layers" },
    { id: "scale", icon: LuScaling, label: "Scale" },
    { id: "scissors", icon: LuScissors, label: "Cut" },
    { id: "grid", icon: BiGrid, label: "Snap Settings" },
    { id: "timer", icon: BiCodeBlock, label: "Timeline" },
  ],
];

const ToolbarStrata: React.FC<ToolbarProps> = ({ darkMode, onToolSelect }) => {
  const [activeTool, setActiveTool] = useState<ToolId>("select");
  const [page, setPage] = useState(0);
  const [hoveredId, setHoveredId] = useState<ToolId | null>(null);

  // Keyboard Shortcuts for Pagination (Alt + 1, 2, 3...)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      if (e.altKey) {
        const num = parseInt(e.key);
        // Ensure the number pressed exists in our PAGES array
        if (num >= 1 && num <= PAGES.length) {
          e.preventDefault();
          setPage(num - 1); // Sets direct index (0-based)
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [PAGES.length]); // Added dependency for safety

  // Navigation with wrap-around logic
  const navigate = (dir: number) => {
    setPage((prev) => {
      const total = PAGES.length;
      // (prev + dir + total) % total handles both positive and negative wrap-around
      return (prev + dir + total) % total;
    });
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
      {/* Tooltip */}
      <AnimatePresence>
        {hoveredId && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider shadow-xl border ${
              darkMode
                ? "bg-zinc-800 border-white/10 text-zinc-400"
                : "bg-white border-zinc-200 text-zinc-500"
            }`}
          >
            {PAGES.flat().find((t) => t.id === hoveredId)?.label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Dock */}
      <div
        className={`
          flex items-center justify-evenly p-1.5 rounded-2xl w-lg border backdrop-blur-md shadow-2xl transition-colors duration-500
          ${darkMode ? "bg-zinc-900/90 border-white/10" : "bg-white/90 border-zinc-200"}
        `}
      >
        {/* Left Arrow */}
        <button
          onClick={() => navigate(-1)}
          className={`p-2 rounded-lg transition-opacity opacity-60 hover:opacity-100 hover:bg-zinc-500/10`}
        >
          <LuChevronLeft
            size={18}
            className={darkMode ? "text-white" : "text-zinc-900"}
          />
        </button>

        {/* Paginated Tool Area - Fixed Width ensures the dock doesn't resize */}
        <div className="flex items-center justify-center w-sm  overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -10, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-0.5"
            >
              {PAGES[page].map((tool) => {
                const isActive = activeTool === tool.id;
                return (
                  <button
                    key={tool.id}
                    onClick={() => {
                      setActiveTool(tool.id);
                      onToolSelect?.(tool.id);
                    }}
                    onMouseEnter={() => setHoveredId(tool.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 hover:bg-zinc-500/10 active:scale-90"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-bg"
                        className={`absolute inset-0 rounded-xl ${darkMode ? "bg-white/10" : "bg-zinc-100"}`}
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.5,
                        }}
                      />
                    )}

                    <tool.icon
                      size={18}
                      style={{
                        color: isActive
                          ? tool.color || (darkMode ? "#fff" : "#18181b")
                          : darkMode
                            ? "#a1a1aa"
                            : "#71717a",
                      }}
                      className="z-10"
                    />

                    {isActive && (
                      <motion.div
                        layoutId="active-dot"
                        className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-blue-500"
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => navigate(1)}
          className={`p-2 rounded-lg transition-opacity opacity-60 hover:opacity-100 hover:bg-zinc-500/10`}
        >
          <LuChevronRight
            size={18}
            className={darkMode ? "text-white" : "text-zinc-900"}
          />
        </button>
      </div>

      {/* Page Breadcrumbs (Visual clue for Alt+1, 2, 3) */}
      <div className="flex gap-1.5">
        {PAGES.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${page === i ? "w-4 bg-blue-500" : "w-1 bg-zinc-400/30"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ToolbarStrata;
