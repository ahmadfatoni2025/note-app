"use client";

import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link,
  Table as TableIcon,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Highlighter,
  CheckSquare
} from "lucide-react";

interface ToolbarProps {
  editor: Editor;
}

const ToolbarButton = ({ onClick, isActive, children, title }: any) => (
  <button
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    className={`toolbar-btn ${isActive ? "active" : ""}`}
    title={title}
  >
    {children}
  </button>
);

export default function Toolbar({ editor }: ToolbarProps) {
  if (!editor) return null;

  const toggleLink = () => {
    const url = window.prompt("Masukkan URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    } else {
      editor.chain().focus().unsetLink().run();
    }
  };

  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  return (
    <div className="editor-toolbar sticky top-0 z-20 py-2 bg-[#191919]/90 backdrop-blur-sm border-b border-[#2f2f2f] mb-8">
      <div className="flex flex-nowrap overflow-x-auto gap-1 items-center custom-scrollbar-hide">
        <div className="flex items-center gap-0.5 px-2">
          <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Undo">
            <Undo size={14} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Redo">
            <Redo size={14} />
          </ToolbarButton>
        </div>

        <div className="w-px h-4 bg-[#2f2f2f] mx-1" />

        <div className="flex items-center gap-0.5 px-2">
          <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive("bold")} title="Bold">
            <Bold size={14} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive("italic")} title="Italic">
            <Italic size={14} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive("underline")} title="Underline">
            <UnderlineIcon size={14} />
          </ToolbarButton>
        </div>

        <div className="w-px h-4 bg-[#2f2f2f] mx-1" />

        <div className="flex items-center gap-0.5 px-2">
          <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive("heading", { level: 1 })} title="H1">
            <Heading1 size={14} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive("heading", { level: 2 })} title="H2">
            <Heading2 size={14} />
          </ToolbarButton>
        </div>

        <div className="w-px h-4 bg-[#2f2f2f] mx-1" />

        <div className="flex items-center gap-0.5 px-2">
          <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive("bulletList")} title="Bullet List">
            <List size={14} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive("orderedList")} title="Numbered List">
            <ListOrdered size={14} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleTaskList().run()} isActive={editor.isActive("taskList")} title="Checklist">
            <CheckSquare size={14} />
          </ToolbarButton>
        </div>

        <div className="w-px h-4 bg-[#2f2f2f] mx-1" />

        <div className="flex items-center gap-0.5 px-2">
          <ToolbarButton onClick={toggleLink} isActive={editor.isActive("link")} title="Link">
            <Link size={14} />
          </ToolbarButton>
          <ToolbarButton onClick={addTable} title="Table">
            <TableIcon size={14} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleHighlight().run()} isActive={editor.isActive("highlight")} title="Highlight">
            <Highlighter size={14} />
          </ToolbarButton>
        </div>
      </div>
    </div>
  );
}
