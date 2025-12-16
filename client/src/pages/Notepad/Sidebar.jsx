import React from 'react';
import { FiSearch, FiPlus, FiChevronDown, FiMoreVertical } from 'react-icons/fi';
import { FaRegStickyNote } from 'react-icons/fa';

function Sidebar({ open }) {
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 w-80 bg-gray-900 text-white z-40 pt-16
        transform transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="h-full flex flex-col">

        {/* Create Note */}
        <div className="px-4 py-5 border-b border-gray-800">
          <button className="w-full bg-blue-600 text-white py-2.5 rounded-md flex items-center justify-center gap-2 text-sm font-medium hover:bg-blue-500 transition">
            <FiPlus size={16} />
            Create new note
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-4 border-b border-gray-800">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search notes"
              className="w-full bg-gray-800 text-sm text-white pl-9 pr-3 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Sort */}
        <div className="px-4 py-3 flex items-center justify-between text-gray-400 text-sm border-b border-gray-800">
          <button className="flex items-center gap-1 hover:text-white transition">
            <FiChevronDown size={16} />
            Sort by
          </button>
          <FiMoreVertical size={16} className="cursor-pointer hover:text-white transition" />
        </div>

        {/* Notes */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {[
            {
              title: 'Meeting Notes',
              time: 'Today',
              preview: 'Discussed project timelines and deliverables...',
              active: true,
            },
            {
              title: 'Shopping List',
              time: 'Yesterday',
              preview: 'Milk, Eggs, Bread, Coffee, Fruits',
            },
            {
              title: 'Ideas',
              time: 'Oct 10',
              preview: 'Random thoughts and creative ideas...',
            },
          ].map((note, i) => (
            <div
              key={i}
              className={`
                rounded-md px-3 py-3 flex gap-3 cursor-pointer
                ${note.active ? 'bg-gray-800' : 'hover:bg-gray-800/60'}
                transition
              `}
            >
              <FaRegStickyNote
                size={16}
                className={note.active ? 'text-blue-400 mt-0.5' : 'text-gray-500 mt-0.5'}
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <h3 className="text-sm font-medium truncate">
                    {note.title}
                  </h3>
                  <span className="text-xs text-gray-500 shrink-0">
                    {note.time}
                  </span>
                </div>
                <p className="text-xs text-gray-400 truncate">
                  {note.preview}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </aside>
  );
}

export default Sidebar;
