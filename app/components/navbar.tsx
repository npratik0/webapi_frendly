// "use client";

// import Link from "next/link";

// export default function Navbar() {
//   return (
//     <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur border-b">
//       <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
//         <h1 className="text-2xl font-bold italic text-blue-600">
//           Frendly
//         </h1>

//         <div className="flex items-center gap-6">
//           <Link href="#features" className="text-sm hover:text-blue-600">
//             Features
//           </Link>
//           <Link href="#community" className="text-sm hover:text-blue-600">
//             Community
//           </Link>
//           <Link href="/login" className="text-sm font-medium text-blue-600">
//             Login
//           </Link>
//           <Link
//             href="/register"
//             className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
//           >
//             Get Started
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }



"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform duration-300">
            <span className="text-white font-bold text-xl">F</span>
          </div>
          <h1 className="text-2xl font-extrabold italic bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Frendly
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">
            Features
          </Link>
          <Link href="#community" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">
            Community
          </Link>
          <Link href="/login" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">
            Login
          </Link>
          <Link
            href="/register"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">
          <div className="px-6 py-4 space-y-3">
            <Link
              href="#features"
              className="block py-2 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#community"
              className="block py-2 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Community
            </Link>
            <Link
              href="/login"
              className="block py-2 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/register"
              className="block w-full px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold text-center hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}