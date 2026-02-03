// import Link from "next/link";

// export default function Page() {
//     return (
//         <div>
//             <Link className="text-blue-500 border border-blue-500 p-2 rounded inline-block"
//              href="/admin/users/create">Create User</Link>
//         </div>
//     );
// }


"use client";

import Link from "next/link";
import { 
    Users, 
    Plus, 
    Search, 
    Edit, 
    Eye, 
    Trash2,
    Filter,
    Download,
    Upload,
    MoreVertical,
    CheckCircle,
    XCircle,
    Shield,
    Crown,
    UserCheck
} from "lucide-react";
import { useState } from "react";

// Dummy user data
const DUMMY_USERS = [
    { id: 1, name: "Test", email: "test1@example.com", role: "Admin", status: "Active", joinedDate: "2026-01-15", posts: 0, followers: 0 },
    { id: 2, name: "Pratik Neupane", email: "pratik@example.com", role: "User", status: "Active", joinedDate: "2026-01-20", posts: 0, followers: 0 },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Active", joinedDate: "2026-02-01", posts: 0, followers: 0 },
    { id: 4, name: "Alice Williams", email: "alice@example.com", role: "User", status: "Active", joinedDate: "2026-01-10", posts: 0, followers: 0 },
    { id: 5, name: "Charlie Brown", email: "charlie@example.com", role: "User", status: "Active", joinedDate: "2025-02-15", posts: 0, followers: 0 },
    { id: 6, name: "Diana Prince", email: "diana@example.com", role: "User", status: "Active", joinedDate: "2026-01-25", posts: 0, followers: 0 },
    { id: 7, name: "Ethan Hunt", email: "ethan@example.com", role: "User", status: "Active", joinedDate: "2026-01-30", posts: 0, followers: 0 },
    { id: 8, name: "Fiona Green", email: "fiona@example.com", role: "User", status: "Active", joinedDate: "2026-02-05", posts: 0, followers: 0 },
];

export default function UsersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

    const filteredUsers = DUMMY_USERS.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === "All" || user.role === roleFilter;
        const matchesStatus = statusFilter === "All" || user.status === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
    });

    const toggleSelectUser = (id: number) => {
        setSelectedUsers(prev => 
            prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedUsers.length === filteredUsers.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(filteredUsers.map(u => u.id));
        }
    };

    const getRoleIcon = (role: string) => {
        switch(role) {
            case "Admin": return Crown;
            case "Moderator": return Shield;
            default: return UserCheck;
        }
    };

    const getRoleColor = (role: string) => {
        switch(role) {
            case "Admin": return "bg-purple-100 text-purple-700 border-purple-200";
            case "Moderator": return "bg-blue-100 text-blue-700 border-blue-200";
            default: return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <Users className="h-8 w-8 text-blue-600" />
                        Users Management
                    </h1>
                    <p className="text-gray-600 mt-2">Manage and monitor all users on Frendly</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all">
                        <Download className="h-4 w-4" />
                        <span className="hidden sm:inline">Export</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all">
                        <Upload className="h-4 w-4" />
                        <span className="hidden sm:inline">Import</span>
                    </button>
                    <Link
                        href="/admin/users/create"
                        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
                    >
                        <Plus className="h-5 w-5" />
                        Create User
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 font-medium">Total Users</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{DUMMY_USERS.length}</p>
                            <p className="text-xs text-gray-500 mt-1">All registered users</p>
                        </div>
                        <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
                            <Users className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 font-medium">Active Users</p>
                            <p className="text-2xl font-bold text-green-600 mt-1">
                                {DUMMY_USERS.filter(u => u.status === "Active").length}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Currently active</p>
                        </div>
                        <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 font-medium">Inactive Users</p>
                            <p className="text-2xl font-bold text-gray-600 mt-1">
                                {DUMMY_USERS.filter(u => u.status === "Inactive").length}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Not active</p>
                        </div>
                        <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center">
                            <XCircle className="h-6 w-6 text-gray-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 font-medium">Admins</p>
                            <p className="text-2xl font-bold text-purple-600 mt-1">
                                {DUMMY_USERS.filter(u => u.role === "Admin").length}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Admin users</p>
                        </div>
                        <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center">
                            <Crown className="h-6 w-6 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                <div className="p-4 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search users by name or email..."
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="flex gap-3">
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                <select
                                    value={roleFilter}
                                    onChange={(e) => setRoleFilter(e.target.value)}
                                    className="pl-9 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
                                >
                                    <option value="All">All Roles</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Moderator">Moderator</option>
                                    <option value="User">User</option>
                                </select>
                            </div>

                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="pl-9 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
                                >
                                    <option value="All">All Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Selected Actions */}
                    {selectedUsers.length > 0 && (
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
                            <span className="text-sm font-medium text-blue-900">
                                {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
                            </span>
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-1.5 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                    Export Selected
                                </button>
                                <button className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                                    Delete Selected
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left">
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                                        onChange={toggleSelectAll}
                                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                    />
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    User
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                                    Activity
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden xl:table-cell">
                                    Joined Date
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {filteredUsers.map((user) => {
                                const RoleIcon = getRoleIcon(user.role);
                                
                                return (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="checkbox"
                                                checked={selectedUsers.includes(user.id)}
                                                onChange={() => toggleSelectUser(user.id)}
                                                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm flex-shrink-0">
                                                    <span className="text-white font-semibold text-sm">
                                                        {user.name[0]}
                                                    </span>
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="font-medium text-gray-900 truncate">{user.name}</div>
                                                    <div className="text-sm text-gray-500 truncate">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                                                <RoleIcon className="h-3 w-3" />
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                                                user.status === "Active"
                                                    ? "bg-green-100 text-green-700 border border-green-200"
                                                    : "bg-gray-100 text-gray-700 border border-gray-200"
                                            }`}>
                                                <span className={`h-1.5 w-1.5 rounded-full ${
                                                    user.status === "Active" ? "bg-green-500" : "bg-gray-500"
                                                }`}></span>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                                            <div className="text-sm text-gray-900">{user.posts} posts</div>
                                            <div className="text-xs text-gray-500">{user.followers} followers</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 hidden xl:table-cell">
                                            {user.joinedDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/users/${user.id}`}
                                                    className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                                <Link
                                                    href={`/admin/users/${user.id}/edit`}
                                                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                                                    title="Edit User"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                                <button
                                                    className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                                                    title="Delete User"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                                <button
                                                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                                                    title="More Options"
                                                >
                                                    <MoreVertical className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {filteredUsers.length === 0 && (
                    <div className="text-center py-12">
                        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                        <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                        <button 
                            onClick={() => {
                                setSearchQuery("");
                                setRoleFilter("All");
                                setStatusFilter("All");
                            }}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {filteredUsers.length > 0 && (
                    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                            Showing <span className="font-medium">{filteredUsers.length}</span> of{" "}
                            <span className="font-medium">{DUMMY_USERS.length}</span> users
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                Previous
                            </button>
                            <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                                1
                            </button>
                            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                2
                            </button>
                            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                3
                            </button>
                            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}