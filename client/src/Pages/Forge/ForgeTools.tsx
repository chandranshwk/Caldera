import { Editor, useEditorState } from "@tiptap/react";
import {
  BiBold,
  BiCheckDouble,
  BiCloudUpload,
  BiCodeBlock,
  BiCommentDetail,
  BiExport,
  BiItalic,
  BiListOl,
  BiListUl,
  BiSearch,
  BiShieldQuarter,
  BiStrikethrough,
  BiUnderline,
} from "react-icons/bi";
import {
  BiColumns,
  BiLayout,
  BiImageAdd,
  BiTable,
  BiLink,
  BiTask,
  BiAlignLeft,
  BiPaste,
} from "react-icons/bi";
import {
  RiDoubleQuotesL,
  RiFootprintLine,
  RiFileSettingsLine,
} from "react-icons/ri";

import { useMemo, useState } from "react";
import type { ToolbarButtonProps } from "./ForgeView";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";

export const useForgeTools = (editor: Editor | null) => {
  const [activeFont, setActiveFont] = useState<string>("Inter");
  const states = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor?.isActive("bold"),
      isItalic: ctx.editor?.isActive("italic"),
      isUnderline: ctx.editor?.isActive("underline"),
      isStrike: ctx.editor?.isActive("strike"),
      isHeading1: ctx.editor?.isActive("heading", { level: 1 }),
      // Add any other states you need to track here
    }),
  });
  const LOWERTOOLS: ToolbarButtonProps[] = useMemo(() => {
    return [
      {
        id: "bold",
        icon: <BiBold />,
        title: "Bold",
        color: "bg-[#e74c3c]",
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold") ?? false,
      },
      {
        id: "italic",
        icon: <BiItalic />,
        title: "Italic",
        color: "bg-[#3498db]",
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic") ?? false,
      },
      {
        id: "underline",
        icon: <BiUnderline />,
        title: "Underline",
        color: "bg-[#2ecc71]",
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline") ?? false,
      },
      {
        id: "strike_through",
        icon: <BiStrikethrough />,
        title: "Strike Through",
        color: "bg-[#E77E3C]",
        onClick: () => editor?.chain().focus().toggleStrike().run(),
        isActive: editor?.isActive("strike") ?? false,
      },
    ];
  }, [editor, states]);
  const TOPTOOLS: ToolbarButtonProps[][] = useMemo(() => {
    return [
      // PAGE 1: ARCHITECTURE & LAYOUT (Alt + 1)
      [
        {
          id: "layout",
          icon: <BiLayout />,
          title: "Page Setup",
          color: "bg-blue-500",
          onClick: () => console.log("Margins/Orientation"),
        },
        {
          id: "columns",
          icon: <BiColumns />,
          title: "Columns",
          color: "bg-indigo-500",
          onClick: () => console.log("Column Split"),
        },
        {
          id: "align",
          icon: <BiAlignLeft />,
          title: "Alignment",
          color: "bg-slate-500",
          onClick: () => console.log("Alignment"),
        },
        {
          id: "lists_ul",
          icon: <BiListUl />,
          title: "Bullets",
          color: "bg-teal-500",
          onClick: () => console.log("Unordered List"),
        },
        {
          id: "lists_ol",
          icon: <BiListOl />,
          title: "Numbering",
          color: "bg-emerald-500",
          onClick: () => console.log("Ordered List"),
        },
        {
          id: "indent",
          icon: <BiPaste />,
          title: "Indents",
          color: "bg-cyan-500",
          onClick: () => console.log("Tab Spacing"),
        },
        {
          id: "search",
          icon: <BiSearch />,
          title: "Find",
          color: "bg-sky-500",
          onClick: () => console.log("Search/Replace"),
        },
      ],

      // PAGE 2: INTERACTIVE & VAULT (Alt + 2)
      [
        {
          id: "vault",
          icon: <BiImageAdd />,
          title: "The Vault",
          color: "bg-purple-600",
          onClick: () => console.log("Open Vault"),
        },
        {
          id: "table",
          icon: <BiTable />,
          title: "Table",
          color: "bg-orange-500",
          onClick: () => console.log("Grid Insert"),
        },
        {
          id: "link",
          icon: <BiLink />,
          title: "Link",
          color: "bg-sky-400",
          onClick: () => console.log("Hyperlink"),
        },
        {
          id: "quotes",
          icon: <RiDoubleQuotesL />,
          title: "Quote",
          color: "bg-yellow-600",
          onClick: () => console.log("Blockquote"),
        },
        {
          id: "code",
          icon: <BiCodeBlock />,
          title: "Code",
          color: "bg-zinc-700",
          onClick: () => console.log("Code Block"),
        },
        {
          id: "nexus",
          icon: <BiTask />,
          title: "Nexus Link",
          color: "bg-rose-500",
          onClick: () => console.log("Task Create"),
        },
        {
          id: "footer",
          icon: <RiFootprintLine />,
          title: "Footnote",
          color: "bg-lime-600",
          onClick: () => console.log("Add Footnote"),
        },
      ],

      // PAGE 3: REVIEW & PERSISTENCE (Alt + 3)
      [
        {
          id: "save",
          icon: <BiCloudUpload />,
          title: "Cloud Sync",
          color: "bg-amber-500",
          onClick: () => console.log("Supabase Write"),
        },
        {
          id: "history",
          icon: <MdOutlineSettingsBackupRestore />,
          title: "Snapshots",
          color: "bg-cyan-600",
          onClick: () => console.log("Version History"),
        },
        {
          id: "comments",
          icon: <BiCommentDetail />,
          title: "Comments",
          color: "bg-blue-400",
          onClick: () => console.log("Review Pane"),
        },
        {
          id: "spell",
          icon: <BiCheckDouble />,
          title: "Proofing",
          color: "bg-green-600",
          onClick: () => console.log("Spell Check"),
        },
        {
          id: "protect",
          icon: <BiShieldQuarter />,
          title: "Lock",
          color: "bg-gray-700",
          onClick: () => console.log("Permission Lock"),
        },
        {
          id: "export",
          icon: <BiExport />,
          title: "Export",
          color: "bg-red-500",
          onClick: () => console.log("PDF/Docx Export"),
        },
        {
          id: "metadata",
          icon: <RiFileSettingsLine />,
          title: "Info",
          color: "bg-zinc-500",
          onClick: () => console.log("Word Count/Metadata"),
        },
      ],
    ];
  }, [editor, states]);

  const TEXTSIZESOPTIONS = useMemo(() => {
    // 1. Return the array itself
    return Array.from({ length: 10 }, (_, i) => {
      const size = (i + 1) * 2;
      const label = `${size}px`;

      // 2. Return the object for each iteration
      return {
        label,
        onClick: () => console.log(`${label} selected`),
      };
    });
  }, []);

  const HEADINGSOPTIONS = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const level = (i + 1) as 1 | 2 | 3 | 4 | 5 | 6;
      const label = `Heading ${level}`;

      // 2. Return the object for each iteration
      return {
        label,
        onClick: () => editor?.chain().focus().toggleHeading({ level }).run(),
      };
    });
  }, [editor]); // Added editor dependency so clicking H1 actually works

  const FONTSOPTIONS = useMemo(() => {
    return [
      { label: "Arial", onClick: () => setActiveFont("Arial") },
      {
        label: "Times New Roman",
        onClick: () => setActiveFont("Times New Roman"),
      },
      {
        label: "Courier New",
        onClick: () => setActiveFont("Courier New"),
      },
      { label: "Georgia", onClick: () => setActiveFont("Georgia") },
      { label: "Verdana", onClick: () => setActiveFont("Verdana") },
    ];
  }, []);

  return {
    TOPTOOLS,
    LOWERTOOLS,
    editor,
    TEXTSIZESOPTIONS,
    HEADINGSOPTIONS,
    FONTSOPTIONS,
    activeFont,
    setActiveFont,
  };
};
