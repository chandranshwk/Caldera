import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useState } from "react";
import type { ToolbarButtonProps } from "./ForgeView";
import { useForgeTools } from "./ForgeTools";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import type { Editor } from "@tiptap/react";
import Input from "../../components/Input";

interface UpperToolBarProps {
  editor: Editor | null;
  darkMode: boolean;
  topPage: number;
  hoveredTopId: string | null;
  setTopPage: (page: number) => void;
  setHoveredTopId: (id: string | null) => void;
  setActiveTool: (tool: ToolbarButtonProps | null) => void;
}

const HIGHLIGHT_COLORS = [
  { name: "Yellow", color: "#F8E76B" },
  { name: "Green", color: "#7BE4A0" },
  { name: "Blue", color: "#83B8FA" },
  { name: "Pink", color: "#FF7E7E" },
  { name: "Clear", color: "transparent" },
];

const UpperToolBar: React.FC<UpperToolBarProps> = ({
  editor,
  darkMode,
  topPage,
  hoveredTopId,
  setTopPage,
  setHoveredTopId,
  setActiveTool,
}) => {
  const { TOPTOOLS } = useForgeTools(editor);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [pickerLeft, setPickerLeft] = useState(0);
  const [color, setColor] = useState("bg-yellow-400");
  const [showTableDialog, setShowTableDialog] = useState(false);
  const [hoveredGrid, setHoveredGrid] = useState({ r: 0, c: 0 });
  const [openLinkDialog, setOpenLinkDialog] = useState(false);

  // Fixed grid size for the selector (e.g., 10x10)
  const GRID_SIZE = 10;
  const gridCells = Array.from({ length: GRID_SIZE * GRID_SIZE });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey) {
        const pageIndex = parseInt(e.key) - 1;
        if (pageIndex >= 0 && pageIndex < TOPTOOLS.length) {
          e.preventDefault();
          setTopPage(pageIndex);
          setShowColorPicker(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setTopPage, TOPTOOLS.length]);

  useEffect(() => {
    const handleTableShortcuts = (e: KeyboardEvent) => {
      if (showTableDialog && e.key === "Enter" && hoveredGrid.r > 0) {
        e.preventDefault();
        editor
          ?.chain()
          .focus()
          .insertTable({
            rows: hoveredGrid.r,
            cols: hoveredGrid.c,
            withHeaderRow: true,
          })
          .run();
        setShowTableDialog(false);
      }
      if (showTableDialog && e.key === "Escape") {
        setShowTableDialog(false);
      }
    };

    window.addEventListener("keydown", handleTableShortcuts);
    return () => window.removeEventListener("keydown", handleTableShortcuts);
  }, [showTableDialog, hoveredGrid, editor]);

  const [link, setLink] = useState("");

  return (
    <div className="relative">
      {" "}
      {/* Main wrapper must be relative */}
      <div
        className={`relative flex flex-col justify-center w-full border-b transition-colors duration-300 ${
          darkMode
            ? "bg-[#18181b] border-slate-700 border-b-0"
            : "bg-white border-slate-300 border-b-0"
        }`}
      >
        <div className="relative flex items-center justify-center px-6 p-0.5 h-12 w-full">
          <div className="flex items-center flex-1 justify-center h-full overflow-hidden">
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

                <button
                  onClick={() => {
                    setShowColorPicker(false);
                    setTopPage(
                      topPage === 0 ? TOPTOOLS.length - 1 : topPage - 1,
                    );
                  }}
                  className="p-2 rounded-lg transition-opacity opacity-60 ml-2 hover:opacity-100 hover:bg-zinc-500/10"
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
                    onClick={() => {
                      if (tool.id === "link") {
                        setOpenLinkDialog(true);
                      }
                    }}
                  >
                    <button
                      key={tool.id}
                      onMouseEnter={() => setHoveredTopId(tool.title)}
                      onMouseLeave={() => setHoveredTopId(null)}
                      onClick={(e) => {
                        // 1. Handle Dialogs
                        if (tool.id === "table") {
                          setShowTableDialog(!showTableDialog);
                          setShowColorPicker(false);
                          return;
                        }

                        if (tool.id === "highlight") {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const parent = e.currentTarget.closest(".relative");
                          if (parent) {
                            const parentRect = parent.getBoundingClientRect();
                            setPickerLeft(
                              rect.left - parentRect.left + rect.width / 2,
                            );
                          }
                          setShowColorPicker(!showColorPicker);
                          // Optional: tool.onClick?.(); // Trigger if you want to toggle default highlight
                        } else {
                          tool.onClick?.();
                          setShowColorPicker(false);
                          setShowTableDialog(false);
                        }

                        // Only set activeTool for temporary UI tracking, not styling
                        setActiveTool(tool);
                      }}
                      className={`relative flex mx-2 flex-col group items-center px-2 py-1.5 rounded-xl transition-all duration-200 border border-transparent group ${tool.isActive ? (darkMode ? "bg-white scale-110 shadow-lg" : "bg-slate-900 scale-110 shadow-lg") : darkMode ? "hover:bg-white/10" : "hover:bg-slate-900"}`}
                    >
                      <span
                        className={`text-lg transition-all duration-200  ${
                          tool.isActive
                            ? darkMode
                              ? "text-black"
                              : "text-white" // Contrast for active bg
                            : darkMode
                              ? "text-slate-50 group-hover:text-white"
                              : "text-slate-500  group-hover:text-white"
                        }`}
                      >
                        {tool.icon}
                      </span>

                      {/* Active Indicator Dot */}
                      <div
                        className={`size-1.5 rounded-full absolute -bottom-1 transition-all duration-300 ${
                          tool.isActive
                            ? `scale-100 opacity-100 ${tool.color}`
                            : "scale-0 opacity-0"
                        }`}
                        style={{
                          backgroundColor:
                            tool.id === "highlight"
                              ? color === "transparent"
                                ? "#fef08a"
                                : color
                              : undefined,
                        }}
                      />
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => {
                    setShowColorPicker(false);
                    setTopPage(
                      topPage === TOPTOOLS.length - 1 ? 0 : topPage + 1,
                    );
                  }}
                  className="p-2 rounded-lg transition-opacity mr-2 opacity-60 hover:opacity-100 hover:bg-zinc-500/10"
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

        {/* PAGINATION DOTS */}
        <div className="flex justify-center gap-1.5 pb-1.5 mt-1">
          {TOPTOOLS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setTopPage(i);
                setShowColorPicker(false);
              }}
              className={`h-1 rounded-full transition-all duration-300 ${
                topPage === i
                  ? `w-4 ${darkMode ? "bg-white" : "bg-slate-900"}`
                  : `w-1 ${darkMode ? "bg-white/20" : "bg-slate-300 hover:bg-slate-400"}`
              }`}
            />
          ))}
        </div>
      </div>
      {/* Link Linker */}
      <div
        className="absolute top-12 left-full z-[100]"
        style={{ left: `50rem`, transform: "translateX(-50%)" }}
      >
        <AnimatePresence>
          {openLinkDialog && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, y: -10, filter: "blur(8px)" }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className={`relative flex flex-col w-[340px] p-1.5 rounded-2xl shadow-[0_24px_48px_-12px_rgba(0,0,0,0.4)] border backdrop-blur-2xl overflow-hidden ${
                darkMode
                  ? "bg-zinc-900/80 border-white/10"
                  : "bg-white/80 border-zinc-200"
              }`}
            >
              {/* Subtle Decorative Background Glow */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-500/10 blur-3xl rounded-full" />

              <div className="p-4 flex flex-col gap-5">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${link ? "bg-blue-500 animate-pulse" : "bg-zinc-400"}`}
                    />
                    <h3
                      className={`text-[10px] font-black uppercase tracking-[0.15em] ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}
                    >
                      Attach Hyperlink
                    </h3>
                  </div>
                  <button
                    onClick={() => setOpenLinkDialog(false)}
                    className={`p-1 rounded-md transition-colors ${darkMode ? "hover:bg-white/10 text-zinc-500" : "hover:bg-black/5 text-zinc-400"}`}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Input Group */}
                <div className="relative group">
                  <Input
                    type="text"
                    label="Enter a Link"
                    input={link}
                    setInput={setLink}
                    darkMode={darkMode}
                    placeholder="Paste destination URL..."
                    extra="w-full !bg-transparent !border-none !ring-0 !px-0"
                  />
                  {/* Animated Underline */}
                  <div
                    className={`absolute -bottom-1 left-0 h-[2px] w-full transition-all duration-500 ${
                      link
                        ? "bg-blue-500 w-full"
                        : "bg-zinc-500/20 w-0 group-focus-within:w-full"
                    }`}
                  />
                </div>

                {/* Action Button */}
                <motion.button
                  whileHover={{
                    y: -1,
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (link) {
                      editor
                        ?.chain()
                        .focus()
                        .setLink({ href: link })
                        .setBold()
                        .setUnderline()
                        .run();
                      setLink("");
                      setOpenLinkDialog(false);
                    }
                  }}
                  // Logic fix: Explicitly use darkMode variable for colors
                  className={`group relative flex items-center justify-center w-full h-11 overflow-hidden rounded-xl transition-all duration-300 shadow-md ${
                    darkMode
                      ? "bg-white text-zinc-900 hover:bg-zinc-100"
                      : "bg-zinc-900 text-white hover:bg-zinc-800"
                  }`}
                >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 dark:via-black/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />

                  <span className="relative text-sm font-bold tracking-tight">
                    Link Selection
                  </span>

                  <svg
                    className="relative ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
                    />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* THE PICKER: Moved outside the overflow-hidden container */}
      <div className="absolute right-168 top-12">
        <AnimatePresence>
          {showColorPicker && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              style={{ left: pickerLeft, transform: "translateX(-50%)" }}
              className={`absolute flex gap-2 right-12 w-max p-2 rounded-2xl shadow-xl border z-100 ${
                darkMode
                  ? "bg-zinc-800 border-white/10"
                  : "bg-white border-zinc-200"
              }`}
            >
              {HIGHLIGHT_COLORS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => {
                    if (c.color === "transparent")
                      editor?.chain().focus().unsetHighlight().run();
                    else
                      editor
                        ?.chain()
                        .focus()
                        .setHighlight({ color: c.color })
                        .run();

                    setColor(c.color);
                    setShowColorPicker(false);
                  }}
                  className={`size-6 rounded-full border border-black/10 hover:scale-125 transition-transform ${
                    c.color === "transparent"
                      ? "bg-white relative overflow-hidden after:content-[''] after:absolute after:top-1/2 after:left-0 after:w-full after:h-px after:bg-red-500 after:-rotate-45"
                      : ""
                  }`}
                  style={
                    c.color !== "transparent"
                      ? { backgroundColor: c.color }
                      : {}
                  }
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="absolute right-168 top-12">
        <AnimatePresence>
          {showTableDialog && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className={`absolute right-12 p-3 rounded-2xl shadow-2xl border z-100 ${
                darkMode
                  ? "bg-zinc-900 border-white/10"
                  : "bg-white border-zinc-200"
              }`}
            >
              {/* Visual Grid Selector */}
              <div
                className="grid gap-1 mb-3"
                style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
                onMouseLeave={() => setHoveredGrid({ r: 0, c: 0 })}
              >
                {gridCells.map((_, i) => {
                  const r = Math.floor(i / GRID_SIZE) + 1;
                  const c = (i % GRID_SIZE) + 1;
                  const isSelected = r <= hoveredGrid.r && c <= hoveredGrid.c;

                  return (
                    <div
                      key={i}
                      onMouseEnter={() => setHoveredGrid({ r, c })}
                      onClick={() => {
                        editor
                          ?.chain()
                          .focus()
                          .insertTable({
                            rows: r,
                            cols: c,
                            withHeaderRow: true,
                          })
                          .run();
                        setShowTableDialog(false);
                      }}
                      className={`size-4 rounded-sm transition-colors cursor-pointer border ${
                        isSelected
                          ? "bg-orange-500 border-orange-400"
                          : darkMode
                            ? "bg-zinc-800 border-white/5"
                            : "bg-zinc-100 border-zinc-200"
                      }`}
                    />
                  );
                })}
              </div>

              {/* Legend and Keyboard Hint */}
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest opacity-60">
                <span>
                  {hoveredGrid.r || 0} x {hoveredGrid.c || 0}
                </span>
                <span>Click to Insert</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UpperToolBar;
