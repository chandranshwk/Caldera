import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BiHelpCircle,
  BiX,
  BiCommand,
  BiInfoCircle,
  BiPointer,
} from "react-icons/bi";

interface HelpProps {
  type: "docs" | "sheets";
  darkMode: boolean;
}

const Help: React.FC<HelpProps> = ({ type, darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Content for Docs
  const docsShortcuts = [
    { label: "Command Bar", key: "Ctrl + K" },
    { label: "Bold", key: "Ctrl + B" },
    { label: "Italic", key: "Ctrl + I" },
    { label: "Underline", key: "Ctrl + U" },
    { label: "Strikethrough", key: "Ctrl + Shift + X" },
    { label: "Code Inline", key: "Ctrl + E" },
    { label: "Highlight", key: "Ctrl + Shift + H" }, // Added to match advice
    { label: "Blockquote", key: "Ctrl + Shift + B" }, // Added
    { label: "Align Left", key: "Ctrl + Shift + L" },
    { label: "Align Center", key: "Ctrl + Shift + E" },
    { label: "Align Right", key: "Ctrl + Shift + R" },
    { label: "Quick Search", key: "Ctrl + F" },
    { label: "Undo / Redo", key: "Ctrl + Z / Y" },
    { label: "Clear Format", key: "Ctrl + \\" }, // Added the "Panic Button"
    { label: "Toolbar P1", key: "Alt + 1" },
    { label: "Toolbar P2", key: "Alt + 2" },
    { label: "Toolbar P3", key: "Alt + 3" },
  ];

  const docsAdvice = [
    "Dynamic Lists: Use the 'Upper-Dock' (Page 1) to toggle both Ordered and Unordered lists. These are optimized for clean document structure.",
    "Expressive Highlighting: Beyond standard yellow, use the 'Upper-Dock' color picker to apply different highlight shades for categorized note-taking.",
    "Navigation: Use Alt + 1, 2, or 3 to quickly flip through the Upper Toolbar categories.",
    "Context Menus: Right-click on any Table to access specialized row and column management tools.",
    "The Vault: Store frequently used assets in Page 2 of the Upper-Dock for quick injection into your documents.",
  ];

  // Content for Sheets
  const sheetsShortcuts = [
    { label: "Edit Cell", key: "F2" },
    { label: "Sum Function", key: "Alt + =" },
    { label: "Format as Currency", key: "Ctrl + Shift + 4" },
    { label: "Insert Row", key: "Ctrl + Alt + +" },
    { label: "Delete Row", key: "Ctrl + Alt + -" },
    { label: "Absolute Ref ($)", key: "F4" },
    { label: "Jump to Edge", key: "Ctrl + Arrow" },
  ];

  const sheetsAdvice = [
    "Formulas: Always start with '=' to trigger the calculation engine.",
    "Data Entry: Press 'Tab' to move right, and 'Enter' to move down to the next row.",
    "Range Selection: Click and drag the bottom-right corner of a cell to auto-fill or extend formulas.",
  ];

  // Dynamic Content Selection
  const activeShortcuts = type === "docs" ? docsShortcuts : sheetsShortcuts;
  const activeAdvice = type === "docs" ? docsAdvice : sheetsAdvice;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`p-2 absolute top-18 right-16 rounded-xl transition-all h-max w-max duration-200 z-10 ${
          darkMode
            ? "hover:bg-white/10 border text-slate-400"
            : "hover:bg-slate-100 bg-white text-slate-500 shadow-md"
        }`}
        title="Help & Shortcuts"
      >
        <BiHelpCircle size={22} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border ${
                darkMode
                  ? "bg-[#1c1c1e] border-white/10"
                  : "bg-white border-slate-200"
              }`}
            >
              {/* Header */}
              <div
                className={`flex items-center justify-between px-8 py-5 border-b ${
                  darkMode ? "border-white/5" : "border-slate-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl ${
                      darkMode
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    <BiCommand size={20} />
                  </div>
                  <h2
                    className={`text-lg font-bold ${
                      darkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {type === "docs"
                      ? "Forge Editor Guide"
                      : "Forge Sheets Guide"}
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className={`p-2 rounded-full transition-colors ${
                    darkMode
                      ? "hover:bg-white/10 text-slate-500"
                      : "hover:bg-slate-100 text-slate-400"
                  }`}
                >
                  <BiX size={28} />
                </button>
              </div>

              {/* Body */}
              <div className="p-8 space-y-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
                {/* Visual Guide: Tool Status */}
                <section>
                  <h3
                    className={`text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 ${
                      darkMode ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    <BiPointer /> Identifying Active Tools
                  </h3>
                  <div
                    className={`flex gap-6 p-4 rounded-2xl border ${
                      darkMode
                        ? "bg-white/5 border-white/5"
                        : "bg-slate-50 border-slate-100 shadow-sm"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={`px-4 py-2 rounded-xl border border-transparent group transition-all ${
                          darkMode
                            ? "hover:bg-slate-50 hover:text-black"
                            : "hover:bg-slate-950 hover:text-white"
                        }`}
                      >
                        <span
                          className={`font-bold ${
                            darkMode
                              ? "text-slate-100 group-hover:text-black"
                              : "text-slate-700 group-hover:text-white"
                          }`}
                        >
                          Tt
                        </span>
                      </div>
                      <span className="text-[10px] font-bold uppercase opacity-50">
                        Inactive
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={`px-4 py-2 rounded-xl scale-110 border border-transparent shadow-lg ${
                          darkMode
                            ? "bg-slate-50 text-slate-950"
                            : "bg-slate-950 text-white"
                        }`}
                      >
                        <span className="font-bold">Tt</span>
                      </div>
                      <span className="text-[10px] font-bold uppercase text-blue-500">
                        Active State
                      </span>
                    </div>

                    <p
                      className={`text-xs self-center leading-relaxed max-w-60 ${
                        darkMode ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      Active tools scale slightly and switch to high-contrast
                      colors (White/Black) to signal they are currently applied
                      to your selection.
                    </p>
                  </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Shortcuts */}
                  <section>
                    <h3
                      className={`text-xs font-bold uppercase tracking-widest mb-4 ${
                        darkMode ? "text-slate-500" : "text-slate-400"
                      }`}
                    >
                      Keyboard Shortcuts
                    </h3>
                    <div className="space-y-2">
                      {activeShortcuts.map((s, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center text-[13px]"
                        >
                          <span
                            className={
                              darkMode ? "text-slate-300" : "text-slate-600"
                            }
                          >
                            {s.label}
                          </span>
                          <code
                            className={`px-2 py-0.5 rounded font-mono text-[11px] ${
                              darkMode
                                ? "bg-white/5 text-blue-400 border border-white/10"
                                : "bg-slate-100 text-blue-600 border border-slate-200"
                            }`}
                          >
                            {s.key}
                          </code>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Advice */}
                  <section className="space-y-4">
                    <h3
                      className={`text-xs font-bold uppercase tracking-widest mb-4 ${
                        darkMode ? "text-slate-500" : "text-slate-400"
                      }`}
                    >
                      Editor Advice
                    </h3>
                    {activeAdvice.map((advice, i) => (
                      <div
                        key={i}
                        className={`flex gap-3 p-4 rounded-xl border ${
                          darkMode
                            ? "bg-[#252529] border-white/5 text-slate-300"
                            : "bg-white border-slate-200 text-slate-600 shadow-sm"
                        }`}
                      >
                        <BiInfoCircle
                          className="shrink-0 text-blue-500"
                          size={18}
                        />
                        <p className="text-[12px] leading-relaxed">{advice}</p>
                      </div>
                    ))}
                  </section>
                </div>
              </div>

              {/* Footer */}
              <div
                className={`px-8 py-4 flex justify-between items-center ${
                  darkMode ? "bg-white/5" : "bg-slate-50"
                }`}
              >
                <span
                  className={`text-[11px] font-medium ${
                    darkMode ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  Forge Editor v1.2.0
                </span>
                <p
                  className={`text-[11px] ${darkMode ? "text-slate-500" : "text-slate-400"}`}
                >
                  Press{" "}
                  <kbd className="font-sans px-1.5 py-0.5 rounded border border-current opacity-50">
                    Esc
                  </kbd>{" "}
                  to exit
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Help;
