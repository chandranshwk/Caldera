import { AnimatePresence, motion } from "motion/react";
import React, { useEffect } from "react";
import type { ToolbarButtonProps } from "./ForgeView";
import { useForgeTools } from "./ForgeTools";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import type { Editor } from "@tiptap/react";

interface UpperToolBarProps {
  editor: Editor | null;
  darkMode: boolean;
  topPage: number;
  hoveredTopId: string | null;
  setTopPage: (page: number) => void;
  setHoveredTopId: (id: string | null) => void;
  activeTool: ToolbarButtonProps | null;
  setActiveTool: (tool: ToolbarButtonProps | null) => void;
}

const UpperToolBar: React.FC<UpperToolBarProps> = ({
  editor,
  darkMode,
  topPage,
  hoveredTopId,
  setTopPage,
  setHoveredTopId,
  activeTool,
  setActiveTool,
}) => {
  const { TOPTOOLS } = useForgeTools(editor);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger if Alt is held (Option on Mac)
      if (e.altKey) {
        // Convert key string to number (e.g., "1" -> 0 index)
        const pageIndex = parseInt(e.key) - 1;

        // Check if the number pressed exists in your TOPTOOLS array
        if (pageIndex >= 0 && pageIndex < TOPTOOLS.length) {
          e.preventDefault(); // Prevent browser menu conflicts
          setTopPage(pageIndex);

          // Optional: Add a subtle haptic/visual feedback
          console.log(`Switched to Forge Tool Page ${pageIndex + 1}`);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setTopPage, TOPTOOLS.length]); // Added dependencies for safety
  return (
    <div>
      {" "}
      {/* Upper dock Toolbar */}
      <div
        className={`relative flex flex-col justify-center w-full border-b transition-colors duration-300 ${
          darkMode
            ? "bg-[#18181b] border-slate-700 border-b-0"
            : "bg-white border-slate-300 border-b-0"
        }`}
      >
        <div className="relative flex items-center justify-center px-6 p-0.5 h-12 w-full">
          {/* Tool Container with Framer Motion for smooth page swaps */}
          <div className="flex items-center flex-1 justify-center overflow-hidden h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={topPage}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="flex items-center gap-3"
              >
                {/* Tooltip */}
                <div className="absolute -top-9 left-[calc(50%-2.5rem)]">
                  <AnimatePresence>
                    {hoveredTopId && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className={`px-2 py-1 rounded text-[10px] w-max font-bold uppercase tracking-wider shadow-md border ${
                          darkMode
                            ? "bg-zinc-800 border-white/10 text-zinc-400"
                            : "bg-white border-zinc-200 text-zinc-500"
                        }`}
                      >
                        {hoveredTopId}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {/* Left Arrow */}
                <button
                  onClick={() => {
                    if (topPage === 0) {
                      setTopPage(TOPTOOLS.length - 1);
                    } else setTopPage(Math.max(0, topPage - 1));
                  }}
                  className={`p-2 rounded-lg transition-opacity opacity-60 ml-2 hover:opacity-100 hover:bg-zinc-500/10`}
                >
                  <LuChevronLeft
                    size={18}
                    className={darkMode ? "text-white" : "text-zinc-900"}
                  />
                </button>
                {TOPTOOLS[topPage]?.map((tool, idx) => (
                  <div
                    key={tool.id + idx}
                    className="relative flex items-center"
                  >
                    <button
                      onMouseEnter={() => setHoveredTopId(tool.title)}
                      onMouseLeave={() => setHoveredTopId(null)}
                      onClick={() => {
                        tool.onClick?.();
                        setActiveTool(tool);
                      }}
                      className={`relative flex mx-2 flex-col group items-center px-2 py-1.5 rounded-xl transition-all duration-200 border border-transparent ${darkMode ? "hover:bg-white text-black hover:border-white/5" : "text-black"} ${activeTool?.id === tool.id ? (darkMode ? "bg-white scale-110" : "bg-slate-900 scale-110") : ""}`}
                    >
                      <span
                        className={`text-lg transition-colors ${activeTool?.id === tool.id ? (darkMode ? "text-black" : "text-white") : darkMode ? "text-slate-100 group-hover:text-black" : "text-slate-600 group-hover:text-black"}`}
                      >
                        {tool.icon}
                      </span>

                      {/* The Indicator Dot */}
                      <div
                        className={`size-1.5 rounded-full absolute -bottom-1 transition-all duration-300 ${
                          activeTool?.id === tool.id
                            ? `scale-100 opacity-100 ${tool.color}`
                            : "scale-0 opacity-0"
                        }`}
                      />
                    </button>
                  </div>
                ))}
                {/* Right Arrow */}
                <button
                  onClick={() => {
                    if (topPage === TOPTOOLS.length - 1) {
                      setTopPage(0);
                    } else
                      setTopPage(Math.min(TOPTOOLS.length - 1, topPage + 1));
                  }}
                  className={`p-2 rounded-lg transition-opacity mr-2 opacity-60 hover:opacity-100 hover:bg-zinc-500/10`}
                >
                  <LuChevronRight
                    size={18}
                    className={darkMode ? "text-white" : "text-zinc-900"}
                  />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination Dots - Clickable to switch TOPTOOLS pages */}
        <div className="flex justify-center gap-1.5 pb-1.5 mt-1">
          {TOPTOOLS.map((_, i) => (
            <button
              key={i}
              onClick={() => setTopPage(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                topPage === i
                  ? `w-4 ${darkMode ? "bg-white" : "bg-slate-900"}`
                  : `w-1 ${darkMode ? "bg-white/20" : "bg-slate-300 hover:bg-slate-400"}`
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpperToolBar;
