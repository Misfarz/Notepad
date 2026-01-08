import React, { act, useRef, useState,useEffect } from "react";
import { FiMaximize2, FiTrash2 } from "react-icons/fi";

/* ───────── Menu Configuration ───────── */
const MENUS = {
  file: ["New", "Open", "Save", "Save As", "Print"],
  edit: ["Undo", "Redo", "Cut", "Copy","delete","select all","find and replace" ,"Paste"],
  format: ["Bold", "Italic", "Underline"],
  tools: ["Word Count", "Spell Check"],
  help: ["About", "Shortcuts"],
};

function Pad({
  open,
  toggleFullScreen,
  isFullScreen,
  note,
  onChange,
  onDelete,
  onCreate
}) {
  const [cursor, setCursor] = useState({ line: 1, column: 1 });
  const [showConfirm, setShowConfirm] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showSaveAs, setShowSaveAs] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [showToast, setShowToast] = useState(false);
  const noteArea = useRef(null)
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);


  const title = note?.t1 ?? "";
  const body = note?.t2 ?? "";

  const wordCount = body.trim().split(/\s+/).filter(Boolean).length;

  /* ───────── Cursor Position ───────── */
  function calculateCursorPosition(text, position) {
    const lines = text.slice(0, position).split("\n");
    return {
      line: lines.length,
      column: lines[lines.length - 1].length + 1,
    };
  }

  function selectAll(){
      
    noteArea.current.select()
    noteArea.current.focus()
  }

  function handleFileSelect(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target.result;
    // Assuming onCreate sets a new note, you can use onChange to populate it
    onCreate();          // create a new note first
    onChange({ t1: file.name, t2: text }); // set title & body
  };
  reader.readAsText(file);

  // Reset the input so the same file can be selected again if needed
  event.target.value = "";
}


  /* ───────── Menu Actions ───────── */
  function handleMenuAction(menu, action) {
    setActiveMenu(null);

    if (menu === "file") handleFileAction(action);
    if(menu === "edit") handleEditAction(action);
    else console.log(`${menu.toUpperCase()} → ${action}`);
  }

  function downloadTxtFile(filename, content) {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  }

  function handleFileAction(action) {
    switch (action) {
      case "New":
        onCreate()
        break;
      case "Open":
        fileInputRef.current.click(); 
        break;
        break;
      case "Save":
        // Since it auto-saves to localStorage, we just give visual feedback
        setShowToast(true);
        break;
      case "Save As":
        setSaveName(title || "Untitled");
        setShowSaveAs(true);
        break;
      case "Print":
        window.print();
        break;
      default:
        break;
    }
  }


  function handleEditAction(action){

    switch (action) {
      case "select all":
        selectAll()
        break;
      default:
        break;
    }

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
            {Object.keys(MENUS).map((menu) => (
              <div key={menu} className="relative">
                <button
                  onClick={() =>
                    setActiveMenu(activeMenu === menu ? null : menu)
                  }
                  className={`capitalize hover:text-white transition ${
                    activeMenu === menu ? "text-white" : ""
                  }`}
                >
                  {menu}
                </button>

                {activeMenu === menu && (
                  <>
                    {/* Click outside overlay */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setActiveMenu(null)}
                    />

                    {/* Dropdown */}
                    <div className="absolute top-full left-0 z-50 mt-1 w-48 bg-gray-900 border border-gray-700 rounded-md shadow-lg py-1">
                      {MENUS[menu].map((option) => (
                        <button
                          key={option}
                          onClick={() => handleMenuAction(menu, option)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-700 transition"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={toggleFullScreen}
            className="text-gray-400 hover:text-white transition"
          >
            <FiMaximize2 size={16} />
          </button>
        </div>

        {/* ───────── file upload (option in file)───────── */}

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept=".txt"
          onChange={(e) => handleFileSelect(e)}
        />

        {/* ───────── Title Bar ───────── */}
        <div className="flex items-center justify-between px-6 h-14 border-b border-gray-800">
          <input
            value={title}
            onChange={(e) => onChange({ t1: e.target.value })}
            placeholder="Untitled note"
            className="w-[80%] bg-transparent text-lg font-semibold focus:outline-none"
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
            ref={noteArea}
            value={body}
            placeholder="// Start writing your thoughts here…"
            className="w-full h-full resize-none bg-transparent focus:outline-none"
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

      {/* ───────── Delete Confirmation ───────── */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-gray-900 rounded-lg p-6 w-96">
            <h2 className="text-lg text-white font-semibold mb-2">
              Delete note?
            </h2>
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

      {/* ───────── Save As Modal ───────── */}
      {showSaveAs && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-gray-900 rounded-lg p-6 w-96">
            <h2 className="text-lg text-white font-semibold mb-4">
              Save Note As
            </h2>
            
            <input
              type="text"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              className="w-full bg-gray-800 text-white px-3 py-2 rounded mb-6 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Filename.txt"
              autoFocus
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowSaveAs(false)}
                className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const finalName = saveName.endsWith(".txt") ? saveName : `${saveName}.txt`;
                  downloadTxtFile(finalName, body);
                  // Optionally update internal title too
                  onChange({ t1: saveName.replace(".txt", "") }); 
                  setShowSaveAs(false);
                }}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 transition text-white"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ───────── Toast Notification ───────── */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
          <div className="bg-gray-800 text-white px-4 py-3 rounded shadow-lg border border-gray-700 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <p className="text-sm font-medium">Note saved successfully</p>
          </div>
        </div>
      )}
    </main>
  );
}

export default Pad;
