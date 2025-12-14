// App.jsx
import React from 'react';
import { Edit, Save, Search, BarChart, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600 tracking-tight">
                nodepad
              </h1>
            </div>
            <div className="flex space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full"
              >
                About
              </a>
              <Link
                to="/app"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full"
              >
                Notepad
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
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
  to="/notepad"
  className="border border-gray-300 text-white-900 px-4 py-2 rounded-md inline-flex items-center gap-2 hover:bg-gray-100 transition"
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need, nothing you don't
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Simple Interface */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Edit className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Simple Interface
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Clean, intuitive design that gets out of your way so you can
                focus on writing.
              </p>
            </div>

            {/* Find & Replace */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Search className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Find & Replace
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Quickly find text and replace it across your entire document
                with ease.
              </p>
            </div>

            {/* Word Count */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <BarChart className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Word Count
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Track your writing progress with real-time word, character, and
                line counts.
              </p>
            </div>

            {/* AI Suggestions */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                AI Suggestions
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Spell check, grammar corrections, and smart summarization
                powered by AI.
              </p>
            </div>

            {/* Auto Save */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Save className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Auto Save
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Never lose your work. Your documents are automatically saved as
                you type.
              </p>
            </div>

            {/* Markdown Support */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-blue-600"
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
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Markdown Support
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Write in Markdown and see formatted preview instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
              About This App
            </h2>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Nodepad is designed for writers who value simplicity and
                  focus. We believe that the best writing happens when you're
                  not distracted by complex interfaces or unnecessary features.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Built with modern web technologies, Nodepad offers a seamless
                  writing experience that works across all your devices. Whether
                  you're jotting down quick notes or working on your next big
                  project, we've got you covered.
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                  <p className="text-xl font-semibold text-blue-700 text-center">
                    Write freely. Edit effortlessly. Create beautifully.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-blue-50 p-8 rounded-xl text-center">
                  <div className="text-5xl font-extrabold text-blue-600 mb-4">
                    100%
                  </div>
                  <p className="text-gray-700 font-medium">Focus on Writing</p>
                </div>
                <div className="bg-blue-50 p-8 rounded-xl text-center">
                  <div className="text-5xl font-extrabold text-blue-600 mb-4">
                    ∞
                  </div>
                  <p className="text-gray-700 font-medium">
                    Unlimited Documents
                  </p>
                </div>
                <div className="bg-blue-50 p-8 rounded-xl text-center">
                  <div className="text-5xl font-extrabold text-blue-600 mb-4">
                    0
                  </div>
                  <p className="text-gray-700 font-medium">Distractions</p>
                </div>
                <div className="bg-blue-50 p-8 rounded-xl text-center">
                  <div className="text-5xl font-extrabold text-blue-600 mb-4">
                    24/7
                  </div>
                  <p className="text-gray-700 font-medium">Auto Save</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className=" bg-black border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Nodepad — Minimal writing experience
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;