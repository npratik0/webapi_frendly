"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <h1 className="text-2xl font-bold italic text-blue-600">
          Frendly
        </h1>

        <div className="flex items-center gap-6">
          <Link href="#features" className="text-sm hover:text-blue-600">
            Features
          </Link>
          <Link href="#community" className="text-sm hover:text-blue-600">
            Community
          </Link>
          <Link href="/login" className="text-sm font-medium text-blue-600">
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
