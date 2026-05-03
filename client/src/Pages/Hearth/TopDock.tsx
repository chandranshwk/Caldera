import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface Props {
  darkMode: boolean;
  openDock?: boolean;
  setOpenDock?: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopDock: React.FC<Props> = ({ darkMode, openDock, setOpenDock }) => {
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Physical key 'H' (works regardless of caps/language)
      // 2. Alt modifier is held
      if (e.code === "KeyH" && e.altKey) {
        // 3. Block browser Help menus or Ribbon focus
        if (setOpenDock) {
          console.log("Toggle Shortcut Hit!"); // Check console to verify it triggers
          setOpenDock((prev) => !prev);
        }
      }
    };

    // Use 'true' to capture at the earliest possible stage
    window.addEventListener("keydown", handleKeyDown, true);

    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [setOpenDock]);
  return (
    <div
      className={`relative flex flex-col z-999 justify-center h-max w-full transition-colors duration-300 ${
        darkMode ? "bg-[#18181b] border-zinc-800" : "bg-white border-slate-200"
      }`}
    >
      <AnimatePresence>
        {openDock && (
          <motion.div
            ref={toolbarRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="relative flex flex-col items-center justify-center pt-1 pb-1 px-6">
              {/* Main Toolbar Row */}
              <div className="flex items-center justify-center w-full gap-2">
                {/* Nav Left */}
                <button
                  className={`p-2 rounded-lg transition-all ${
                    darkMode
                      ? "hover:bg-zinc-800 text-zinc-400 hover:text-white"
                      : "hover:bg-zinc-100 text-slate-500"
                  }`}
                >
                  <LuChevronLeft size={18} />
                </button>

                {/* Tools List */}
                <div className="flex items-center gap-1.5 px-2">
                  {[1, 2, 3, 4, 5, 6].map((tool, idx) => {
                    const isActive = tool === 1;
                    return (
                      <div key={idx} className="relative group">
                        <button
                          className={`
                      relative flex items-center justify-center px-4 py-1.5 rounded-full transition-all duration-200
                      ${
                        isActive
                          ? darkMode
                            ? "bg-white text-black shadow-lg"
                            : "bg-slate-900 text-white shadow-md"
                          : darkMode
                            ? "text-zinc-400 hover:bg-zinc-800"
                            : "text-slate-500 hover:bg-slate-100"
                      }
                    `}
                        >
                          <span className="text-sm font-bold tracking-tight">
                            {tool}
                          </span>
                          {isActive && (
                            <motion.div
                              layoutId="activeDot"
                              className={`absolute -bottom-1 size-2 rounded-full ${darkMode ? "bg-white border border-black" : "bg-slate-900 border border-white"}`}
                            />
                          )}
                        </button>

                        {/* Tooltip */}
                        <div className="absolute z-999 -top-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <div
                            className={`px-2 py-1 rounded text-[10px] font-black uppercase shadow-xl border ${
                              darkMode
                                ? "bg-zinc-800 border-white/10 text-white"
                                : "bg-white border-zinc-200 text-slate-600"
                            }`}
                          >
                            Tool {tool}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Nav Right */}
                <button
                  className={`p-2 rounded-lg transition-all ${
                    darkMode
                      ? "hover:bg-zinc-800 text-zinc-400 hover:text-white"
                      : "hover:bg-zinc-100 text-slate-500"
                  }`}
                >
                  <LuChevronRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PAGINATION DOTS - Always visible outside AnimatePresence */}
      <div
        className={`flex justify-center gap-1.5 transition-all duration-300 ${openDock ? "mt-3 mb-2" : "py-3"}`}
      >
        {[1, 2, 3, 4, 5, 6].map((_, i) => (
          <button
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === 0
                ? `w-6 ${darkMode ? "bg-white" : "bg-slate-900"}`
                : `w-1.5 ${darkMode ? "bg-zinc-700" : "bg-slate-200 hover:bg-slate-300"}`
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TopDock;
