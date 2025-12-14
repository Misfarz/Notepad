// App.jsx
import React from 'react';
import { Edit, Save, Search, BarChart, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
  {/* Navbar */}
<nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">

      {/* Brand */}
      <h1 className="text-xl font-semibold text-blue-500 tracking-tight">
        note baddie
      </h1>

      {/* Links */}
      <div className="flex items-center gap-6 text-sm font-medium">
        <Link
          to="/"
          className="text-gray-600 hover:text-blue-500 transition"
        >
          Home
        </Link>

        <Link
          to="#about"
          className="text-gray-600 hover:text-blue-500 transition"
        >
          About
        </Link>

        <Link
          to="/app"
          className="border border-gray-300 rounded-md px-3 py-1
                     text-gray-700 hover:border-blue-500 hover:text-blue-500 transition"
        >
          Notepad
        </Link>
      </div>

    </div>
  </div>
</nav>



      {/* Hero Section */}
      <section className="bg-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
                Minimal Writing, Maximum Focus
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-lg">
                A sleek, distraction-free notepad for your thoughts, ideas, and
                creativity.
              </p>
              <Link
                to="/app"
               className="border border-white bg-blue-500 text-white px-4 py-2 inline-flex items-center gap-2 transition hover:bg-white hover:text-blue-500"

              >
                <Edit size={16} />
                <span>Start writing</span>
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md transform hover:scale-[1.02] transition-transform duration-300">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-gray-600 text-sm font-medium">
                    untitled.txt
                  </div>
                </div>
                <div className="p-8 font-mono text-gray-800">
                  <p className="text-gray-500"># Welcome to Nodepad</p>
                  <p className="mt-4">A clean space for your words...</p>
                  <p className="mt-4">Today's ideas:</p>
                  <p className="mt-2">• Write that blog post</p>
                  <p>• Meeting notes for tomorrow</p>
                  <p>• Creative writing project</p>
                  <p className="mt-4 text-gray-400">
                    // Type your thoughts here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* Features Section */}
<section className="py-24 bg-white">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
        What Makes It Work
      </h2>
      <p className="text-lg text-gray-600 max-w-xl mx-auto">
        Everything you need to write clearly — nothing that gets in the way.
      </p>
    </div>

    {/* Features Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          icon: <Edit size={22} />,
          title: "Simple Interface",
          desc: "A clean editor designed to keep your attention on words, not buttons."
        },
        {
          icon: <Search size={22} />,
          title: "Find & Replace",
          desc: "Quickly search and update text across your document with precision."
        },
        {
          icon: <BarChart size={22} />,
          title: "Word Count",
          desc: "Live tracking of words and characters to measure your progress."
        },
        {
          icon: <Zap size={22} />,
          title: "AI Assistance",
          desc: "Smart suggestions for grammar, clarity, and summarization."
        },
        {
          icon: <Save size={22} />,
          title: "Auto Save",
          desc: "Your work is saved continuously — no buttons, no stress."
        },
        {
          icon: (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
          ),
          title: "Markdown Support",
          desc: "Write in Markdown with instant formatting preview."
        }
      ].map((item) => (
        <div
          key={item.title}
          className="border border-gray-200 rounded-lg p-6 transition hover:border-blue-500"
        >
          <div className="text-blue-500 mb-4">
            {item.icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {item.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
{/* About Section */}
<section className="py-24 bg-white">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
        What This Is
      </h2>
      <p className="text-lg text-gray-600 max-w-xl mx-auto">
        A focused writing environment designed to stay out of your way.
      </p>
    </div>

    {/* Grid */}
    <div className="grid lg:grid-cols-2 gap-12">

      {/* Left Cards */}
      <div className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-6">
          <p className="text-gray-700 leading-relaxed">
            Nodepad is built for writers who prefer clarity over clutter.
            No unnecessary controls. No visual noise. Just a calm space
            where ideas can flow naturally.
          </p>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <p className="text-gray-700 leading-relaxed">
            Using modern web technologies, Nodepad works smoothly across
            devices and saves automatically — so you never lose momentum
            or thoughts mid-sentence.
          </p>
        </div>

        {/* Highlight */}
        <div className="border border-blue-500 rounded-lg p-6">
          <p className="text-blue-600 font-semibold text-center">
            Write freely. Edit effortlessly. Create beautifully.
          </p>
        </div>
      </div>

      {/* Right Stats */}
      <div className="grid grid-cols-2 gap-6">
        {[
          { value: "100%", label: "Focus on writing" },
          { value: "∞", label: "Unlimited notes" },
          { value: "0", label: "Distractions" },
          { value: "24/7", label: "Auto-save" },
        ].map((item) => (
          <div
            key={item.label}
            className="border border-gray-200 rounded-lg p-6 text-center transition hover:border-blue-500"
          >
            <div className="text-4xl font-bold text-blue-500 mb-2">
              {item.value}
            </div>
            <p className="text-gray-600 text-sm font-medium">
              {item.label}
            </p>
          </div>
        ))}
      </div>

    </div>
  </div>
</section>

{/* Footer */}
<footer className="border-t border-gray-200 bg-white">
  <div className="max-w-6xl mx-auto px-4 py-8 text-center">
    <p className="text-gray-500 text-sm">
      © {new Date().getFullYear()} Nodepad — Built for focused writing
    </p>
  </div>
</footer>



    </div>
  );
};

export default Home;