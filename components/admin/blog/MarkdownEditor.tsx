"use client";

import React, { useState } from "react";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Eye,
  Edit3,
  Columns,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder = "Write post content in Markdown...",
  minHeight = "320px",
}: MarkdownEditorProps) {
  const [activeView, setActiveView] = useState<"write" | "preview" | "split">("write");

  const insertFormatting = (prefix: string, suffix = "") => {
    const textarea = document.getElementById("markdown-textarea") as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end) || "text";

    const replacement = `${prefix}${selectedText}${suffix}`;
    const newValue = text.substring(0, start) + replacement + text.substring(end);

    onChange(newValue);

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 10);
  };

  // Simple Markdown-to-HTML parser for instantaneous live preview
  const renderMarkdownPreview = (content: string) => {
    if (!content.trim()) {
      return `<p class="text-slate-400 italic">Nothing to preview yet. Start typing in Markdown...</p>`;
    }

    let html = content
      // Escape script tags
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-base font-bold text-slate-900 mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-lg font-extrabold text-slate-900 mt-6 mb-3 border-b border-slate-100 pb-1">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-xl font-black text-slate-900 mt-6 mb-3">$1</h1>')
      // Blockquotes
      .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-slate-300 pl-4 italic text-slate-600 my-3">$1</blockquote>')
      // Code blocks
      .replace(/```([\s\S]*?)```/gim, '<pre class="bg-slate-900 text-slate-100 p-3.5 rounded-xl font-mono text-xs overflow-x-auto my-3">$1</pre>')
      // Inline code
      .replace(/`([^`]+)`/gim, '<code class="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>')
      // Bold & Italic
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-slate-900">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#800020] underline font-medium hover:text-[#5A0017]">$1</a>')
      // Unordered lists
      .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-slate-700 leading-relaxed">$1</li>')
      // Ordered lists
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal text-slate-700 leading-relaxed">$1</li>')
      // Paragraphs
      .replace(/\n$/gim, "<br />");

    return html;
  };

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs">
      {/* Formatting Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 p-2 bg-slate-50 border-b border-slate-200/80">
        <div className="flex items-center gap-1 flex-wrap">
          <button
            type="button"
            onClick={() => insertFormatting("**", "**")}
            className="p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
            title="Bold (**text**)"
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("*", "*")}
            className="p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
            title="Italic (*text*)"
          >
            <Italic className="h-4 w-4" />
          </button>

          <div className="h-4 w-px bg-slate-200 mx-0.5" />

          <button
            type="button"
            onClick={() => insertFormatting("## ")}
            className="p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
            title="Heading 2 (## Title)"
          >
            <Heading2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("### ")}
            className="p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
            title="Heading 3 (### Subtitle)"
          >
            <Heading3 className="h-4 w-4" />
          </button>

          <div className="h-4 w-px bg-slate-200 mx-0.5" />

          <button
            type="button"
            onClick={() => insertFormatting("- ")}
            className="p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
            title="Bullet List (- item)"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("1. ")}
            className="p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
            title="Numbered List (1. item)"
          >
            <ListOrdered className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("> ")}
            className="p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
            title="Blockquote (> quote)"
          >
            <Quote className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("```\n", "\n```")}
            className="p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
            title="Code Block (```code```)"
          >
            <Code className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("[", "](https://)")}
            className="p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
            title="Hyperlink [text](url)"
          >
            <LinkIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Write / Preview / Split Tab Switch */}
        <div className="flex items-center gap-1 bg-slate-200/70 p-0.5 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveView("write")}
            className={cn(
              "flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg transition-all cursor-pointer",
              activeView === "write"
                ? "bg-white text-slate-900 shadow-2xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Editor</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveView("preview")}
            className={cn(
              "flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg transition-all cursor-pointer",
              activeView === "preview"
                ? "bg-white text-slate-900 shadow-2xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Preview</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveView("split")}
            className={cn(
              "flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg transition-all cursor-pointer",
              activeView === "split"
                ? "bg-white text-slate-900 shadow-2xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            )}
            title="Split (stacked on mobile, side-by-side on desktop)"
          >
            <Columns className="h-3.5 w-3.5" />
            <span>Split</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      {activeView === "write" ? (
        <textarea
          id="markdown-textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ minHeight }}
          className="w-full p-4 text-sm font-mono text-slate-800 bg-white focus:outline-none placeholder:text-slate-400 resize-y leading-relaxed"
        />
      ) : activeView === "preview" ? (
        <div
          style={{ minHeight }}
          className="w-full p-5 text-sm text-slate-800 bg-white overflow-y-auto prose prose-slate max-w-none leading-relaxed"
          dangerouslySetInnerHTML={{ __html: renderMarkdownPreview(value) }}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          <textarea
            id="markdown-textarea"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            style={{ minHeight }}
            className="w-full p-4 text-sm font-mono text-slate-800 bg-white focus:outline-none placeholder:text-slate-400 resize-y leading-relaxed"
          />
          <div
            style={{ minHeight }}
            className="w-full p-5 text-sm text-slate-800 bg-slate-50/50 overflow-y-auto prose prose-slate max-w-none leading-relaxed"
            dangerouslySetInnerHTML={{ __html: renderMarkdownPreview(value) }}
          />
        </div>
      )}
    </div>
  );
}
