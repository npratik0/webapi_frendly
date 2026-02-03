// export default function Page() {
//     return (
//         <div>Dashboard Here</div>
//     );
// }


"use client";

import { 
    Users, 
    UserPlus, 
    MessageSquare, 
    Heart, 
    TrendingUp, 
    TrendingDown,
    Activity,
    Eye,
    Share2,
    Clock,
    MoreVertical
} from "lucide-react";
import { useState } from "react";

// Dummy data
const STATS = [
    { 
        label: "Total Users", 
        value: "12,458", 
        change: "+12.5%", 
        trend: "up", 
        icon: Users,
        color: "blue"
    },
    { 
        label: "New Users (Today)", 
        value: "234", 
        change: "+8.2%", 
        trend: "up", 
        icon: UserPlus,
        color: "green"
    },
    { 
        label: "Total Posts", 
        value: "45,672", 
        change: "+23.1%", 
        trend: "up", 
        icon: MessageSquare,
        color: "purple"
    },
    { 
        label: "Engagement Rate", 
        value: "68.4%", 
        change: "-2.3%", 
        trend: "down", 
        icon: Heart,
        color: "pink"
    },
];

const RECENT_USERS = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", joined: "2 minutes ago", avatar: "A" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", joined: "15 minutes ago", avatar: "B" },
    { id: 3, name: "Carol White", email: "carol@example.com", joined: "1 hour ago", avatar: "C" },
    { id: 4, name: "David Brown", email: "david@example.com", joined: "2 hours ago", avatar: "D" },
    { id: 5, name: "Emma Davis", email: "emma@example.com", joined: "3 hours ago", avatar: "E" },
];

const RECENT_POSTS = [
    { id: 1, user: "John Doe", content: "Just launched my new project! Check it out 🚀", likes: 245, comments: 32, time: "5 min ago" },
    { id: 2, user: "Jane Smith", content: "Beautiful sunset at the beach today 🌅", likes: 892, comments: 67, time: "12 min ago" },
    { id: 3, user: "Mike Johnson", content: "Working on something exciting...", likes: 156, comments: 23, time: "25 min ago" },
    { id: 4, user: "Sarah Williams", content: "Coffee and coding ☕💻", likes: 421, comments: 45, time: "1 hour ago" },
];

const TRENDING_TOPICS = [
    { tag: "#Technology", posts: 1234, growth: "+15%" },
    { tag: "#Design", posts: 892, growth: "+8%" },
    { tag: "#Travel", posts: 756, growth: "+12%" },
    { tag: "#Food", posts: 634, growth: "+5%" },
    { tag: "#Fitness", posts: 521, growth: "+18%" },
];

export default function DashboardPage() {
    const [timeRange, setTimeRange] = useState("today");

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with Frendly today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <select 
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="year">This Year</option>
                    </select>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STATS.map((stat, index) => {
                    const Icon = stat.icon;
                    const colorClasses = {
                        blue: "bg-blue-100 text-blue-600",
                        green: "bg-green-100 text-green-600",
                        purple: "bg-purple-100 text-purple-600",
                        pink: "bg-pink-100 text-pink-600",
                    };

                    return (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                    <div className="flex items-center gap-2 mt-3">
                                        {stat.trend === "up" ? (
                                            <TrendingUp className="h-4 w-4 text-green-600" />
                                        ) : (
                                            <TrendingDown className="h-4 w-4 text-red-600" />
                                        )}
                                        <span className={`text-sm font-medium ${
                                            stat.trend === "up" ? "text-green-600" : "text-red-600"
                                        }`}>
                                            {stat.change}
                                        </span>
                                        <span className="text-xs text-gray-500">vs last period</span>
                                    </div>
                                </div>
                                <div className={`h-12 w-12 rounded-xl ${colorClasses[stat.color as keyof typeof colorClasses]} flex items-center justify-center`}>
                                    <Icon className="h-6 w-6" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Charts and Activity Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* User Growth Chart */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">User Growth</h2>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <MoreVertical className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>
                    
                    {/* Simple Bar Chart Visualization */}
                    <div className="space-y-4">
                        {[
                            { day: "Mon", users: 85, maxUsers: 100 },
                            { day: "Tue", users: 92, maxUsers: 100 },
                            { day: "Wed", users: 78, maxUsers: 100 },
                            { day: "Thu", users: 95, maxUsers: 100 },
                            { day: "Fri", users: 100, maxUsers: 100 },
                            { day: "Sat", users: 88, maxUsers: 100 },
                            { day: "Sun", users: 82, maxUsers: 100 },
                        ].map((data) => (
                            <div key={data.day} className="flex items-center gap-4">
                                <div className="w-12 text-sm font-medium text-gray-600">{data.day}</div>
                                <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                                    <div 
                                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full flex items-center justify-end pr-3"
                                        style={{ width: `${data.users}%` }}
                                    >
                                        <span className="text-xs font-semibold text-white">{data.users}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">642</div>
                            <div className="text-xs text-gray-500 mt-1">This Week</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">2.4K</div>
                            <div className="text-xs text-gray-500 mt-1">This Month</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">12.4K</div>
                            <div className="text-xs text-gray-500 mt-1">Total</div>
                        </div>
                    </div>
                </div>

                {/* Trending Topics */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Trending Topics</h2>
                        <Activity className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        {TRENDING_TOPICS.map((topic, index) => (
                            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">{topic.tag}</div>
                                        <div className="text-xs text-gray-500">{topic.posts} posts</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-green-600">
                                    <TrendingUp className="h-4 w-4" />
                                    <span className="text-xs font-semibold">{topic.growth}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Activity Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Users */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Recent Users</h2>
                        <UserPlus className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        {RECENT_USERS.map((user) => (
                            <div key={user.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-md">
                                    {user.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-gray-900 truncate">{user.name}</div>
                                    <div className="text-sm text-gray-500 truncate">{user.email}</div>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <Clock className="h-3 w-3" />
                                    {user.joined}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Posts */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Recent Posts</h2>
                        <MessageSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        {RECENT_POSTS.map((post) => (
                            <div key={post.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="font-semibold text-gray-900">{post.user}</div>
                                    <div className="text-xs text-gray-500">{post.time}</div>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">{post.content}</p>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                        <Heart className="h-4 w-4" />
                                        <span>{post.likes}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                        <MessageSquare className="h-4 w-4" />
                                        <span>{post.comments}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                        <Share2 className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Stats Footer */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                        <Eye className="h-8 w-8 mx-auto mb-2 opacity-80" />
                        <div className="text-2xl font-bold">1.2M</div>
                        <div className="text-sm text-blue-100 mt-1">Total Views</div>
                    </div>
                    <div className="text-center">
                        <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-80" />
                        <div className="text-2xl font-bold">45.6K</div>
                        <div className="text-sm text-blue-100 mt-1">Comments</div>
                    </div>
                    <div className="text-center">
                        <Share2 className="h-8 w-8 mx-auto mb-2 opacity-80" />
                        <div className="text-2xl font-bold">8.9K</div>
                        <div className="text-sm text-blue-100 mt-1">Shares</div>
                    </div>
                    <div className="text-center">
                        <Heart className="h-8 w-8 mx-auto mb-2 opacity-80" />
                        <div className="text-2xl font-bold">234K</div>
                        <div className="text-sm text-blue-100 mt-1">Total Likes</div>
                    </div>
                </div>
            </div>
        </div>
    );
}