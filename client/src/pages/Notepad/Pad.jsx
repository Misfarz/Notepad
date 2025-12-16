import React, { useState } from 'react';
import { FiMaximize2, FiTrash2 } from 'react-icons/fi';

function Pad({ open,toggleFullScreen ,isFullScreen}) {

       const [content, setContent] = useState("");
       const [cursor, setCursor] = useState({ line: 1, column: 1 });



       const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

       function calculateCursorPosition(text, position) {
         const lines = text.slice(0, position).split("\n");
         const line = lines.length;
         const column = lines[lines.length - 1].length + 1;

         return { line, column };
       }

       




  return (
    <main
      className={`
        h-screen transition-all duration-300 ease-in-out
        ${open ? "ml-80" : "ml-0"}
        ${isFullScreen ? "pt-0" : "pt-16"}
      `}
    >
      <div className="h-full bg-black text-white border-l border-gray-800 flex flex-col">
        {/* ───────── Top Menu Bar ───────── */}
        <div className="flex items-center justify-between px-6 h-10 border-b border-gray-800 text-sm text-gray-300">
          <div className="flex gap-5">
            {["File", "Edit", "Insert", "Format", "Tools", "View", "Help"].map(
              (item) => (
                <button key={item} className="hover:text-white transition">
                  {item}
                </button>
              )
            )}
          </div>

          <button
            className="hover:text-white transition"
            aria-label="Fullscreen"
            onClick={toggleFullScreen}
          >
            <FiMaximize2 size={16} />
          </button>
        </div>

        {/* ───────── Title Bar ───────── */}
        <div className="flex items-center justify-between px-6 h-14 border-b border-gray-800">
          <input
            type="text"
            placeholder="Untitled note"
            className="w-[80%] bg-transparent text-lg font-semibold text-white placeholder-gray-500 focus:outline-none"
          />

          <button
            className="text-gray-400 hover:text-red-400 transition"
            aria-label="Delete note"
          >
            <FiTrash2 size={18} />
          </button>
        </div>

        {/* ───────── Writing Area ───────── */}
        <div className="flex-1 px-6 py-6 overflow-y-auto">
          <textarea
            value={content}
            className="
    w-full h-full resize-none bg-transparent text-gray-200
    focus:outline-none leading-relaxed text-base
    placeholder-gray-500
  "
            placeholder="// Start writing your thoughts here…"
            onChange={(e) => {
              const text = e.target.value;
              const pos = e.target.selectionStart;

              setContent(text);
              setCursor(calculateCursorPosition(text, pos));
            }}
            onClick={(e) => {
              const pos = e.target.selectionStart;
              setCursor(calculateCursorPosition(content, pos));
            }}
            onKeyUp={(e) => {
              const pos = e.target.selectionStart;
              setCursor(calculateCursorPosition(content, pos));
            }}
          />
        </div>

        {/* ───────── pad footer with row,column and count info ───────── */}

        <div className="flex items-center justify-between px-6 h-10 border-b border-gray-800 text-sm text-gray-300">
          <p className="hover:text-white transition">
            Line {cursor.line}, Column {cursor.column}
          </p>
          <p className="hover:text-white transition">
            word count : {wordCount}
          </p>
        </div>
      </div>
    </main>
  );
}

export default Pad;
