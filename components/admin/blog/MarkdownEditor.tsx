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
  Image as ImageIcon,
  Sparkles,
  Table,
  CheckSquare,
  AlertCircle,
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
  placeholder = "Start writing your article content here...",
  minHeight = "360px",
}: MarkdownEditorProps) {
  const [activeView, setActiveView] = useState<"write" | "preview" | "split">("split");

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

  const insertTemplate = (type: "table" | "callout" | "checklist") => {
    let snippet = "";
    if (type === "callout") {
      snippet = `\n> **Key Industry Takeaway:**\n> Direct CFR Chattogram sea shipment eliminates third-party commission markups, ensuring authentic factory warranty.\n\n`;
    } else if (type === "checklist") {
      snippet = `\n### Pre-Shipment Inspection Checklist:\n- [x] Cam box surface hardness and runout verification (<0.02 mm)\n- [x] Motor inverter stability under variable electrical load\n- [x] Full cylinder trial run with Groz-Beckert needles\n\n`;
    } else if (type === "table") {
      snippet = `\n| Machine Model | Gauge (G) | Cylinder Diameter | Feeder Count |\n|---|---|---|---|\n| Double Jersey DX-34 | 28G | 34" | 84 Feeders |\n| High-Speed Interlock | 32G | 30" | 90 Feeders |\n\n`;
    }

    const textarea = document.getElementById("markdown-textarea") as HTMLTextAreaElement | null;
    if (!textarea) {
      onChange(value + snippet);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const newValue = text.substring(0, start) + snippet + text.substring(end);
    onChange(newValue);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + snippet.length, start + snippet.length);
    }, 10);
  };

  // Safe Markdown-to-HTML parser for instantaneous live preview
  const renderMarkdownPreview = (content: string) => {
    if (!content.trim()) {
      return `<div class="py-12 text-center text-slate-400 italic">No content typed yet. Type on the left or use the toolbar above to preview formatted text in real-time.</div>`;
    }

    let html = content
      // Escape script tags
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-base font-bold text-slate-900 mt-5 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-lg font-extrabold text-[#800020] mt-6 mb-3 border-b border-slate-100 pb-1">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-xl font-black text-slate-900 mt-6 mb-3">$1</h1>')
      // Blockquotes / Callout boxes
      .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-[#800020] bg-[#FDF2F4] p-3 rounded-r-xl italic text-slate-700 my-3">$1</blockquote>')
      // Code blocks
      .replace(/```([\s\S]*?)```/gim, '<pre class="bg-slate-900 text-slate-100 p-3.5 rounded-xl font-mono text-xs overflow-x-auto my-3">$1</pre>')
      // Inline code
      .replace(/`([^`]+)`/gim, '<code class="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>')
      // Bold & Italic
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-slate-900">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="italic text-slate-700">$1</em>')
      // Images
      .replace(/!\[(.*?)\]\((.*?)\)/gim, '<div class="my-4"><img src="$2" alt="$1" class="rounded-xl border border-slate-200 max-w-full h-auto" /><span class="text-[11px] text-slate-400 mt-1 block">$1</span></div>')
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#800020] underline font-semibold hover:text-[#5A0017]">$1</a>')
      // Unordered lists
      .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-slate-700 leading-relaxed">$1</li>')
      // Ordered lists
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal text-slate-700 leading-relaxed">$1</li>')
      // Checkboxes
      .replace(/- \[x\] (.*$)/gim, '<li class="flex items-center gap-2 text-emerald-700 font-medium my-1">✓ $1</li>')
      .replace(/- \[ \] (.*$)/gim, '<li class="flex items-center gap-2 text-slate-600 my-1">○ $1</li>')
      // Paragraph breaks
      .replace(/\n\n/gim, '</p><p class="my-2.5 text-slate-700 leading-relaxed text-sm">')
      .replace(/\n/gim, "<br />");

    return `<div class="prose prose-slate max-w-none text-sm leading-relaxed">${html}</div>`;
  };

  // Word count & read time
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const readTimeMin = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
      {/* Friendly Formatting Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-slate-50 border-b border-slate-200">
        {/* Formatting actions */}
        <div className="flex items-center gap-1 flex-wrap">
          <button
            type="button"
            onClick={() => insertFormatting("**", "**")}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 text-xs font-bold transition-colors cursor-pointer"
            title="Make selected text bold"
          >
            <Bold className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Bold</span>
          </button>

          <button
            type="button"
            onClick={() => insertFormatting("*", "*")}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 text-xs font-bold transition-colors cursor-pointer"
            title="Italicize selected text"
          >
            <Italic className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Italic</span>
          </button>

          <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block" />

          <button
            type="button"
            onClick={() => insertFormatting("## ")}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 text-xs font-bold transition-colors cursor-pointer"
            title="Major section heading"
          >
            <Heading2 className="h-3.5 w-3.5" />
            <span>Heading</span>
          </button>

          <button
            type="button"
            onClick={() => insertFormatting("### ")}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 text-xs font-bold transition-colors cursor-pointer"
            title="Sub-heading"
          >
            <Heading3 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Subhead</span>
          </button>

          <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block" />

          <button
            type="button"
            onClick={() => insertFormatting("- ")}
            className="p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-lg text-slate-700 hover:bg-slate-200/70 transition-colors cursor-pointer"
            title="Bullet list item"
          >
            <List className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() => insertFormatting("1. ")}
            className="p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-lg text-slate-700 hover:bg-slate-200/70 transition-colors cursor-pointer"
            title="Numbered list item"
          >
            <ListOrdered className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() => insertFormatting("> ")}
            className="p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-lg text-slate-700 hover:bg-slate-200/70 transition-colors cursor-pointer"
            title="Quote / Highlight Callout"
          >
            <Quote className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() => insertFormatting("[", "](https://)")}
            className="p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-lg text-slate-700 hover:bg-slate-200/70 transition-colors cursor-pointer"
            title="Insert Website Link"
          >
            <LinkIcon className="h-3.5 w-3.5" />
          </button>

          {/* Snippet dropdown templates */}
          <div className="h-4 w-px bg-slate-200 mx-1" />

          <button
            type="button"
            onClick={() => insertTemplate("callout")}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-100/70 hover:bg-amber-100 text-amber-900 text-[11px] font-bold transition-colors cursor-pointer"
            title="Insert a highlighted Callout Box"
          >
            <Sparkles className="h-3 w-3" />
            <span className="hidden md:inline">+ Callout Box</span>
          </button>

          <button
            type="button"
            onClick={() => insertTemplate("checklist")}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-100/70 hover:bg-emerald-100 text-emerald-900 text-[11px] font-bold transition-colors cursor-pointer"
            title="Insert an Inspection Checklist"
          >
            <CheckSquare className="h-3 w-3" />
            <span className="hidden md:inline">+ Checklist</span>
          </button>
        </div>

        {/* View mode toggle pills */}
        <div className="flex items-center gap-1 bg-slate-200/80 p-0.5 rounded-xl text-xs font-semibold self-end sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveView("write")}
            className={cn(
              "flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer",
              activeView === "write"
                ? "bg-white text-slate-900 shadow-2xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            <Edit3 className="h-3 w-3" />
            <span>Write</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveView("split")}
            className={cn(
              "flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer",
              activeView === "split"
                ? "bg-white text-slate-900 shadow-2xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            )}
            title="Side-by-side editing and live preview"
          >
            <Columns className="h-3 w-3" />
            <span>Side-by-Side</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveView("preview")}
            className={cn(
              "flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer",
              activeView === "preview"
                ? "bg-white text-slate-900 shadow-2xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            <Eye className="h-3 w-3" />
            <span>Live Preview</span>
          </button>
        </div>
      </div>

      {/* Editor Content Box */}
      {activeView === "write" ? (
        <textarea
          id="markdown-textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ minHeight }}
          className="w-full p-4 sm:p-5 text-sm font-mono text-slate-800 bg-white focus:outline-none placeholder:text-slate-400 resize-y leading-relaxed"
        />
      ) : activeView === "preview" ? (
        <div
          style={{ minHeight }}
          className="w-full p-6 text-sm text-slate-800 bg-white overflow-y-auto leading-relaxed"
          dangerouslySetInnerHTML={{ __html: renderMarkdownPreview(value) }}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          <div>
            <div className="px-4 py-1.5 bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Markdown Editor
            </div>
            <textarea
              id="markdown-textarea"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              style={{ minHeight }}
              className="w-full p-4 text-sm font-mono text-slate-800 bg-white focus:outline-none placeholder:text-slate-400 resize-y leading-relaxed"
            />
          </div>
          <div>
            <div className="px-4 py-1.5 bg-emerald-50/50 border-b border-emerald-100 text-[10px] font-bold text-emerald-700 uppercase tracking-wider flex items-center justify-between">
              <span>Live Website Preview</span>
              <span className="text-[10px] font-normal text-slate-400">Updates as you type</span>
            </div>
            <div
              style={{ minHeight }}
              className="w-full p-5 text-sm text-slate-800 bg-slate-50/40 overflow-y-auto leading-relaxed"
              dangerouslySetInnerHTML={{ __html: renderMarkdownPreview(value) }}
            />
          </div>
        </div>
      )}

      {/* Bottom status stats */}
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
        <div className="flex items-center gap-3">
          <span><strong>{wordCount}</strong> words</span>
          <span>•</span>
          <span>~<strong>{readTimeMin}</strong> min read</span>
        </div>
        <span className="text-slate-400 text-[10px]">Auto-formatted for all screen sizes</span>
      </div>
    </div>
  );
}
