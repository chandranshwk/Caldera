// ForgeViewSheets.tsx

import { Link, useLocation } from "react-router-dom";
import type { ForgeDocument } from "../../assets/assets";
import { EditorContext, useEditor, EditorContent } from "@tiptap/react"; // Added EditorContent
import { useMemo } from "react";
import Help from "./Help";
import { Table } from "@tiptap/extension-table"; // Changed to default import for stability
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import StarterKit from "@tiptap/starter-kit"; // Recommended for basic editor functionality

interface ForgeViewSheetsProps {
  darkMode: boolean;
}

const ForgeViewSheets: React.FC<ForgeViewSheetsProps> = ({ darkMode }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({
        resizable: true, // Allows Excel-like column resizing
        lastColumnResizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    // Start with a large initial grid for the "infinite" feel
    content: `
    <table class="excel-table">
      <tbody>
        ${"<tr>" + "<td></td>".repeat(15) + "</tr>".repeat(40)}
      </tbody>
    </table>
  `,
  });

  const location = useLocation();
  const savedData = localStorage.getItem(
    `sheet-${location.pathname.split("/").pop()}`,
  );

  const sheet: ForgeDocument = savedData
    ? JSON.parse(savedData)
    : ({} as ForgeDocument);

  // Logic to extract the sub-page name for the breadcrumb
  const pathParts = location.pathname.split("/").filter(Boolean);
  const currentPage = pathParts[pathParts.length - 1] || "Dashboard";
  const formattedPage =
    currentPage.charAt(0).toUpperCase() + currentPage.slice(1);

  const displayName = sheet.name
    ? sheet.name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1) + " ")
        .join(" ")
    : "Untitled Document";

  // Provide the actual editor instance to the context
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
                Sheets
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
          <Help type="sheets" darkMode={darkMode} extra="top-18" />
        </div>

        {/* EXCEL-LIKE VIEW: Full-width canvas instead of centered page */}
        <div className="flex-1 overflow-auto scroll-smooth custom-scrollbar">
          <div
            className={`w-full h-full p-4 ${darkMode ? "bg-white" : "bg-white"}`}
          >
            <article className="max-w-none focus:outline-none excel-grid-container">
              {/* Inserted the Table Editor here */}
              <EditorContent editor={editor} />
            </article>
          </div>
        </div>

        {/* CSS to make the Tiptap table look and feel like Excel */}
      </div>
    </EditorContext.Provider>
  );
};

export default ForgeViewSheets;
