// // "use client";

// // import Link from "next/link";
// // import { 
// //     Users, 
// //     Plus, 
// //     Search, 
// //     Edit, 
// //     Eye, 
// //     Trash2,
// //     Filter,
// //     Download,
// //     Upload,
// //     MoreVertical,
// //     CheckCircle,
// //     XCircle,
// //     Shield,
// //     Crown,
// //     UserCheck
// // } from "lucide-react";
// // import { useState, useEffect } from "react";
// // import { useRouter, useSearchParams } from "next/navigation";
// // import Image from "next/image";
// // import { toast } from "react-toastify";
// // import { handleDeleteUser } from "@/lib/actions/admin/user-action";
// // import DeleteModal from "@/app/components/DeleteModal";

// // interface User {
// //     _id: string;
// //     firstName?: string;
// //     lastName?: string;
// //     email: string;
// //     role: string;
// //     imageUrl?: string;
// //     status?: string;
// //     createdAt?: string;
// //     postsCount?: number;
// //     followersCount?: number;
// // }

// // interface UsersPageProps {
// //     initialUsers: User[];
// //     initialPagination: {
// //         page: number;
// //         size: number;
// //         totalPages: number;
// //         totalItems: number;
// //     };
// //     initialStats?: {
// //         totalUsers: number;
// //         activeUsers: number;
// //         inactiveUsers: number;
// //         adminUsers: number;
// //     };
// // }

// // export default function UsersPage({ initialUsers, initialPagination, initialStats }: UsersPageProps) {
// //     const router = useRouter();
// //     const searchParams = useSearchParams();
    
// //     const [users, setUsers] = useState<User[]>(initialUsers);
// //     const [pagination, setPagination] = useState(initialPagination);
// //     const [stats, setStats] = useState(initialStats || {
// //         totalUsers: initialPagination.totalItems,
// //         activeUsers: initialUsers.filter(u => u.status?.toLowerCase() === "active").length,
// //         inactiveUsers: initialUsers.filter(u => u.status?.toLowerCase() === "inactive").length,
// //         adminUsers: initialUsers.filter(u => u.role?.toLowerCase() === "admin").length,
// //     });

// //     const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || "");
// //     const [roleFilter, setRoleFilter] = useState(searchParams.get('role') || "All");
// //     const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || "All");
// //     const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
// //     const [deleteId, setDeleteId] = useState<string | null>(null);

// //     // Update state when URL params change
// //     useEffect(() => {
// //         setUsers(initialUsers);
// //         setPagination(initialPagination);
// //     }, [initialUsers, initialPagination]);

// //     const handleSearch = () => {
// //         const params = new URLSearchParams();
// //         params.set('page', '1');
// //         params.set('size', pagination.size.toString());
        
// //         if (searchQuery.trim()) params.set('search', searchQuery.trim());
// //         if (roleFilter !== "All") params.set('role', roleFilter.toLowerCase());
// //         if (statusFilter !== "All") params.set('status', statusFilter.toLowerCase());
        
// //         router.push(`/admin/users?${params.toString()}`);
// //     };

// //     const handleFilterChange = (type: 'role' | 'status', value: string) => {
// //         const params = new URLSearchParams();
// //         params.set('page', '1');
// //         params.set('size', pagination.size.toString());
        
// //         if (searchQuery.trim()) params.set('search', searchQuery.trim());
        
// //         if (type === 'role') {
// //             setRoleFilter(value);
// //             if (value !== "All") params.set('role', value.toLowerCase());
// //             if (statusFilter !== "All") params.set('status', statusFilter.toLowerCase());
// //         } else {
// //             setStatusFilter(value);
// //             if (roleFilter !== "All") params.set('role', roleFilter.toLowerCase());
// //             if (value !== "All") params.set('status', value.toLowerCase());
// //         }
        
// //         router.push(`/admin/users?${params.toString()}`);
// //     };

// //     const clearFilters = () => {
// //         setSearchQuery("");
// //         setRoleFilter("All");
// //         setStatusFilter("All");
// //         router.push(`/admin/users?page=1&size=${pagination.size}`);
// //     };

// //     const toggleSelectUser = (id: string) => {
// //         setSelectedUsers(prev => 
// //             prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
// //         );
// //     };

// //     const toggleSelectAll = () => {
// //         if (selectedUsers.length === users.length) {
// //             setSelectedUsers([]);
// //         } else {
// //             setSelectedUsers(users.map(u => u._id));
// //         }
// //     };

// //     const onDelete = async () => {
// //         if (!deleteId) return;
        
// //         try {
// //             await handleDeleteUser(deleteId);
// //             toast.success("User deleted successfully");
// //             setSelectedUsers(prev => prev.filter(id => id !== deleteId));
// //             router.refresh();
// //         } catch (err: any) {
// //             toast.error(err.message || "Failed to delete user");
// //         } finally {
// //             setDeleteId(null);
// //         }
// //     };

// //     const getRoleIcon = (role: string) => {
// //         switch(role?.toLowerCase()) {
// //             case "admin": return Crown;
// //             case "moderator": return Shield;
// //             default: return UserCheck;
// //         }
// //     };

// //     const getRoleColor = (role: string) => {
// //         switch(role?.toLowerCase()) {
// //             case "admin": return "bg-purple-100 text-purple-700 border-purple-200";
// //             case "moderator": return "bg-blue-100 text-blue-700 border-blue-200";
// //             default: return "bg-gray-100 text-gray-700 border-gray-200";
// //         }
// //     };

// //     const formatDate = (dateString?: string) => {
// //         if (!dateString) return "N/A";
// //         return new Date(dateString).toLocaleDateString('en-US', {
// //             year: 'numeric',
// //             month: 'short',
// //             day: 'numeric'
// //         });
// //     };

// //     const getUserInitials = (user: User) => {
// //         if (user.firstName) return user.firstName[0].toUpperCase();
// //         if (user.email) return user.email[0].toUpperCase();
// //         return "U";
// //     };

// //     const getUserDisplayName = (user: User) => {
// //         if (user.firstName || user.lastName) {
// //             return `${user.firstName || ''} ${user.lastName || ''}`.trim();
// //         }
// //         return user.email.split('@')[0];
// //     };

// //     const buildPaginationUrl = (page: number) => {
// //         const params = new URLSearchParams();
// //         params.set('page', page.toString());
// //         params.set('size', pagination.size.toString());
// //         if (searchQuery.trim()) params.set('search', searchQuery.trim());
// //         if (roleFilter !== "All") params.set('role', roleFilter.toLowerCase());
// //         if (statusFilter !== "All") params.set('status', statusFilter.toLowerCase());
// //         return `/admin/users?${params.toString()}`;
// //     };

// //     const makePagination = (): React.ReactElement[] => {
// //         const pages = [];
// //         const currentPage = pagination.page;
// //         const totalPages = pagination.totalPages;
// //         const delta = 1;

// //         // Previous button
// //         pages.push(
// //             <Link
// //                 key="prev"
// //                 className={`px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium transition-colors ${
// //                     currentPage === 1
// //                         ? 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
// //                         : 'text-gray-700 hover:bg-gray-50'
// //                 }`}
// //                 href={currentPage === 1 ? '#' : buildPaginationUrl(currentPage - 1)}
// //             >
// //                 Previous
// //             </Link>
// //         );

// //         // Calculate range
// //         let startPage = Math.max(1, currentPage - delta);
// //         let endPage = Math.min(totalPages, currentPage + delta);

// //         // First page
// //         if (startPage > 1) {
// //             pages.push(
// //                 <Link
// //                     key={1}
// //                     className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
// //                     href={buildPaginationUrl(1)}
// //                 >
// //                     1
// //                 </Link>
// //             );
// //             if (startPage > 2) {
// //                 pages.push(<span key="ellipsis1" className="px-2 text-gray-500">...</span>);
// //             }
// //         }

// //         // Page numbers
// //         for (let i = startPage; i <= endPage; i++) {
// //             pages.push(
// //                 <Link
// //                     key={i}
// //                     className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
// //                         i === currentPage
// //                             ? 'bg-blue-600 text-white'
// //                             : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
// //                     }`}
// //                     href={buildPaginationUrl(i)}
// //                 >
// //                     {i}
// //                 </Link>
// //             );
// //         }

// //         // Last page
// //         if (endPage < totalPages) {
// //             if (endPage < totalPages - 1) {
// //                 pages.push(<span key="ellipsis2" className="px-2 text-gray-500">...</span>);
// //             }
// //             pages.push(
// //                 <Link
// //                     key={totalPages}
// //                     className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
// //                     href={buildPaginationUrl(totalPages)}
// //                 >
// //                     {totalPages}
// //                 </Link>
// //             );
// //         }

// //         // Next button
// //         pages.push(
// //             <Link
// //                 key="next"
// //                 className={`px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium transition-colors ${
// //                     currentPage === totalPages
// //                         ? 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
// //                         : 'text-gray-700 hover:bg-gray-50'
// //                 }`}
// //                 href={currentPage === totalPages ? '#' : buildPaginationUrl(currentPage + 1)}
// //             >
// //                 Next
// //             </Link>
// //         );

// //         return pages;
// //     };

// //     return (
// //         <div className="max-w-7xl mx-auto">
// //             <DeleteModal
// //                 isOpen={!!deleteId}
// //                 onClose={() => setDeleteId(null)}
// //                 onConfirm={onDelete}
// //                 title="Delete User"
// //                 description="Are you sure you want to delete this user? This action cannot be undone."
// //             />

// //             {/* Page Header */}
// //             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
// //                 <div>
// //                     <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
// //                         <Users className="h-8 w-8 text-blue-600" />
// //                         Users Management
// //                     </h1>
// //                     <p className="text-gray-600 mt-2">Manage and monitor all users on Frendly</p>
// //                 </div>
// //                 <div className="flex items-center gap-3">
// //                     <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all">
// //                         <Download className="h-4 w-4" />
// //                         <span className="hidden sm:inline">Export</span>
// //                     </button>
// //                     <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all">
// //                         <Upload className="h-4 w-4" />
// //                         <span className="hidden sm:inline">Import</span>
// //                     </button>
// //                     <Link
// //                         href="/admin/users/create"
// //                         className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
// //                     >
// //                         <Plus className="h-5 w-5" />
// //                         Create User
// //                     </Link>
// //                 </div>
// //             </div>

// //             {/* Stats Cards */}
// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
// //                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
// //                     <div className="flex items-center justify-between">
// //                         <div>
// //                             <p className="text-sm text-gray-600 font-medium">Total Users</p>
// //                             <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalUsers}</p>
// //                             <p className="text-xs text-gray-500 mt-1">All registered users</p>
// //                         </div>
// //                         <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
// //                             <Users className="h-6 w-6 text-blue-600" />
// //                         </div>
// //                     </div>
// //                 </div>
                
// //                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
// //                     <div className="flex items-center justify-between">
// //                         <div>
// //                             <p className="text-sm text-gray-600 font-medium">Active Users</p>
// //                             <p className="text-2xl font-bold text-green-600 mt-1">{stats.activeUsers}</p>
// //                             <p className="text-xs text-gray-500 mt-1">Currently active</p>
// //                         </div>
// //                         <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
// //                             <CheckCircle className="h-6 w-6 text-green-600" />
// //                         </div>
// //                     </div>
// //                 </div>

// //                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
// //                     <div className="flex items-center justify-between">
// //                         <div>
// //                             <p className="text-sm text-gray-600 font-medium">Inactive Users</p>
// //                             <p className="text-2xl font-bold text-gray-600 mt-1">{stats.inactiveUsers}</p>
// //                             <p className="text-xs text-gray-500 mt-1">Not active</p>
// //                         </div>
// //                         <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center">
// //                             <XCircle className="h-6 w-6 text-gray-600" />
// //                         </div>
// //                     </div>
// //                 </div>

// //                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
// //                     <div className="flex items-center justify-between">
// //                         <div>
// //                             <p className="text-sm text-gray-600 font-medium">Admins</p>
// //                             <p className="text-2xl font-bold text-purple-600 mt-1">{stats.adminUsers}</p>
// //                             <p className="text-xs text-gray-500 mt-1">Admin users</p>
// //                         </div>
// //                         <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center">
// //                             <Crown className="h-6 w-6 text-purple-600" />
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>

// //             {/* Filters and Search */}
// //             <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
// //                 <div className="p-4 border-b border-gray-200">
// //                     <div className="flex flex-col md:flex-row gap-4">
// //                         {/* Search */}
// //                         <div className="flex-1">
// //                             <div className="relative">
// //                                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
// //                                 <input
// //                                     type="text"
// //                                     value={searchQuery}
// //                                     onChange={(e) => setSearchQuery(e.target.value)}
// //                                     onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
// //                                     placeholder="Search users by name or email..."
// //                                     className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
// //                                 />
// //                             </div>
// //                         </div>

// //                         {/* Filters */}
// //                         <div className="flex gap-3">
// //                             <div className="relative">
// //                                 <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
// //                                 <select
// //                                     value={roleFilter}
// //                                     onChange={(e) => handleFilterChange('role', e.target.value)}
// //                                     className="pl-9 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
// //                                 >
// //                                     <option value="All">All Roles</option>
// //                                     <option value="Admin">Admin</option>
// //                                     <option value="Moderator">Moderator</option>
// //                                     <option value="User">User</option>
// //                                 </select>
// //                             </div>

// //                             <div className="relative">
// //                                 <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
// //                                 <select
// //                                     value={statusFilter}
// //                                     onChange={(e) => handleFilterChange('status', e.target.value)}
// //                                     className="pl-9 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
// //                                 >
// //                                     <option value="All">All Status</option>
// //                                     <option value="Active">Active</option>
// //                                     <option value="Inactive">Inactive</option>
// //                                 </select>
// //                             </div>
                            
// //                             <button
// //                                 onClick={handleSearch}
// //                                 className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
// //                             >
// //                                 Search
// //                             </button>
// //                         </div>
// //                     </div>

// //                     {/* Selected Actions */}
// //                     {selectedUsers.length > 0 && (
// //                         <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
// //                             <span className="text-sm font-medium text-blue-900">
// //                                 {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
// //                             </span>
// //                             <div className="flex items-center gap-2">
// //                                 <button className="px-3 py-1.5 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
// //                                     Export Selected
// //                                 </button>
// //                                 <button className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
// //                                     Delete Selected
// //                                 </button>
// //                             </div>
// //                         </div>
// //                     )}
// //                 </div>

// //                 {/* Table */}
// //                 <div className="overflow-x-auto">
// //                     <table className="w-full">
// //                         <thead className="bg-gray-50 border-b border-gray-200">
// //                             <tr>
// //                                 <th className="px-6 py-3 text-left">
// //                                     <input
// //                                         type="checkbox"
// //                                         checked={selectedUsers.length === users.length && users.length > 0}
// //                                         onChange={toggleSelectAll}
// //                                         className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
// //                                     />
// //                                 </th>
// //                                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
// //                                     User
// //                                 </th>
// //                                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
// //                                     Role
// //                                 </th>
// //                                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
// //                                     Status
// //                                 </th>
// //                                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
// //                                     Activity
// //                                 </th>
// //                                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden xl:table-cell">
// //                                     Joined Date
// //                                 </th>
// //                                 <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
// //                                     Actions
// //                                 </th>
// //                             </tr>
// //                         </thead>
// //                         <tbody className="divide-y divide-gray-200 bg-white">
// //                             {users.map((user) => {
// //                                 const RoleIcon = getRoleIcon(user.role);
                                
// //                                 return (
// //                                     <tr key={user._id} className="hover:bg-gray-50 transition-colors">
// //                                         <td className="px-6 py-4 whitespace-nowrap">
// //                                             <input
// //                                                 type="checkbox"
// //                                                 checked={selectedUsers.includes(user._id)}
// //                                                 onChange={() => toggleSelectUser(user._id)}
// //                                                 className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
// //                                             />
// //                                         </td>
// //                                         <td className="px-6 py-4 whitespace-nowrap">
// //                                             <div className="flex items-center gap-3">
// //                                                 {user.imageUrl ? (
// //                                                     <Image
// //                                                         src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${user.imageUrl}`}
// //                                                         alt={getUserDisplayName(user)}
// //                                                         className="h-10 w-10 rounded-full object-cover shadow-sm flex-shrink-0"
// //                                                         width={40}
// //                                                         height={40}
// //                                                     />
// //                                                 ) : (
// //                                                     <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm flex-shrink-0">
// //                                                         <span className="text-white font-semibold text-sm">
// //                                                             {getUserInitials(user)}
// //                                                         </span>
// //                                                     </div>
// //                                                 )}
// //                                                 <div className="min-w-0">
// //                                                     <div className="font-medium text-gray-900 truncate">
// //                                                         {getUserDisplayName(user)}
// //                                                     </div>
// //                                                     <div className="text-sm text-gray-500 truncate">{user.email}</div>
// //                                                 </div>
// //                                             </div>
// //                                         </td>
// //                                         <td className="px-6 py-4 whitespace-nowrap">
// //                                             <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border capitalize ${getRoleColor(user.role)}`}>
// //                                                 <RoleIcon className="h-3 w-3" />
// //                                                 {user.role}
// //                                             </span>
// //                                         </td>
// //                                         <td className="px-6 py-4 whitespace-nowrap">
// //                                             <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium capitalize ${
// //                                                 user.status?.toLowerCase() === "active"
// //                                                     ? "bg-green-100 text-green-700 border border-green-200"
// //                                                     : "bg-gray-100 text-gray-700 border border-gray-200"
// //                                             }`}>
// //                                                 <span className={`h-1.5 w-1.5 rounded-full ${
// //                                                     user.status?.toLowerCase() === "active" ? "bg-green-500" : "bg-gray-500"
// //                                                 }`}></span>
// //                                                 {user.status || 'Unknown'}
// //                                             </span>
// //                                         </td>
// //                                         <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
// //                                             <div className="text-sm text-gray-900">{user.postsCount || 0} posts</div>
// //                                             <div className="text-xs text-gray-500">{user.followersCount || 0} followers</div>
// //                                         </td>
// //                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 hidden xl:table-cell">
// //                                             {formatDate(user.createdAt)}
// //                                         </td>
// //                                         <td className="px-6 py-4 whitespace-nowrap text-right">
// //                                             <div className="flex items-center justify-end gap-2">
// //                                                 <Link
// //                                                     href={`/admin/users/${user._id}`}
// //                                                     className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
// //                                                     title="View Details"
// //                                                 >
// //                                                     <Eye className="h-4 w-4" />
// //                                                 </Link>
// //                                                 <Link
// //                                                     href={`/admin/users/${user._id}/edit`}
// //                                                     className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
// //                                                     title="Edit User"
// //                                                 >
// //                                                     <Edit className="h-4 w-4" />
// //                                                 </Link>
// //                                                 <button
// //                                                     onClick={() => setDeleteId(user._id)}
// //                                                     className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
// //                                                     title="Delete User"
// //                                                 >
// //                                                     <Trash2 className="h-4 w-4" />
// //                                                 </button>
// //                                                 <button
// //                                                     className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
// //                                                     title="More Options"
// //                                                 >
// //                                                     <MoreVertical className="h-4 w-4" />
// //                                                 </button>
// //                                             </div>
// //                                         </td>
// //                                     </tr>
// //                                 );
// //                             })}
// //                         </tbody>
// //                     </table>
// //                 </div>

// //                 {/* Empty State */}
// //                 {users.length === 0 && (
// //                     <div className="text-center py-12">
// //                         <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
// //                         <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
// //                         <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
// //                         <button 
// //                             onClick={clearFilters}
// //                             className="text-blue-600 hover:text-blue-700 font-medium"
// //                         >
// //                             Clear all filters
// //                         </button>
// //                     </div>
// //                 )}

// //                 {/* Pagination */}
// //                 {users.length > 0 && (
// //                     <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
// //                         <div className="text-sm text-gray-600">
// //                             Showing <span className="font-medium">{((pagination.page - 1) * pagination.size) + 1}</span> to{" "}
// //                             <span className="font-medium">
// //                                 {Math.min(pagination.page * pagination.size, pagination.totalItems)}
// //                             </span> of{" "}
// //                             <span className="font-medium">{pagination.totalItems}</span> users
// //                         </div>
// //                         <div className="flex items-center gap-2">
// //                             {makePagination()}
// //                         </div>
// //                     </div>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // }





// // app/admin/users/UsersPageClient.tsx
// 'use client';

// import { useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { User, UserRole, UserStatus } from '@/types/user';

// interface Pagination {
//     page: number;
//     size: number;
//     totalPages: number;
//     totalItems: number;
// }

// interface Stats {
//     totalUsers: number;
//     activeUsers: number;
//     inactiveUsers: number;
//     adminUsers: number;
// }

// interface UsersPageClientProps {
//     initialUsers: User[];
//     initialPagination: Pagination;
//     initialStats: Stats | null;
// }

// export default function UsersPageClient({
//     initialUsers,
//     initialPagination,
//     initialStats,
// }: UsersPageClientProps) {
//     const router = useRouter();
//     const searchParams = useSearchParams();
    
//     const [users] = useState<User[]>(initialUsers);
//     const [pagination] = useState<Pagination>(initialPagination);
//     const [stats] = useState<Stats | null>(initialStats);

//     // Get current filters from URL
//     const currentPage = parseInt(searchParams.get('page') || '1');
//     const currentSize = parseInt(searchParams.get('size') || '10');
//     const currentSearch = searchParams.get('search') || '';
//     const currentRole = searchParams.get('role') || '';
//     const currentStatus = searchParams.get('status') || '';

//     // Update URL with new search params
//     const updateURL = (params: Record<string, string>) => {
//         const newParams = new URLSearchParams(searchParams.toString());
        
//         Object.entries(params).forEach(([key, value]) => {
//             if (value) {
//                 newParams.set(key, value);
//             } else {
//                 newParams.delete(key);
//             }
//         });

//         router.push(`?${newParams.toString()}`);
//     };

//     // Handle search
//     const handleSearch = (query: string) => {
//         updateURL({ search: query, page: '1' });
//     };

//     // Handle role filter
//     const handleRoleFilter = (role: string) => {
//         updateURL({ role, page: '1' });
//     };

//     // Handle status filter
//     const handleStatusFilter = (status: string) => {
//         updateURL({ status, page: '1' });
//     };

//     // Handle page change
//     const handlePageChange = (page: number) => {
//         updateURL({ page: page.toString() });
//     };

//     // Handle page size change
//     const handlePageSizeChange = (size: number) => {
//         updateURL({ size: size.toString(), page: '1' });
//     };

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 {/* Header */}
//                 <div className="mb-8">
//                     <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
//                     <p className="mt-2 text-sm text-gray-600">
//                         Manage and monitor all users in the system
//                     </p>
//                 </div>

//                 {/* Stats Cards */}
//                 {stats && (
//                     <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
//                         <div className="bg-white overflow-hidden shadow rounded-lg">
//                             <div className="p-5">
//                                 <div className="flex items-center">
//                                     <div className="flex-shrink-0">
//                                         <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//                                         </svg>
//                                     </div>
//                                     <div className="ml-5 w-0 flex-1">
//                                         <dl>
//                                             <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
//                                             <dd className="text-lg font-semibold text-gray-900">{stats.totalUsers}</dd>
//                                         </dl>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="bg-white overflow-hidden shadow rounded-lg">
//                             <div className="p-5">
//                                 <div className="flex items-center">
//                                     <div className="flex-shrink-0">
//                                         <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                         </svg>
//                                     </div>
//                                     <div className="ml-5 w-0 flex-1">
//                                         <dl>
//                                             <dt className="text-sm font-medium text-gray-500 truncate">Active Users</dt>
//                                             <dd className="text-lg font-semibold text-green-600">{stats.activeUsers}</dd>
//                                         </dl>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="bg-white overflow-hidden shadow rounded-lg">
//                             <div className="p-5">
//                                 <div className="flex items-center">
//                                     <div className="flex-shrink-0">
//                                         <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                         </svg>
//                                     </div>
//                                     <div className="ml-5 w-0 flex-1">
//                                         <dl>
//                                             <dt className="text-sm font-medium text-gray-500 truncate">Inactive Users</dt>
//                                             <dd className="text-lg font-semibold text-red-600">{stats.inactiveUsers}</dd>
//                                         </dl>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="bg-white overflow-hidden shadow rounded-lg">
//                             <div className="p-5">
//                                 <div className="flex items-center">
//                                     <div className="flex-shrink-0">
//                                         <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                                         </svg>
//                                     </div>
//                                     <div className="ml-5 w-0 flex-1">
//                                         <dl>
//                                             <dt className="text-sm font-medium text-gray-500 truncate">Admin Users</dt>
//                                             <dd className="text-lg font-semibold text-blue-600">{stats.adminUsers}</dd>
//                                         </dl>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Filters */}
//                 <div className="bg-white shadow rounded-lg mb-6">
//                     <div className="p-6">
//                         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//                             <div>
//                                 <label htmlFor="search" className="block text-sm font-medium text-gray-700">
//                                     Search
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="search"
//                                     placeholder="Search by name or email..."
//                                     defaultValue={currentSearch}
//                                     onChange={(e) => handleSearch(e.target.value)}
//                                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 />
//                             </div>

//                             <div>
//                                 <label htmlFor="role" className="block text-sm font-medium text-gray-700">
//                                     Role
//                                 </label>
//                                 <select
//                                     id="role"
//                                     value={currentRole}
//                                     onChange={(e) => handleRoleFilter(e.target.value)}
//                                     className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//                                 >
//                                     <option value="">All Roles</option>
//                                     <option value="user">User</option>
//                                     <option value="admin">Admin</option>
//                                 </select>
//                             </div>

//                             <div>
//                                 <label htmlFor="status" className="block text-sm font-medium text-gray-700">
//                                     Status
//                                 </label>
//                                 <select
//                                     id="status"
//                                     value={currentStatus}
//                                     onChange={(e) => handleStatusFilter(e.target.value)}
//                                     className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//                                 >
//                                     <option value="">All Status</option>
//                                     <option value="active">Active</option>
//                                     <option value="inactive">Inactive</option>
//                                 </select>
//                             </div>

//                             <div>
//                                 <label htmlFor="pageSize" className="block text-sm font-medium text-gray-700">
//                                     Items per page
//                                 </label>
//                                 <select
//                                     id="pageSize"
//                                     value={currentSize}
//                                     onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//                                     className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//                                 >
//                                     <option value="10">10</option>
//                                     <option value="25">25</option>
//                                     <option value="50">50</option>
//                                     <option value="100">100</option>
//                                 </select>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Users Table */}
//                 <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//                     <div className="overflow-x-auto">
//                         <table className="min-w-full divide-y divide-gray-200">
//                             <thead className="bg-gray-50">
//                                 <tr>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         Name
//                                     </th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         Email
//                                     </th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         Role
//                                     </th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         Status
//                                     </th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         Created At
//                                     </th>
//                                     <th scope="col" className="relative px-6 py-3">
//                                         <span className="sr-only">Actions</span>
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-200">
//                                 {users.length === 0 ? (
//                                     <tr>
//                                         <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
//                                             No users found
//                                         </td>
//                                     </tr>
//                                 ) : (
//                                     users.map((user) => (
//                                         <tr key={user.id}>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                                                 {user.name}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                 {user.email}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                 <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                                                     user.role === 'admin' 
//                                                         ? 'bg-purple-100 text-purple-800' 
//                                                         : 'bg-gray-100 text-gray-800'
//                                                 }`}>
//                                                     {user.role}
//                                                 </span>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                 <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                                                     user.status === 'active' 
//                                                         ? 'bg-green-100 text-green-800' 
//                                                         : 'bg-red-100 text-red-800'
//                                                 }`}>
//                                                     {user.status}
//                                                 </span>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                 {new Date(user.createdAt).toLocaleDateString()}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                                 <button className="text-blue-600 hover:text-blue-900 mr-4">
//                                                     Edit
//                                                 </button>
//                                                 <button className="text-red-600 hover:text-red-900">
//                                                     Delete
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* Pagination */}
//                     {users.length > 0 && (
//                         <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
//                             <div className="flex-1 flex justify-between sm:hidden">
//                                 <button
//                                     onClick={() => handlePageChange(currentPage - 1)}
//                                     disabled={currentPage === 1}
//                                     className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                                 >
//                                     Previous
//                                 </button>
//                                 <button
//                                     onClick={() => handlePageChange(currentPage + 1)}
//                                     disabled={currentPage >= pagination.totalPages}
//                                     className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                                 >
//                                     Next
//                                 </button>
//                             </div>
//                             <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//                                 <div>
//                                     <p className="text-sm text-gray-700">
//                                         Showing <span className="font-medium">{(currentPage - 1) * currentSize + 1}</span> to{' '}
//                                         <span className="font-medium">
//                                             {Math.min(currentPage * currentSize, pagination.totalItems)}
//                                         </span>{' '}
//                                         of <span className="font-medium">{pagination.totalItems}</span> results
//                                     </p>
//                                 </div>
//                                 <div>
//                                     <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//                                         <button
//                                             onClick={() => handlePageChange(currentPage - 1)}
//                                             disabled={currentPage === 1}
//                                             className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                                         >
//                                             <span className="sr-only">Previous</span>
//                                             <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                                                 <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
//                                             </svg>
//                                         </button>
                                        
//                                         {Array.from({ length: Math.min(pagination.totalPages, 7) }, (_, i) => {
//                                             let pageNum;
//                                             const totalPages = pagination.totalPages;
                                            
//                                             if (totalPages <= 7) {
//                                                 pageNum = i + 1;
//                                             } else if (currentPage <= 4) {
//                                                 pageNum = i + 1;
//                                             } else if (currentPage >= totalPages - 3) {
//                                                 pageNum = totalPages - 6 + i;
//                                             } else {
//                                                 pageNum = currentPage - 3 + i;
//                                             }
                                            
//                                             return (
//                                                 <button
//                                                     key={pageNum}
//                                                     onClick={() => handlePageChange(pageNum)}
//                                                     className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
//                                                         pageNum === currentPage
//                                                             ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
//                                                             : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
//                                                     }`}
//                                                 >
//                                                     {pageNum}
//                                                 </button>
//                                             );
//                                         })}

//                                         <button
//                                             onClick={() => handlePageChange(currentPage + 1)}
//                                             disabled={currentPage >= pagination.totalPages}
//                                             className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                                         >
//                                             <span className="sr-only">Next</span>
//                                             <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                                                 <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                                             </svg>
//                                         </button>
//                                     </nav>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }