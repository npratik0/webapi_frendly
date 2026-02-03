// "use client";
// import Link from "next/link";
// import { useAuth } from "@/context/AuthContext";

// export default function Header() {
//     const { logout, user } = useAuth();

//     return (
//         <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-black/10 dark:border-white/10">
//             <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Global">
//                 <div className="flex h-16 items-center justify-between">
//                     {/* Left: Logo & Title */}
//                     <div className="flex items-center gap-3">
//                         <Link href="/admin" className="flex items-center gap-2 group">
//                             <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-background font-semibold">
//                                 A
//                             </span>
//                             <span className="text-base font-semibold tracking-tight group-hover:opacity-80 transition-opacity">
//                                 Admin Panel
//                             </span>
//                         </Link>
//                     </div>
//                     <div className="flex items-center gap-2">
//                         <div className="h-6 flex items-center justify-center text-xs font-semibold">
//                             {user?.email || 'Admin'}
//                         </div>
//                         <span className="text-sm font-medium sm:inline">
//                             <button
//                                 onClick={() => {
//                                     logout();
//                                 }}
//                                 className="w-full border flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-foreground/5 transition-colors text-left"
//                             >
//                                 Logout
//                             </button>
//                         </span>
//                     </div>
//                 </div>
//             </nav>
//         </header>
//     );
// }


"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { LogOut, User, Menu } from "lucide-react";
import { useState } from "react";

export default function Header() {
    const { logout, user } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Left: Mobile Menu + Logo */}
                    <div className="flex items-center gap-4">
                        <button 
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <Menu className="h-6 w-6 text-gray-600" />
                        </button>
                        
                        <Link href="/admin" className="flex items-center gap-2.5 group md:hidden">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md">
                                <span className="text-white font-bold text-lg">F</span>
                            </div>
                            <span className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                Frendly
                            </span>
                        </Link>
                    </div>

                    {/* Right: User Menu */}
                    <div className="flex items-center gap-3">
                        {/* User Info & Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                            >
                                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
                                    <span className="text-white font-semibold text-sm">
                                        {user?.email?.[0]?.toUpperCase() || 'A'}
                                    </span>
                                </div>
                                <div className="hidden sm:block text-left">
                                    <div className="text-sm font-medium text-gray-900">
                                        {user?.name || 'Admin'}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {user?.email || 'admin@frendly.com'}
                                    </div>
                                </div>
                            </button>

                            {/* Dropdown Menu */}
                            {showUserMenu && (
                                <>
                                    <div 
                                        className="fixed inset-0 z-10" 
                                        onClick={() => setShowUserMenu(false)}
                                    />
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                                        <Link
                                            href="/user/profile"
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            <User className="h-4 w-4 text-gray-500" />
                                            <span>My Profile</span>
                                        </Link>
                                        <div className="h-px bg-gray-200 my-1" />
                                        <button
                                            onClick={() => {
                                                setShowUserMenu(false);
                                                logout();
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}