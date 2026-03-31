import { Editor, useEditorState } from "@tiptap/react";
import {
  BiBold,
  BiCheckDouble,
  BiCloudUpload,
  BiCodeBlock,
  BiCommentDetail,
  BiExport,
  BiHighlight,
  BiItalic,
  BiListOl,
  BiListUl,
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
import { RiDoubleQuotesL, RiFileSettingsLine } from "react-icons/ri";

import { useMemo, useState } from "react";
import type { ToolbarButtonProps } from "./ForgeView";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { FiAlignCenter } from "react-icons/fi";

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
    if (!editor) return [];

    return [
      // PAGE 1: CORE WRITING (High-Frequency Actions)
      [
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
          id: "align_left", // Split alignment for better UX or use a dropdown
          icon: <BiAlignLeft />,
          title: "Align Left",
          color: "bg-slate-500",
          onClick: () => editor.chain().focus().setTextAlign("left").run(),
        },
        {
          id: "align_center",
          icon: <FiAlignCenter />,
          title: "Align Center",
          color: "bg-slate-600",
          onClick: () => editor.chain().focus().setTextAlign("center").run(),
        },
        {
          id: "indent",
          icon: <BiPaste />,
          title: "Indents",
          color: "bg-cyan-500",
          onClick: () => console.log("Tab Spacing"), // Requires Indent extension
        },
        {
          id: "quotes",
          icon: <RiDoubleQuotesL />,
          title: "Inline Quote",
          color: "bg-yellow-600",
          onClick: () => editor.chain().focus().toggleInlineQuote().run(),
          isActive: editor.isActive("inlineQuote"),
        },

        {
          id: "highlight",
          icon: <BiHighlight />,
          title: "Highlight",
          color: "bg-yellow-400",
          onClick: () => editor.chain().focus().toggleHighlight().run(),
          isActive: editor.isActive("highlight"),
        },
      ],

      // PAGE 2: ASSETS & STRUCTURE (Building the Doc)
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
          onClick: () => {},
        },
        {
          id: "link",
          icon: <BiLink />,
          title: "Link",
          color: "bg-sky-400",
          onClick: () => {
            const url = window.prompt("URL");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          },
          isActive: editor.isActive("link"),
        },
        {
          id: "code",
          icon: <BiCodeBlock />,
          title: "Code",
          color: "bg-zinc-700",
          onClick: () => editor.chain().focus().toggleCode().run(),
          isActive: editor.isActive("codeBlock"),
        },
        {
          id: "nexus",
          icon: <BiTask />,
          title: "Nexus Link",
          color: "bg-rose-500",
          onClick: () => console.log("Task Create"),
        },
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
      ],

      // PAGE 3: REVIEW & FINALIZATION (Administrative)
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
          id: "export",
          icon: <BiExport />,
          title: "Export",
          color: "bg-red-500",
          onClick: () => console.log("PDF/Docx Export"),
        },
        {
          id: "protect",
          icon: <BiShieldQuarter />,
          title: "Lock",
          color: "bg-gray-700",
          onClick: () => console.log("Permission Lock"),
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

  // Inside useForgeTools.ts

  // 1. Font Family Logic

  const FONTSOPTIONS = useMemo(() => {
    const fonts = [
      "Inter",
      "Arial",
      "Courier New",
      "Georgia",
      "Verdana",
      "Aptos",
      "Helvetica",
      "Times New Roman",
      "Lato",
    ];
    return fonts.map((font) => ({
      label: font,
      onClick: () => {
        setActiveFont(font); // Updates your UI state
        editor?.chain().focus().setFontFamily(font).run(); // Updates the Editor
      },
    }));
  }, [editor]);

  const TEXTSIZESOPTIONS = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => {
      const size = (i + 1) * 2 + 10; // 12px, 14px, etc.
      const label = `${size}px`;
      return {
        label,
        onClick: () => editor?.chain().focus().setFontSize(label).run(),
      };
    });
  }, [editor]);

  type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
  // 3. Headings Logic
  const HEADINGSOPTIONS = useMemo(() => {
    return [1, 2, 3, 4, 5, 6].map((level) => ({
      label: `Heading ${level}`,
      onClick: () =>
        editor
          ?.chain()
          .focus()
          .toggleHeading({ level: level as HeadingLevel })
          .run(),
    }));
  }, [editor]);

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
