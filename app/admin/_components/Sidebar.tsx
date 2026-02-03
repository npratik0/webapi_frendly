// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// const ADMIN_LINKS = [
//     { href: "/admin", label: "Dashboard" },
//     { href: "/admin/users", label: "Users" },
// ];

// export default function Sidebar() {
//     const pathname = usePathname();

//     const isActive = (href: string) => href === "/admin" ? pathname === href : pathname?.startsWith(href);

//     return (
//         <>
//             {/* Sidebar */}
//             <aside className={`
//                 fixed md:static 
//                 top-0 left-0 
//                 h-screen w-64 
//                 bg-white dark:bg-gray-900 
//                 border-r border-gray-200 dark:border-gray-800 
//                 z-40 overflow-y-auto`}
//             >
//                 <div className="p-4 border-b border-gray-200 dark:border-gray-800">
//                     <Link href="/admin" className="flex items-center gap-2">
//                         <div className="h-8 w-8 rounded bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center font-bold">A</div>
//                         <span className="font-semibold">Admin Panel</span>
//                     </Link>
//                 </div>

//                 <nav className="p-2 space-y-1">
//                     {
//                         ADMIN_LINKS.map(link => (
//                             <Link
//                                 key={link.href}
//                                 href={link.href}
//                                 className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive(link.href)
//                                     ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
//                                     : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
//                                     }`}
//                             >
//                                 <span>{link.label}</span>
//                             </Link >
//                         ))
//                     }
//                 </nav >
//             </aside >
//         </>
//     );
// }


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    LayoutDashboard, 
    Users, 
    UserCircle,
    ChevronRight 
} from "lucide-react";

const ADMIN_LINKS = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/profile", label: "My Profile", icon: UserCircle },
];

export default function Sidebar() {
    const pathname = usePathname();

    const isActive = (href: string) => 
        href === "/admin" ? pathname === href : pathname?.startsWith(href);

    return (
        <aside className="fixed md:static top-0 left-0 h-screen w-64 bg-gradient-to-b from-blue-600 to-blue-700 text-white z-40 overflow-y-auto shadow-xl">
            {/* Logo Section */}
            <div className="p-6 border-b border-blue-500/30">
                <Link href="/admin" className="flex items-center gap-3 group">
                    <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform">
                        <span className="text-blue-600 font-bold text-xl">F</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-lg">Frendly</span>
                        <span className="text-xs text-blue-200">Admin Panel</span>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-2">
                {ADMIN_LINKS.map((link) => {
                    const Icon = link.icon;
                    const active = isActive(link.href);
                    
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`
                                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium 
                                transition-all duration-200 group relative overflow-hidden
                                ${active
                                    ? 'bg-white text-blue-600 shadow-lg'
                                    : 'text-blue-100 hover:bg-blue-500/30 hover:text-white'
                                }
                            `}
                        >
                            <Icon className={`h-5 w-5 ${active ? 'text-blue-600' : 'text-blue-200 group-hover:text-white'}`} />
                            <span className="flex-1">{link.label}</span>
                            {active && (
                                <ChevronRight className="h-4 w-4 text-blue-600" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-500/30">
                <div className="text-xs text-blue-200 text-center">
                    © 2024 Frendly
                </div>
            </div>
        </aside>
    );
}