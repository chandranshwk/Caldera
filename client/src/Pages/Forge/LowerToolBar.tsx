import React from "react";
import Dropdown from "../../components/Dropdown";
import { AnimatePresence, motion } from "motion/react";
import type { ToolbarButtonProps } from "./ForgeView";
import { useForgeTools } from "./ForgeTools";
import type { Editor } from "@tiptap/react";

interface LowerToolBarProps {
  editor: Editor | null;
  darkMode: boolean;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  setActiveTool: (tool: ToolbarButtonProps | null) => void;
}

const LowerToolBar: React.FC<LowerToolBarProps> = ({
  editor,
  darkMode,
  hoveredId,
  setHoveredId,
  setActiveTool,
}) => {
  const {
    LOWERTOOLS,
    TEXTSIZESOPTIONS,
    HEADINGSOPTIONS,
    FONTSOPTIONS,
    activeFont,
  } = useForgeTools(editor);
  return (
    <div>
      {/* Lower dock Toolbar */}
      <div
        className={`absolute bottom-0 left-1/2 gap-2 -translate-x-1/2 flex items-center px-6 mb-5 p-1.5 ${darkMode ? "bg-[#303032]" : "bg-white"} shadow-xl rounded-2xl border border-slate-300`}
      >
        {LOWERTOOLS?.map((tool, idx) => (
          <>
            {/* Tooltip */}
            <div key={idx} className="absolute -top-9 left-[calc(50%-2.5rem)]">
              <AnimatePresence>
                {hoveredId && (
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
                    {hoveredId}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div
              key={tool.id}
              className={`relative flex flex-col group items-center px-1 py-2 rounded-xl transition-all hover:border-0.5 group duration-200  ${darkMode ? "hover:bg-slate-50" : "hover:bg-slate-950"} border border-transparent ${darkMode ? "hover:border-white/10" : "hover:border-slate-950 group "} ${tool.isActive ? (darkMode ? "bg-slate-50 scale-110" : "bg-slate-950 scale-110") : "hover:bg-slate-50"}  `}
              onClick={() => {
                setActiveTool(tool);
                tool.onClick?.();
              }}
              onMouseEnter={() => setHoveredId(tool.title)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <button
                className={`p-2 py-1 rounded-xl transition-all duration-200                 
                `}
              >
                {/* Render icon with a consistent size */}
                <span
                  className={`text-md ${darkMode ? (tool.isActive ? "text-black" : "text-slate-100") : tool.isActive ? "text-white" : "text-slate-600"} ${darkMode ? "group-hover:text-black" : "group-hover:text-white"} `}
                >
                  {tool.icon}
                </span>
              </button>

              {/* The Indicator Dot */}
              <div
                className={`size-2 rounded-full absolute -bottom-1 transition-all duration-300 ${tool.isActive ? `scale-100 opacity-100 ${tool.color}` : "scale-50 bg-transparent"} `}
              />
            </div>
            {idx === LOWERTOOLS.length - 1 && (
              <div className="flex items-center gap-1 border-slate-200 dark:border-slate-800">
                {/* Replace your <hr /> or current gap with this */}
                <div
                  className={`h-6 mx-2 w-px ${darkMode ? "bg-white/10" : "bg-slate-300"}`}
                />

                {/* Font Selector - Styled as a clean field */}
                <Dropdown
                  width="w-56"
                  trigger={
                    <button
                      className={`group flex items-center justify-between gap-2 p-2 px-3 rounded-xl transition-all duration-200 hover:bg-slate-50  border border-transparent  ${darkMode ? "hover:border-white/10" : "hover:border-slate-200 group "}`}
                      style={{ fontFamily: activeFont || "Inter" }}
                      onMouseEnter={() => setHoveredId("Font Family")}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <span
                        className={`text-[13px] font-medium group-hover:text-black ${darkMode ? "text-slate-100" : "text-slate-700"}  truncate w-20 text-left  `}
                      >
                        {activeFont || "Inter"}
                      </span>
                      <span className="text-[10px] group-hover:text-black text-slate-750 opacity-40 group-hover:opacity-100 transition-opacity">
                        ▼
                      </span>
                    </button>
                  }
                  items={FONTSOPTIONS}
                  darkMode={darkMode}
                />

                {/* Text Size (Tt) */}
                <Dropdown
                  width="w-32"
                  trigger={
                    <button
                      className={`p-3 py-2 rounded-xl transition-all hover:border-0.5 group duration-200  ${darkMode ? "hover:bg-slate-50" : "hover:bg-slate-50"} border border-transparent ${darkMode ? "hover:border-white/10" : "hover:border-slate-200 group "}`}
                      onMouseEnter={() => setHoveredId("Text Size")}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <span
                        className={`text-sm font-bold ${darkMode ? "text-slate-100 group-hover:text-slate-950" : "text-slate-700"} `}
                      >
                        Tt
                      </span>
                    </button>
                  }
                  items={TEXTSIZESOPTIONS}
                  darkMode={darkMode}
                />

                {/* Heading (H1) */}
                <Dropdown
                  width="w-40"
                  trigger={
                    <button
                      className={`p-3 py-2 rounded-xl transition-all hover:border-0.5 group duration-200  ${darkMode ? "hover:bg-slate-50" : "hover:bg-slate-50"} border border-transparent ${darkMode ? "hover:border-white/10" : "hover:border-slate-200 group "}`}
                      onMouseEnter={() => setHoveredId("Headings")}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <span
                        className={`text-sm font-bold group-hover:text-black ${darkMode ? "text-slate-100 group-hover:text-slate-950" : "text-slate-700"} `}
                      >
                        H1
                      </span>
                    </button>
                  }
                  items={HEADINGSOPTIONS}
                  darkMode={darkMode}
                />
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default LowerToolBar;
