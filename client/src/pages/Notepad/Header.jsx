import React from 'react';

function Header({ onMenuClick,isFullScreen }) {

  if(isFullScreen) return null
  return (
    <header className="bg-black text-white flex items-center px-5 h-16 fixed top-0 left-0 right-0 z-50 border-b border-gray-800">
      
      {/* Menu button – same position */}
      <button
        className="bg-transparent border-none cursor-pointer flex flex-col justify-center gap-1.5 h-6 w-8 p-0 mr-5"
        onClick={onMenuClick}
        aria-label="Toggle menu"
      >
        <span className="block w-full h-[2px] bg-white rounded-sm opacity-90"></span>
        <span className="block w-full h-[2px] bg-white rounded-sm opacity-90"></span>
        <span className="block w-full h-[2px] bg-white rounded-sm opacity-90"></span>
      </button>

      {/* Brand – same position */}
      <h1 className="text-lg font-semibold tracking-wide select-none">
        note baddie
      </h1>

    </header>
  );
}

export default Header;
