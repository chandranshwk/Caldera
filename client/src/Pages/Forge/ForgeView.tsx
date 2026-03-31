/* eslint-disable react-refresh/only-export-components */

import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { ForgeDocument } from "../../assets/assets";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import UpperToolBar from "./UpperToolBar";
import LowerToolBar from "./LowerToolBar";
import { TextStyle } from "@tiptap/extension-text-style";
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
import { InlineList } from "../../assets/InlineList";

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

  const [activeTool, setActiveTool] = useState<ToolbarButtonProps | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoveredTopId, setHoveredTopId] = useState<string | null>(null);

  const [topPage, setTopPage] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc list-outside leading-relaxed ml-4",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal list-outside leading-relaxed ml-4",
          },
        },
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        codeBlock: false,
      }),
      HardBreak.extend({
        addKeyboardShortcuts() {
          return {
            Enter: () => {
              // 1. If we are inside a List or a CodeBlock, do NOT use HardBreak
              // This allows Tiptap to create the next <li> automatically
              if (
                this.editor.isActive("bulletList") ||
                this.editor.isActive("orderedList") ||
                this.editor.isActive("blockquote") ||
                this.editor.isActive("codeBlock")
              ) {
                return false; // Let the default Enter behavior take over
              }

              // 2. Otherwise, in normal text, insert a single line break
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
      InlineList,
      InlineQuote,
      TableRow,
      TableHeader,
      TableCell,
      TextStyle,
      FontFamily,
      FontSize,
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
              {/* Root Link (Muted) */}
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

              {/* Dynamic Breadcrumb Logic */}

              <h1
                className={`text-sm font-bold tracking-tight ${darkMode ? "text-white" : "text-slate-900"}`}
              >
                {displayName || formattedPage}
              </h1>
            </div>
          </div>

          {/* Version Indicator */}
        </div>
        {/* Upper dock Toolbar */}
        <UpperToolBar
          editor={editor}
          darkMode={darkMode}
          topPage={topPage}
          hoveredTopId={hoveredTopId}
          setTopPage={setTopPage}
          setHoveredTopId={setHoveredTopId}
          activeTool={activeTool}
          setActiveTool={setActiveTool}
        />

        {/* Content Injection Point */}
        <div
          className={`flex-1 overflow-y-auto scroll-smooth custom-scrollbar flex justify-center ${
            darkMode ? "bg-transparent" : "bg-[#F8F9FA]"
          }`}
        >
          {/* The "Paper" Surface (The Writing Area) */}
          <div
            className={`
      w-full max-w-204 bg-white min-h-264 h-fit px-16 py-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700
      ${
        darkMode
          ? " text-slate-900 border border-slate-800"
          : " text-slate-900 border border-slate-200"
      }
    `}
          >
            {/* Editor Content Area */}
            <article className="prose prose-slate max-w-none focus:outline-none  selection:bg-blue-100">
              <h1 className="mb-8 text-4xl font-bold tracking-tight">
                {displayName}
              </h1>
              <EditorContent
                editor={editor}
                className="outline-none focus:outline-0 outline-transparent outline-0 outline-offset-0 border-0 p-4 min-h-90vh bg-white rounded "
              />
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
      </div>
    </EditorContext.Provider>
  );
};

export default ProjectView;
