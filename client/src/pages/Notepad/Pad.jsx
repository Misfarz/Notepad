import React, { act, useRef, useState,useEffect } from "react";
import { FiMaximize2, FiTrash2 } from "react-icons/fi";


/* ───────── Menu Configuration ───────── */
const MENUS = {
  File: ["New", "Open", "Save", "Save As", "Print"],
  Edit: ["Undo", "Redo","select all","find and replace"],
  Format: ["bold", "italic", "underline"],
  Tools: ["Word Count", "Cursor Position"],
  View : ["fullscreen"],
  Help: ["About", "Shortcuts"],

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
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);
  const [toastMessage, setToastMessage] = useState("");



const [showFindReplace, setShowFindReplace] = useState(false);
const [findText, setFindText] = useState("");
const [replaceText, setReplaceText] = useState("");
const [matchCase, setMatchCase] = useState(false);


const [showWordCount, setShowWordCount] = useState(false);
const [showCursorInfo, setShowCursorInfo] = useState(false);



const [showAIPanel, setShowAIPanel] = useState(false);
const [activeFeature, setActiveFeature] = useState(null);
const [aiPrompt, setAIPrompt] = useState("");
const [aiLoading, setAILoading] = useState(false);






  const title = note?.t1 ?? "";
  const body = note?.t2 ?? "";

  const wordCount = body.trim().split(/\s+/).filter(Boolean).length;


  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);


  useEffect(() => {
  function handleKeyDown(e) {
    if (e.ctrlKey && e.key === "z") {
      e.preventDefault();
      undo();
    }
    if (e.ctrlKey && (e.key === "y" || (e.shiftKey && e.key === "Z"))) {
      e.preventDefault();
      redo();
    }
  }

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [history, future, body]);

async function callAI(prompt) {
  try {
    const res = await fetch("http://localhost:5000/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      throw new Error("AI request failed");
    }

    const data = await res.json();
    return data.result;
  } catch (err) {
    console.error(err);
    return "AI error. Try again.";
  }
}

async function handleAIAction(feature) {
  if (aiLoading) return; // ⛔ prevent double trigger

  setActiveFeature(feature);
  setAILoading(true);

  try {
    const textarea = noteArea.current;
    if (!textarea) throw new Error("Textarea not found");

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = body.substring(start, end) || body;

    let prompt = "";

    switch (feature) {
      case "Rewrite":
        prompt = `Rewrite this text more clearly:\n${selectedText}`;
        break;
      case "Fix Grammar":
        prompt = `Fix grammar and spelling mistakes:\n${selectedText}`;
        break;
      case "Summarize":
        prompt = `Summarize this text in concise bullets:\n${selectedText}`;
        break;
      case "Continue Writing":
        prompt = `Continue writing naturally:\n${selectedText}`;
        break;
      case "Ask AI":
        if (!aiPrompt.trim()) {
          showToastMessage("Please enter a question");
          return;
        }
        prompt = aiPrompt;
        break;
      default:
        return;
    }

    const result = await callAI(prompt);

    if (!result) throw new Error("Empty AI response");

    if (feature !== "Ask AI") {
      const newText =
        body.substring(0, start) + result + body.substring(end);

      setHistory((prev) => [...prev, body]);
      setFuture([]);

      onChange({ t2: newText });

      requestAnimationFrame(() => {
        textarea.focus();
        textarea.setSelectionRange(start, start + result.length);
      });
    } else {
      showToastMessage(result);
    }
  } catch (err) {
    console.error(err);
    showToastMessage("AI failed. Try again.");
  } finally {
    setAILoading(false); // ✅ ALWAYS runs
  }
}


function showToastMessage(message) {
  setToastMessage(message);
  setShowToast(true);
}

  

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

    if (menu === "File") handleFileAction(action);
    if(menu === "Edit") handleEditAction(action);
    if(menu === "View") handleViewAction(action)
    if (menu === "Format") handleFormatAction(action);
    if (menu === "Tools") handleToolsAction(action);


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

  function undo() {
  if (history.length === 0) return;

  const previous = history[history.length - 1];

  setHistory((prev) => prev.slice(0, -1));
  setFuture((prev) => [body, ...prev]);

  onChange({ t2: previous });
}

function redo() {
  if (future.length === 0) return;

  const next = future[0];

  setFuture((prev) => prev.slice(1));
  setHistory((prev) => [...prev, body]);

  onChange({ t2: next });
}

function findAR(){
    setShowFindReplace(true)
}

function replaceOne() {
  if (!findText) return;

  const flags = matchCase ? "" : "i";
  const regex = new RegExp(findText, flags);

  const newBody = body.replace(regex, replaceText);

  if (newBody !== body) {
    setHistory((prev) => [...prev, body]);
    setFuture([]);
    onChange({ t2: newBody });
  }

  showToastMessage("one word replaced!")
  setShowFindReplace(false);
}

function replaceAll() {
  if (!findText) return;

  const flags = matchCase ? "g" : "gi";
  const regex = new RegExp(findText, flags);

  const newBody = body.replace(regex, replaceText);

  setHistory((prev) => [...prev, body]);
  setFuture([]);
  onChange({ t2: newBody });

  showToastMessage("all words replaced")
  setShowFindReplace(false);
}

function applyFormat(wrapper) {
  const textarea = noteArea.current;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  if (start === end) return; // no selection

  const selectedText = body.substring(start, end);
  const newText =
    body.substring(0, start) +
    wrapper + selectedText + wrapper +
    body.substring(end);

  setHistory((prev) => [...prev, body]);
  setFuture([]);
  onChange({ t2: newText });


  setTimeout(() => {
    textarea.focus();
    textarea.setSelectionRange(
      start + wrapper.length,
      end + wrapper.length
    );
  }, 0);
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
        showToastMessage("saved")
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

 function handleEditAction(action) {
  switch (action.toLowerCase()) {
    case "select all":
      selectAll();
      break;
    case "undo":
      undo();
      break;
    case "redo":
      redo();
      break;
    case "find and replace" :
      findAR()
      break;
    default:
      break;
  }
}



  function handleViewAction(action){

      switch (action) {
      case "fullscreen":
        toggleFullScreen()
        break;
      default:
        break;
    }

  }


  function handleFormatAction(action) {
  switch (action.toLowerCase()) {
    case "bold":
      applyFormat("**");
      showToastMessage("Bold applied");
      break;
    case "italic":
      applyFormat("*");
      showToastMessage("Italic applied");
      break;
    case "underline":
      applyFormat("__");
      showToastMessage("Underline applied");
      break;
    default:
      break;
  }
}


function handleToolsAction(action) {
  switch (action.toLowerCase()) {
    case "word count":
      setShowWordCount((prev) => !prev);
      showToastMessage(
        !showWordCount ? "Word count enabled" : "Word count disabled"
      );
      break;

    case "cursor position":
      setShowCursorInfo((prev) => !prev);
      showToastMessage(
        !showCursorInfo ? "Cursor tracker enabled" : "Cursor tracker disabled"
      );
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
            disabled={aiLoading}
            placeholder="// Start writing your thoughts here…"
            className="w-full h-full resize-none bg-transparent focus:outline-none"
            onChange={(e) => {
              const text = e.target.value;
              const pos = e.target.selectionStart;
              setHistory((prev) => [...prev, body]); // save previous state
              setFuture([]); // clear redo stack
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
          <div>
            {showCursorInfo && (
              <p>
                Line {cursor.line}, Column {cursor.column}
              </p>
            )}
          </div>

          <div>{showWordCount && <p>Word count: {wordCount}</p>}</div>
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
                  const finalName = saveName.endsWith(".txt")
                    ? saveName
                    : `${saveName}.txt`;
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

      {/* ───────── Find & Replace Modal ───────── */}
      {showFindReplace && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-gray-900 rounded-lg p-6 w-96 border border-gray-700">
            <h2 className="text-lg text-white font-semibold mb-4">
              Find and Replace
            </h2>

            {/* Find */}
            <div className="mb-3">
              <label className="text-sm text-gray-300">Find</label>
              <input
                type="text"
                value={findText}
                onChange={(e) => setFindText(e.target.value)}
                className="w-full bg-gray-800 text-white px-3 py-2 rounded mt-1 focus:outline-none"
                autoFocus
              />
            </div>

            {/* Replace */}
            <div className="mb-3">
              <label className="text-sm text-gray-300">Replace with</label>
              <input
                type="text"
                value={replaceText}
                onChange={(e) => setReplaceText(e.target.value)}
                className="w-full bg-gray-800 text-white px-3 py-2 rounded mt-1 focus:outline-none"
              />
            </div>

            {/* Match case */}
            <label className="flex items-center gap-2 text-sm text-gray-300 mb-4">
              <input
                type="checkbox"
                checked={matchCase}
                onChange={(e) => setMatchCase(e.target.checked)}
              />
              Match case
            </label>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowFindReplace(false)}
                className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white"
              >
                Cancel
              </button>

              <button
                onClick={replaceOne}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white"
              >
                Replace
              </button>

              <button
                onClick={replaceAll}
                className="px-3 py-2 bg-green-600 hover:bg-green-500 rounded text-white"
              >
                Replace All
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
            <p className="text-sm font-medium">{toastMessage}</p>
          </div>
        </div>
      )}


      {aiLoading && (
  <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70">
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-8 py-6 flex flex-col items-center gap-4 pointer-events-auto">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-white text-sm font-medium">
        AI is generating content…
      </p>
      <p className="text-gray-400 text-xs">
        Please wait. Editing is disabled.
      </p>
    </div>
  </div>
)}




   
<div className="fixed bottom-40 right-10 z-[100] flex flex-col items-end gap-2">
  {/* Bot Icon */}
  <button
    onClick={() => setShowAIPanel(!showAIPanel)}
    className="bg-blue-600 hover:bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
  >
    🤖
  </button>

  {/* AI Panel */}
  {showAIPanel && (
    <div className="mt-2 w-80 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700 p-4 flex flex-col gap-3">
      <h2 className="text-lg font-semibold">AI Assistant</h2>
      {["Rewrite", "Fix Grammar", "Summarize", "Continue Writing", "Ask AI"].map((feature) => (
        <button
          key={feature}
          onClick={() => handleAIAction(feature)}
          className="bg-gray-800 hover:bg-gray-700 rounded px-3 py-2 text-left w-full transition"
        >
          {feature}
        </button>
      ))}
      {activeFeature === "Ask AI" && (
        <input
          type="text"
          placeholder="Type your question..."
          value={aiPrompt}
          onChange={(e) => setAIPrompt(e.target.value)}
          className="mt-2 w-full bg-gray-800 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      )}
    </div>
  )}
</div>



    </main>
  );
}

export default Pad;
