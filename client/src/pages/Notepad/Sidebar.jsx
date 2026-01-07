import React, { useState } from 'react';
import { FiSearch, FiPlus, FiChevronDown, FiMoreVertical } from 'react-icons/fi';
import { FaRegStickyNote } from 'react-icons/fa';
import jsPDF from 'jspdf';

function Sidebar({ open , isFullScreen,notes, currentId, onCreate, onSelect, onClearAll }) {

    const [sortType, setSortType] = useState("newest");
    const [showSortMenu, setShowSortMenu] = useState(false);
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const sortedNotes = Object.entries(notes)
    .filter(([key, note]) => {
      if (key === "current") return false;
      if (!searchQuery) return true;
      
      const query = searchQuery.toLowerCase();
      const title = (note.t1 || "").toLowerCase();
      const body = (note.t2 || "").toLowerCase();
      
      return title.includes(query) || body.includes(query);
    })
    .sort(([, a], [, b]) => {
      if (sortType === "newest") return new Date(b.t3) - new Date(a.t3);
      if (sortType === "oldest") return new Date(a.t3) - new Date(b.t3);
      if (sortType === "az") return (a.t1 || "").localeCompare(b.t1 || "");
      return 0;
    });

    const handleSortSelect = (type) => {
      setSortType(type);
      setShowSortMenu(false);
    };

    const handleDownloadPDF = () => {
      if (!currentId || !notes[currentId]) return;

      const note = notes[currentId];
      const doc = new jsPDF();
      
      const title = note.t1 || "Untitled Note";
      const body = note.t2 || "";

      doc.setFontSize(20);
      doc.text(title, 20, 20);
      
      doc.setFontSize(12);
      const splitText = doc.splitTextToSize(body, 170);
      doc.text(splitText, 20, 40);

      doc.save(`${title.replace(/\s+/g, "_")}.pdf`);
      setShowMoreMenu(false);
    };


  return (
    <aside
      className={`
    fixed left-0 w-80 bg-gray-900 text-white z-40
    transition-all duration-300 ease-in-out
    ${open ? "translate-x-0" : "-translate-x-full"}
    ${isFullScreen ? "top-0 h-screen pt-0" : "top-0 h-[calc(100vh)] pt-16"}
  `}
    >
      <div className="h-full flex flex-col">
        {/* Create Note */}
        <div className="px-4 py-5 border-b border-gray-800">
          <button
            onClick={onCreate}
            className="w-full bg-blue-600 text-white py-2.5 rounded-md flex items-center justify-center gap-2 text-sm font-medium hover:bg-blue-500 transition"
          >
            <FiPlus size={16} />
            Create new note
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-4 border-b border-gray-800">
          <div className="relative">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search notes"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 text-sm text-white pl-9 pr-3 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Sort */}
        <div className="px-4 py-3 flex items-center justify-between text-gray-400 text-sm border-b border-gray-800">
          <div className="relative">
            <button
              onClick={() => setShowSortMenu((prev) => !prev)}
              className="flex items-center hover:text-white transition"
            >
              <FiChevronDown size={16} className={`transition-transform duration-200 ${showSortMenu ? "rotate-180" : ""}`} />
            </button>

            {showSortMenu && (
              <div className="absolute left-0 mt-2 w-44 bg-gray-900 border border-gray-800 rounded-md shadow-lg z-50">
                <button
                  onClick={() => handleSortSelect("newest")}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-800 ${sortType === 'newest' ? 'text-blue-400' : ''}`}
                >
                  Creation date (Newest)
                </button>

                <button
                  onClick={() => handleSortSelect("oldest")}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-800 ${sortType === 'oldest' ? 'text-blue-400' : ''}`}
                >
                  Creation date (Oldest)
                </button>

                <button
                  onClick={() => handleSortSelect("az")}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-800 ${sortType === 'az' ? 'text-blue-400' : ''}`}
                >
                  Alphabetical (A–Z)
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <button 
              onClick={() => setShowMoreMenu(prev => !prev)}
              className="flex items-center hover:text-white transition"
            >
              <FiMoreVertical size={16} />
            </button>

            {showMoreMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-gray-900 border border-gray-800 rounded-md shadow-lg z-50">
                <button
                  onClick={() => {
                    onClearAll();
                    setShowMoreMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-800 text-red-400 hover:text-red-300"
                >
                  Clear all notes
                </button>

                <button
                  onClick={handleDownloadPDF}
                  disabled={!currentId}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-800 ${!currentId ? 'text-gray-600 cursor-not-allowed' : ''}`}
                >
                  Download PDF
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
  {sortedNotes.map(([id, note]) => {
    const isActive = id === currentId;

    return (
      <div
        key={id}
        onClick={() => onSelect(id)}
        className={`
          rounded-md px-3 py-3 flex gap-3 cursor-pointer
          ${isActive ? "bg-gray-800" : "hover:bg-gray-800/60"}
          transition
        `}
      >
        <FaRegStickyNote
          size={16}
          className={
            isActive
              ? "text-blue-400 mt-0.5"
              : "text-gray-500 mt-0.5"
          }
        />

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-0.5">
            <h3 className="text-sm font-medium truncate">
              {note.t1 || "Untitled note"}
            </h3>
            <span className="text-xs text-gray-500 shrink-0">
              {note.t3}
            </span>
          </div>

          <p className="text-xs text-gray-400 truncate">
            {note.t2 || "No content"}
          </p>
        </div>
      </div>
    );
  })}
</div>

      </div>
    </aside>
  );
}

export default Sidebar;
