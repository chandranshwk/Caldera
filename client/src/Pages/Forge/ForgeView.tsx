/* eslint-disable react-refresh/only-export-components */

import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { ForgeDocument } from "../../assets/assets";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import UpperToolBar from "./UpperToolBar";
import LowerToolBar from "./LowerToolBar";
import FontFamily from "@tiptap/extension-font-family";
import { Extension } from "@tiptap/core";
import TextAlign from "@tiptap/extension-text-align";
import HighlightExtension from "@tiptap/extension-highlight";
import { Table } from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import HardBreak from "@tiptap/extension-hard-break";
import Blockquote from "@tiptap/extension-blockquote";
import { InlineQuote } from "../../assets/InlineQuote";
import { InlineBullet } from "../../assets/InlineUnorderedList";
import { InlineNumber } from "../../assets/InlineOrderedList";
import { AnimatePresence, motion } from "motion/react";
import Dropdown from "../../components/Dropdown";
import Help from "./Help";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";

interface ProjectViewProps {
  darkMode: boolean;
}

export const FontSize = Extension.create({
  name: "fontSize",

  // Change: addOptions must be a function that returns the object
  addOptions() {
    return {
      types: ["textStyle"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) =>
              element.style.fontSize.replace(/['"]+/g, ""),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontSize }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", { fontSize: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});

export interface ToolbarButtonProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  color: string;
  onClick?: () => void;
  isActive?: boolean;
}

const ProjectView: React.FC<ProjectViewProps> = ({ darkMode }) => {
  const location = useLocation();
  const savedData = localStorage.getItem(
    `doc-${location.pathname.split("/").pop()}`,
  );

  const doc: ForgeDocument = savedData
    ? JSON.parse(savedData)
    : ({} as ForgeDocument);

  // Logic to extract the sub-page name for the breadcrumb
  const pathParts = location.pathname.split("/").filter(Boolean);
  const currentPage = pathParts[pathParts.length - 1] || "Dashboard";
  const formattedPage =
    currentPage.charAt(0).toUpperCase() + currentPage.slice(1);

  const displayName = doc.name
    ? doc.name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1) + " ")
        .join(" ")
    : "Untitled Document";

  const [, setActiveTool] = useState<ToolbarButtonProps | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoveredTopId, setHoveredTopId] = useState<string | null>(null);

  const [topPage, setTopPage] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            // 'list-disc' for bullets, 'pl-4' for indentation
            class: "list-disc list-outside pl-5 space-y-1",
          },
        },

        orderedList: {
          HTMLAttributes: {
            // 'list-decimal' for numbers
            class: "list-decimal list-outside pl-5 space-y-1",
          },
        },
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        codeBlock: false,
      }),
      Extension.create({
        name: "clearFormatting",
        addKeyboardShortcuts() {
          return {
            "Mod-\\": () => {
              console.log("Clear formatting triggered via Mod-/");
              return this.editor
                .chain()
                .focus()
                .unsetAllMarks()
                .clearNodes()
                .run();
            },
          };
        },
      }),

      HardBreak.extend({
        addKeyboardShortcuts() {
          return {
            Enter: () => {
              if (
                this.editor.isActive("bulletList") ||
                this.editor.isActive("orderedList") ||
                this.editor.isActive("blockquote") ||
                this.editor.isActive("codeBlock")
              ) {
                return false;
              }
              // Otherwise, insert a hard break (Shift+Enter style) by default
              return this.editor.commands.setHardBreak();
            },
          };
        },
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"], // Allow alignment on these tags
        alignments: ["left", "center", "right", "justify"], // Optional: restrict options
        defaultAlignment: "left",
      }),
      HighlightExtension.configure({
        multicolor: true, // Allow multiple highlights on the same text
      }),
      Table.configure({
        resizable: true,
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: "border-l-4 border-slate-300 pl-4 italic",
        },
      }),
      InlineBullet,
      InlineNumber,
      InlineQuote,
      TableRow,
      TableHeader,
      TableCell,
      TextStyle,
      FontFamily,
      FontSize,
      TextStyle,
      Color,
    ],
    content: doc.des || "<p>Hello World!</p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-0 focus:outline-none",
      },
    },
  });

  // 2. Wrap EVERYTHING in the Provider

  const providerValue = useMemo(() => ({ editor }), [editor]);

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  const handleContextMenu = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Check if right-click is inside the editor and specifically a table
    if (target.closest(".tiptap") && target.closest("table")) {
      e.preventDefault();
      setContextMenu({
        visible: true,
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  // Close menu on any click
  useEffect(() => {
    const closeMenu = () =>
      setContextMenu((prev) => ({ ...prev, visible: false }));
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  const [showConfirm, setShowConfirm] = useState(false);

  const [docName, setDocName] = useState(displayName || "Untitled Document");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setDocName(newName);

    // Optional: Update localStorage immediately or onBlur
    const updatedDoc = { ...doc, name: newName };
    localStorage.setItem(
      `doc-${location.pathname.split("/").pop()}`,
      JSON.stringify(updatedDoc),
    );
  };

  return (
    <EditorContext.Provider value={providerValue}>
      <div
        className={`h-screen w-full p-8 pb-2 pt-5 transition-colors duration-300 border-l flex flex-col ${
          darkMode
            ? "bg-[#18181b] border-slate-800 text-slate-100"
            : "bg-white border-slate-200 text-slate-900"
        }`}
      >
        {/* Header Section */}
        <div
          className={`flex border-b justify-between pb-4 transition-colors ${
            darkMode ? "border-slate-800" : "border-slate-100"
          }`}
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Link
                to="/forge/dashboard"
                className={`text-sm font-semibold transition-colors ${
                  darkMode
                    ? "text-slate-500 hover:text-slate-400"
                    : "text-slate-400 hover:text-slate-500"
                }`}
              >
                The Forge
              </Link>
              <span
                className={`text-md font-light ${darkMode ? "text-slate-700" : "text-slate-200"}`}
              >
                /
              </span>
              <Link
                to="/forge/docs"
                className={`text-sm font-semibold transition-colors ${
                  darkMode
                    ? "text-slate-500 hover:text-slate-400"
                    : "text-slate-400 hover:text-slate-500"
                }`}
              >
                Docs
              </Link>
              <span
                className={`text-lg font-light ${darkMode ? "text-slate-700" : "text-slate-200"}`}
              >
                /
              </span>
              <h1
                className={`text-sm font-bold tracking-tight ${darkMode ? "text-white" : "text-slate-900"}`}
              >
                {displayName || formattedPage}
              </h1>
            </div>
          </div>
        </div>

        <UpperToolBar
          editor={editor}
          darkMode={darkMode}
          topPage={topPage}
          hoveredTopId={hoveredTopId}
          setTopPage={setTopPage}
          setHoveredTopId={setHoveredTopId}
          setActiveTool={setActiveTool}
        />

        {/* Content Injection Point */}
        <div
          className={`flex-1 overflow-y-auto scroll-smooth custom-scrollbar flex justify-center ${
            darkMode ? "bg-transparent" : "bg-[#F8F9FA]"
          }`}
        >
          <div
            className={`w-full max-w-204 bg-white min-h-264 h-fit px-16 py-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700 ${
              darkMode
                ? "text-slate-900 border border-slate-800"
                : "text-slate-900 border border-slate-200"
            }`}
          >
            <article className="prose prose-slate max-w-none focus:outline-none selection:bg-blue-100">
              <input
                type="text"
                value={docName}
                onChange={handleTitleChange}
                placeholder="Untitled Document"
                className={`
     w-full text-3xl font-bold tracking-tight outline-none border-b-2 border-transparent 
    transition-colors duration-200  leading-snug h-max pb-1 pl-4
    ${
      darkMode
        ? "text-white focus:border-white/10 placeholder:text-slate-700"
        : "text-slate-900 focus:border-slate-200 placeholder:text-slate-300"
    }
  `}
              />

              {/* onContextMenu is attached to the wrapper div */}
              <div onContextMenu={handleContextMenu} className="relative">
                <EditorContent
                  editor={editor}
                  className="outline-none focus:outline-0 outline-transparent outline-0 outline-offset-0 border-0 p-4 min-h-90vh bg-white rounded"
                />
              </div>
            </article>
          </div>
        </div>

        <LowerToolBar
          editor={editor}
          darkMode={darkMode}
          hoveredId={hoveredId}
          setHoveredId={setHoveredId}
          setActiveTool={setActiveTool}
        />

        {/* Table Context Menu */}
        {contextMenu.visible && (
          <div
            style={{
              position: "fixed",
              top: contextMenu.y,
              left: contextMenu.x,
              zIndex: 9999,
            }}
          >
            <Dropdown
              darkMode={darkMode}
              width="w-56"
              // We use a useEffect-like trigger to click the dropdown since we haven't updated Dropdown.tsx
              trigger={
                <div
                  ref={(node) => node?.click()}
                  className="w-0 h-0 overflow-hidden"
                />
              }
              items={[
                {
                  label: "Add Row Below",
                  onClick: () => editor?.chain().focus().addRowAfter().run(),
                },
                {
                  label: "Delete Row",
                  variant: "destructive",
                  onClick: () => editor?.chain().focus().deleteRow().run(),
                },
                {
                  label: "Add Column Right",
                  separator: true,
                  onClick: () => editor?.chain().focus().addColumnAfter().run(),
                },
                {
                  label: "Delete Column",
                  variant: "destructive",
                  onClick: () => editor?.chain().focus().deleteColumn().run(),
                },
                {
                  label: "Delete Entire Table",
                  variant: "destructive",
                  separator: true,
                  onClick: () => setShowConfirm(true),
                },
              ]}
            />
          </div>
        )}

        {/* Custom Confirmation Modal */}
        <AnimatePresence>
          {showConfirm && (
            <div className="fixed inset-0 z-10001 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className={`w-full max-w-[320px] p-6 rounded-2xl shadow-2xl border ${
                  darkMode
                    ? "bg-[#1c1c1e] border-white/10 text-slate-200"
                    : "bg-white border-slate-200 text-slate-700"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="size-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 text-red-500 text-xl font-bold">
                    ✕
                  </div>
                  <h3 className="text-lg font-bold">Delete Table?</h3>
                  <p
                    className={`text-sm mt-2 leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-500"}`}
                  >
                    This will permanently remove the table and all its contents.
                    This action cannot be undone.
                  </p>
                  <div className="flex gap-3 w-full mt-6">
                    <button
                      onClick={() => setShowConfirm(false)}
                      className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        darkMode
                          ? "bg-white/5 hover:bg-white/10 text-slate-300"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                      }`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        editor?.chain().focus().deleteTable().run();
                        setShowConfirm(false);
                        setContextMenu({ ...contextMenu, visible: false });
                      }}
                      className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold bg-red-600 hover:bg-red-700 text-white transition-all shadow-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
      <Help type="docs" darkMode={darkMode} />
    </EditorContext.Provider>
  );
};

export default ProjectView;
