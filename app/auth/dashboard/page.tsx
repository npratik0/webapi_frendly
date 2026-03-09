// "use client";

// import { useState } from "react";
// import {
//   Home,
//   Search,
//   PlusSquare,
//   Heart,
//   MessageCircle,
//   Bookmark,
//   MoreHorizontal,
//   Send,
//   Smile,
//   Bell,
//   User,
//   LogOut,
//   Settings,
//   Menu,
//   X,
// } from "lucide-react";

// export default function FrendlyHomePage() {
//   const [showCreatePost, setShowCreatePost] = useState(false);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);
//   const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
//   const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set());

//   const currentUser = {
//     username: "johndoe",
//     fullName: "John Doe",
//     profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
//   };

//   const stories = [
//     { id: 1, username: "Your Story", image: currentUser.profilePicture, isOwn: true },
//     { id: 2, username: "alice_wonder", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" },
//     { id: 3, username: "bob_builder", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob" },
//     { id: 4, username: "charlie_chap", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie" },
//     { id: 5, username: "diana_prince", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diana" },
//     { id: 6, username: "eve_online", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eve" },
//   ];

//   const posts = [
//     {
//       id: 1,
//       user: { username: "alice_wonder", fullName: "Alice Wonder", profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" },
//       imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop",
//       caption: "Beautiful sunset at the beach 🌅 #nature #sunset",
//       likes: 234,
//       comments: 45,
//       timeAgo: "2 hours ago",
//     },
//     {
//       id: 2,
//       user: { username: "bob_builder", fullName: "Bob Builder", profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob" },
//       imageUrl: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=800&h=800&fit=crop",
//       caption: "Coffee time ☕ Who else needs this on Monday?",
//       likes: 156,
//       comments: 28,
//       timeAgo: "4 hours ago",
//     },
//     {
//       id: 3,
//       user: { username: "charlie_chap", fullName: "Charlie Chaplin", profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie" },
//       imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
//       caption: "New kicks! 👟 #sneakerhead #style",
//       likes: 892,
//       comments: 167,
//       timeAgo: "6 hours ago",
//     },
//   ];

//   const suggestions = [
//     { username: "travel_tales", fullName: "Travel Tales", profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Travel" },
//     { username: "foodie_life", fullName: "Foodie Life", profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Food" },
//     { username: "tech_guru", fullName: "Tech Guru", profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tech" },
//   ];

//   const toggleLike = (postId: number) => {
//     setLikedPosts((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(postId)) {
//         newSet.delete(postId);
//       } else {
//         newSet.add(postId);
//       }
//       return newSet;
//     });
//   };

//   const toggleSave = (postId: number) => {
//     setSavedPosts((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(postId)) {
//         newSet.delete(postId);
//       } else {
//         newSet.add(postId);
//       }
//       return newSet;
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Top Navigation */}
//       <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
//         <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-8">
//             <h1 className="text-2xl font-bold italic text-blue-600">Frendly</h1>
//             <div className="hidden md:block relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="w-64 h-9 pl-10 pr-4 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           <div className="hidden md:flex items-center gap-6">
//             <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//               <Home className="w-6 h-6 text-blue-600" />
//             </button>
//             <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
//               <Bell className="w-6 h-6 text-gray-700" />
//               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//             </button>
//             <button
//               onClick={() => setShowCreatePost(true)}
//               className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               <PlusSquare className="w-6 h-6 text-gray-700" />
//             </button>
//             <div className="relative group">
//               <button className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300">
//                 <img src={currentUser.profilePicture} alt="Profile" className="w-full h-full object-cover" />
//               </button>
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
//                 <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
//                   <User className="w-4 h-4" />
//                   <span className="text-sm">Profile</span>
//                 </a>
//                 <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
//                   <Settings className="w-4 h-4" />
//                   <span className="text-sm">Settings</span>
//                 </a>
//                 <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-t">
//                   <LogOut className="w-4 h-4" />
//                   <span className="text-sm">Log out</span>
//                 </button>
//               </div>
//             </div>
//           </div>

//           <button
//             className="md:hidden p-2"
//             onClick={() => setShowMobileMenu(!showMobileMenu)}
//           >
//             {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>

//         {showMobileMenu && (
//           <div className="md:hidden bg-white border-t border-gray-200 py-4">
//             <div className="px-4 mb-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="w-full h-9 pl-10 pr-4 bg-gray-100 rounded-lg text-sm"
//                 />
//               </div>
//             </div>
//             <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
//               <User className="w-5 h-5" />
//               <span>Profile</span>
//             </a>
//             <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
//               <Settings className="w-5 h-5" />
//               <span>Settings</span>
//             </a>
//             <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
//               <LogOut className="w-5 h-5" />
//               <span>Log out</span>
//             </button>
//           </div>
//         )}
//       </nav>

//       {/* Main Content */}
//       <div className="max-w-6xl mx-auto pt-20 px-4 pb-20">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Feed Section */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Stories */}
//             <div className="bg-white rounded-xl border border-gray-200 p-4">
//               <div className="flex gap-4 overflow-x-auto pb-2">
//                 {stories.map((story) => (
//                   <div key={story.id} className="flex flex-col items-center gap-2 min-w-fit cursor-pointer">
//                     <div className={`w-16 h-16 rounded-full p-0.5 ${story.isOwn ? "bg-gray-300" : "bg-gradient-to-tr from-yellow-400 to-pink-600"}`}>
//                       <div className="w-full h-full bg-white rounded-full p-0.5">
//                         <img
//                           src={story.image}
//                           alt={story.username}
//                           className="w-full h-full rounded-full object-cover"
//                         />
//                       </div>
//                     </div>
//                     <span className="text-xs text-gray-600 max-w-[64px] truncate">
//                       {story.isOwn ? "Your Story" : story.username}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Posts */}
//             {posts.map((post) => (
//               <div key={post.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//                 <div className="flex items-center justify-between p-4">
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={post.user.profilePicture}
//                       alt={post.user.username}
//                       className="w-10 h-10 rounded-full object-cover"
//                     />
//                     <div>
//                       <p className="font-semibold text-sm">{post.user.username}</p>
//                       <p className="text-xs text-gray-500">{post.timeAgo}</p>
//                     </div>
//                   </div>
//                   <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
//                     <MoreHorizontal className="w-5 h-5" />
//                   </button>
//                 </div>

//                 <img src={post.imageUrl} alt="Post" className="w-full aspect-square object-cover" />

//                 <div className="p-4 space-y-3">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-4">
//                       <button
//                         onClick={() => toggleLike(post.id)}
//                         className="hover:opacity-70 transition-opacity"
//                       >
//                         <Heart
//                           className={`w-6 h-6 ${
//                             likedPosts.has(post.id)
//                               ? "fill-red-500 text-red-500"
//                               : "text-gray-700"
//                           }`}
//                         />
//                       </button>
//                       <button className="hover:opacity-70 transition-opacity">
//                         <MessageCircle className="w-6 h-6 text-gray-700" />
//                       </button>
//                       <button className="hover:opacity-70 transition-opacity">
//                         <Send className="w-6 h-6 text-gray-700" />
//                       </button>
//                     </div>
//                     <button
//                       onClick={() => toggleSave(post.id)}
//                       className="hover:opacity-70 transition-opacity"
//                     >
//                       <Bookmark
//                         className={`w-6 h-6 ${
//                           savedPosts.has(post.id)
//                             ? "fill-gray-700 text-gray-700"
//                             : "text-gray-700"
//                         }`}
//                       />
//                     </button>
//                   </div>

//                   <p className="font-semibold text-sm">
//                     {likedPosts.has(post.id) ? post.likes + 1 : post.likes} likes
//                   </p>

//                   <div className="text-sm">
//                     <span className="font-semibold mr-2">{post.user.username}</span>
//                     <span className="text-gray-700">{post.caption}</span>
//                   </div>

//                   <button className="text-sm text-gray-500">
//                     View all {post.comments} comments
//                   </button>

//                   <div className="flex items-center gap-2 border-t pt-3">
//                     <Smile className="w-6 h-6 text-gray-400" />
//                     <input
//                       type="text"
//                       placeholder="Add a comment..."
//                       className="flex-1 text-sm outline-none"
//                     />
//                     <button className="text-sm text-blue-600 font-semibold">Post</button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Sidebar */}
//           <div className="hidden lg:block space-y-6">
//             <div className="bg-white rounded-xl border border-gray-200 p-4">
//               <div className="flex items-center gap-3 mb-4">
//                 <img
//                   src={currentUser.profilePicture}
//                   alt={currentUser.username}
//                   className="w-14 h-14 rounded-full object-cover"
//                 />
//                 <div className="flex-1">
//                   <p className="font-semibold text-sm">{currentUser.username}</p>
//                   <p className="text-sm text-gray-500">{currentUser.fullName}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-xl border border-gray-200 p-4">
//               <div className="flex items-center justify-between mb-4">
//                 <p className="font-semibold text-gray-600 text-sm">Suggestions For You</p>
//                 <button className="text-xs font-semibold">See All</button>
//               </div>
//               <div className="space-y-3">
//                 {suggestions.map((user) => (
//                   <div key={user.username} className="flex items-center gap-3">
//                     <img
//                       src={user.profilePicture}
//                       alt={user.username}
//                       className="w-10 h-10 rounded-full object-cover"
//                     />
//                     <div className="flex-1">
//                       <p className="font-semibold text-sm">{user.username}</p>
//                       <p className="text-xs text-gray-500">{user.fullName}</p>
//                     </div>
//                     <button className="text-xs text-blue-600 font-semibold">Follow</button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="text-xs text-gray-500 space-y-2">
//               <div className="flex flex-wrap gap-2">
//                 <a href="#" className="hover:underline">About</a>
//                 <span>•</span>
//                 <a href="#" className="hover:underline">Help</a>
//                 <span>•</span>
//                 <a href="#" className="hover:underline">Press</a>
//               </div>
//               <p>© 2024 Frendly</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Create Post Modal */}
//       {showCreatePost && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl w-full max-w-lg">
//             <div className="flex items-center justify-between p-4 border-b">
//               <h3 className="font-semibold">Create new post</h3>
//               <button onClick={() => setShowCreatePost(false)}>
//                 <X className="w-6 h-6" />
//               </button>
//             </div>
//             <div className="p-6">
//               <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
//                 <div className="w-12 h-12 mx-auto mb-4 text-gray-400 flex items-center justify-center">
//                   <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                   </svg>
//                 </div>
//                 <p className="text-gray-600 mb-2">Drag photos and videos here</p>
//                 <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
//                   Select from computer
//                 </button>
//               </div>
//               <textarea
//                 placeholder="Write a caption..."
//                 rows={3}
//                 className="w-full mt-4 p-3 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button className="w-full mt-4 h-10 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
//                 Share
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Bottom Navigation (Mobile) */}
//       <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
//         <div className="flex items-center justify-around h-16">
//           <button className="p-2">
//             <Home className="w-6 h-6 text-blue-600" />
//           </button>
//           <button className="p-2">
//             <Search className="w-6 h-6 text-gray-700" />
//           </button>
//           <button className="p-2" onClick={() => setShowCreatePost(true)}>
//             <PlusSquare className="w-6 h-6 text-gray-700" />
//           </button>
//           <button className="p-2 relative">
//             <Bell className="w-6 h-6 text-gray-700" />
//             <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//           </button>
//           <button className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300">
//             <img src={currentUser.profilePicture} alt="Profile" />
//           </button>
//         </div>
//       </nav>
//     </div>
//   );
// }