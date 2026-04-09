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
import { FiCircle, FiFilePlus, FiSquare, FiTriangle } from "react-icons/fi";
import { useWorkspaceStore } from "../Pages/Strata/useStrataTools";
import Dropdown, { type MenuItem } from "./Dropdown";

// --- Types ---
export type ToolId = string;

export interface ToolConfig {
  id: ToolId;
  icon: ElementType;
  label: string;
  color?: string;
  func: () => void;
  dialog?: MenuItem[];
}

interface ToolbarProps {
  darkMode: boolean;
  onToolSelect?: (id: ToolId) => void;
  setShape: (shape: string) => void;
}

const ToolbarStrata: React.FC<ToolbarProps> = ({
  darkMode,
  onToolSelect,
  setShape,
}) => {
  // --- 3 Logical Sections (Paginated) ---
  const PAGES: ToolConfig[][] = [
    // PAGE 1: Core Interaction & Freeform Drawing
    [
      { id: "select", icon: LuMousePointer2, label: "Select", func: () => {} },
      { id: "hand", icon: LuHand, label: "Hand/Pan", func: () => {} },
      {
        id: "draw",
        icon: LuHighlighter,
        color: "#f1c40f",
        label: "Draw",
        func: () => {},
      },
      {
        id: "pen",
        icon: LuSpline,
        color: "#8e44ad",
        label: "Pen Tool",
        func: () => {},
      },
      { id: "erase", icon: LuEraser, label: "Eraser", func: () => {} },
      {
        id: "laser",
        icon: LuPointer,
        color: "#e67e22",
        label: "Laser Pointer",
        func: () => {},
      },
      {
        id: "shapes",
        icon: LuShapes,
        color: "#9b59b6",
        label: "Shapes",
        func: () => {},
        dialog: [
          {
            label: "Quadrilateral",
            icon: <FiSquare />,
            onClick: () => setShape("rect"),
          },
          {
            label: "Circle",
            icon: <FiCircle />,
            onClick: () => setShape("circle"),
          },
          {
            label: "Triangle",
            icon: <FiTriangle />,
            onClick: () => setShape("triangle"),
          },
        ],
      },
      {
        id: "text",
        icon: LuType,
        color: "#e74c3c",
        label: "Text",
        func: () => {},
      },
    ],
    // PAGE 2: Structured Content & Logic
    [
      {
        id: "sticky",
        icon: MdOutlineStickyNote2,
        color: "#2ecc71",
        label: "Note",
        func: () => {},
      },
      {
        id: "image",
        icon: HiOutlinePhoto,
        color: "#3498db",
        label: "Image",
        func: () => {},
      },
      {
        id: "file",
        icon: FiFilePlus,
        label: "File Attachment",
        func: () => {},
      },
      {
        id: "flow",
        icon: LuArrowRight,
        color: "#1abc9c",
        label: "Flow Line",
        func: () => {},
      },
      {
        id: "nodes",
        icon: LuNetwork,
        color: "#34495e",
        label: "Logic Node",
        func: () => {},
      },
      {
        id: "commit",
        icon: BiGitCommit,
        color: "#f39c12",
        label: "Nodes",
        func: () => {},
      },
      {
        id: "zap",
        icon: LuZap,
        color: "#f1c40f",
        label: "Automation",
        func: () => {},
      },
    ],
    // PAGE 3: Editing, Collaboration & Settings
    [
      {
        id: "task",
        icon: BiCheckSquare,
        color: "#e91e63",
        label: "Task Card",
        func: () => {},
      },
      {
        id: "chat",
        icon: BiMessageSquare,
        color: "#607d8b",
        label: "Team Chat",
        func: () => {},
      },
      { id: "group", icon: LuGroup, label: "Group Items", func: () => {} },
      { id: "layers", icon: LuLayers, label: "Layers", func: () => {} },
      { id: "scale", icon: LuScaling, label: "Scale", func: () => {} },
      { id: "scissors", icon: LuScissors, label: "Cut", func: () => {} },
      { id: "grid", icon: BiGrid, label: "Snap Settings", func: () => {} },
      { id: "timer", icon: BiCodeBlock, label: "Timeline", func: () => {} },
    ],
  ];
  const activeTool = useWorkspaceStore((state) => state.selectedTool);
  const setActiveTool = useWorkspaceStore((state) => state.setTool);
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

  const [dialogOpen, setDialogOpen] = useState(false);

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
      flex items-center justify-evenly p-1.5 rounded-2xl w-max border backdrop-blur-md shadow-2xl transition-colors duration-500
      ${darkMode ? "bg-zinc-900/90 border-white/10" : "bg-white/90 border-zinc-200"}
    `}
      >
        {/* Left Arrow */}
        <button
          onClick={() => navigate(-1)}
          className={`p-2 rounded-lg transition-opacity opacity-60 ml-2 hover:opacity-100 hover:bg-zinc-500/10`}
        >
          <LuChevronLeft
            size={18}
            className={darkMode ? "text-white" : "text-zinc-900"}
          />
        </button>

        {/* Paginated Tool Area - Removed overflow-hidden to allow dropdown visibility */}
        <div className="flex items-center justify-center w-sm">
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

                // Define the shared Button UI
                const buttonElement = (
                  <button
                    onClick={() => {
                      setActiveTool(tool.id);
                      onToolSelect?.(tool.id);
                      tool.func?.();
                      // Open dropdown only if this specific tool has one
                      if (tool.dialog) setDialogOpen(dialogOpen ? false : true);
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

                // Wrap with Dropdown logic if tool has dialog items
                return tool.dialog ? (
                  <Dropdown
                    key={tool.id}
                    darkMode={darkMode}
                    // Check if this specific tool's ID is the one set to open
                    externalOpen={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    items={tool.dialog}
                    trigger={buttonElement}
                  />
                ) : (
                  <div key={tool.id}>{buttonElement}</div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => navigate(1)}
          className={`p-2 rounded-lg transition-opacity mr-2 opacity-60 hover:opacity-100 hover:bg-zinc-500/10`}
        >
          <LuChevronRight
            size={18}
            className={darkMode ? "text-white" : "text-zinc-900"}
          />
        </button>
      </div>

      {/* Page Breadcrumbs */}
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
