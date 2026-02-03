// import Header from "./_components/Header";
// import Sidebar from "./_components/Sidebar";
// import { AuthProvider } from "@/context/AuthContext";

// export default function Layout({ children }: { children: React.ReactNode }) {
//     return (
//         <div className='flex w-full min-h-screen'>
//             <AuthProvider>
//             <div className='page-wrapper flex w-full'>
//                 {/* Header/sidebar */}
//                 <div className='xl:block hidden'>
//                     <Sidebar />
//                 </div>
//                 <div className='w-full bg-background'>
//                     {/* Top Header  */}
//                     <Header />
//                     {/* Body Content  */}
//                     <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 p-2">
//                         {children}
//                     </main>
                
//                 </div>
//             </div>
//             </AuthProvider>

//         </div>
//     );
// }


"use client";

import { useState } from "react";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import { X } from "lucide-react";
import { AuthProvider } from "@/context/AuthContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            <AuthProvider>
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed top-0 left-0 h-screen z-40 transition-transform duration-300 md:translate-x-0
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <Sidebar />
                {/* Close button for mobile */}
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="absolute top-4 right-4 md:hidden p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-colors"
                >
                    <X className="h-5 w-5 text-white" />
                </button>
            </div>

            {/* Main Content */}
            <div className="md:pl-64">
                <Header />
                <main className="p-6">
                    {children}
                </main>
            </div>
            </AuthProvider>
        </div>
    );
}