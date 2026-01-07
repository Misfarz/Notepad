import React, { useState } from "react";
import { FiMaximize2, FiTrash2 } from "react-icons/fi";

function Pad({
  open,
  toggleFullScreen,
  isFullScreen,
  note,
  onChange,
  onDelete,
}) {
  const [cursor, setCursor] = useState({ line: 1, column: 1 });
  const [showConfirm, setShowConfirm] = useState(false);

  const title = note?.t1 ?? "";
  const body = note?.t2 ?? "";

  const wordCount = body
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  function calculateCursorPosition(text, position) {
    const lines = text.slice(0, position).split("\n");
    return {
      line: lines.length,
      column: lines[lines.length - 1].length + 1,
    };
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
            onClick={toggleFullScreen}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiMaximize2 size={16} />
          </button>
        </div>

        {/* ───────── Title Bar ───────── */}
        <div className="flex items-center justify-between px-6 h-14 border-b border-gray-800">
          <input
            value={title}
            onChange={(e) => onChange({ t1: e.target.value })}
            placeholder="Untitled note"
            className="w-[80%] bg-transparent text-lg font-semibold focus:outline-none disabled:text-gray-600"
          />   

          <button
            disabled={!note}
            onClick={() => setShowConfirm(true)}
            className={`transition ${
              note
                ? "text-gray-400 hover:text-red-400"
                : "text-gray-700 cursor-not-allowed"
            }`}
          >
            <FiTrash2 size={18} />
          </button>
        </div>

        {/* ───────── Writing Area ───────── */}
        <div className="flex-1 px-6 py-6 overflow-y-auto">
          <textarea
            value={body}
            placeholder="// Start writing your thoughts here…"
            className="w-full h-full resize-none bg-transparent focus:outline-none disabled:text-gray-600"
            onChange={(e) => {
              const text = e.target.value;
              const pos = e.target.selectionStart;

              onChange({ t2: text });
              setCursor(calculateCursorPosition(text, pos));
            }}
            onClick={(e) =>
              setCursor(calculateCursorPosition(body, e.target.selectionStart))
            }
            onKeyUp={(e) =>
              setCursor(calculateCursorPosition(body, e.target.selectionStart))
            }
          />
        </div>

        {/* ───────── Footer ───────── */}
        <div className="flex justify-between px-6 h-10 border-t border-gray-800 text-sm text-gray-300">
          <p>
            Line {cursor.line}, Column {cursor.column}
          </p>
          <p>Word count: {wordCount}</p>
        </div>
      </div>

      {/* ───────── Confirm Delete Modal ───────── */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-gray-900 text-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-2">Delete note?</h2>
            <p className="text-sm text-gray-300 mb-6">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  onDelete();
                  setShowConfirm(false);
                }}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Pad;
