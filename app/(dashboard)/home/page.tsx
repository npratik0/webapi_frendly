"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { postAPI, Post } from "@/lib/api/post";
import { userAPI, User } from "@/lib/api/user";
import {
  Home,
  Search,
  PlusSquare,
  Bell,
  User as UserIcon,
  LogOut,
  Settings,
  Menu,
  X,
  Loader2,
  TrendingUp,
  Sparkles,
  MessageCircle,
  Heart,
  Bookmark,
  MoreHorizontal,
  Send,
  Camera,
} from "lucide-react";
import { toast } from "react-hot-toast";
import CreatePostModal from "../../components/CreatePostModal";
import PostCard from "../../components/PostCard";
import SearchModal from "@/app/components/SearchModal";
import PostModal from "@/app/components/PostModal";

export default function HomePage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [savedPostIds, setSavedPostIds] = useState<Set<string>>(new Set());

  // Dummy suggestions
  const suggestions = [
    {
      id: "1",
      username: "sarah_designs",
      fullName: "Sarah Wilson",
      profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      bio: "UI/UX Designer | Creative Soul",
    },
    {
      id: "2",
      username: "mike_travels",
      fullName: "Mike Johnson",
      profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      bio: "Travel Blogger | Adventure Seeker",
    },
    {
      id: "3",
      username: "emma_foodie",
      fullName: "Emma Davis",
      profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      bio: "Food Lover | Recipe Creator",
    },
  ];

  useEffect(() => {
    fetchCurrentUser();
    fetchFeed();
    fetchSavedPosts();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await userAPI.getCurrentUser();
      if (response.success) {
        setCurrentUser(response.data);
      }
    } catch (error: any) {
      toast.error("Failed to fetch user data");
      router.push("/login");
    }
  };

  const fetchFeed = async () => {
    try {
      setLoading(true);
      const response = await postAPI.getFeed();
      if (response.success) {
        setPosts(response.data);
      }
    } catch (error: any) {
      toast.error("Failed to load feed");
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedPosts = async () => {
    try {
      const response = await userAPI.getSavedPosts();
      if (response.success) {
        setSavedPostIds(new Set(response.data));
      }
    } catch (error: any) {
      console.error("Failed to fetch saved posts");
    }
  };

  const handleLike = async (postId: string) => {
    try {
      const response = await postAPI.likePost(postId);
      if (response.success) {
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post._id === postId ? response.data : post))
        );
        if (selectedPost && selectedPost._id === postId) {
          setSelectedPost(response.data);
        }
      }
    } catch (error: any) {
      toast.error("Failed to like post");
    }
  };

  const handleComment = async (postId: string, text: string) => {
    try {
      const response = await postAPI.addComment(postId, text);
      if (response.success) {
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post._id === postId ? response.data : post))
        );
        if (selectedPost && selectedPost._id === postId) {
          setSelectedPost(response.data);
        }
      }
    } catch (error: any) {
      toast.error("Failed to add comment");
    }
  };

  const handleSavePost = async (postId: string) => {
    try {
      const isSaved = savedPostIds.has(postId);
      
      if (isSaved) {
        await userAPI.unsavePost(postId);
        setSavedPostIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(postId);
          return newSet;
        });
        toast.success("Post unsaved");
      } else {
        await userAPI.savePost(postId);
        setSavedPostIds(prev => new Set(prev).add(postId));
        toast.success("Post saved");
      }
    } catch (error: any) {
      toast.error("Failed to save post");
    }
  };

  const handleDeleteComment = async (postId: string, commentId: string) => {
    try {
      const response = await postAPI.deleteComment(postId, commentId);
      if (response.success) {
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post._id === postId ? response.data : post))
        );
        if (selectedPost && selectedPost._id === postId) {
          setSelectedPost(response.data);
        }
        toast.success("Comment deleted");
      }
    } catch (error: any) {
      toast.error("Failed to delete comment");
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await postAPI.deletePost(postId);
      if (response.success) {
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
        setSelectedPost(null);
        toast.success("Post deleted successfully");
      }
    } catch (error: any) {
      toast.error("Failed to delete post");
    }
  };

  const handlePostCreated = (newPost: Post) => {
    setPosts([newPost, ...posts]);
    setShowCreatePost(false);
  };

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
            <Sparkles className="w-8 h-8 text-blue-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-gray-700 font-semibold text-lg">Loading your feed...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-b border-gray-200/60 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => router.push('/')}
              className="flex items-center gap-2 group"
            >
              {/* <div className="w-9 h-9 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all">
                <Sparkles className="w-5 h-5 text-white" />
              </div> */}
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Frendly
              </h1>
            </button>
            <button
              onClick={() => setShowSearch(true)}
              className="hidden md:flex items-center gap-2 w-72 h-10 px-4 bg-gray-100/80 hover:bg-gray-200/80 rounded-2xl text-sm text-gray-600 transition-all"
            >
              <Search className="w-4 h-4 text-gray-500" />
              <span>Search users...</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button 
              onClick={() => router.push('/')}
              className="p-2.5 hover:bg-blue-50 rounded-xl transition-all group"
            >
              <Home className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
            </button>
            <button 
              onClick={() => router.push('/messages')}
              className="p-2.5 hover:bg-gray-100 rounded-xl transition-all group relative"
            >
              <MessageCircle className="w-5 h-5 text-gray-700 group-hover:scale-110 transition-transform" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-green-500 rounded-full ring-2 ring-white" />
            </button>
            <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-all group relative">
              <Bell className="w-5 h-5 text-gray-700 group-hover:scale-110 transition-transform" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
            </button>
            <button
              onClick={() => setShowCreatePost(true)}
              className="px-5 py-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/40 transition-all flex items-center gap-2 ml-2"
            >
              <PlusSquare className="w-4 h-4" />
              <span>Create</span>
            </button>
            <div className="relative group ml-2">
              <button className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-xl transition-all">
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-gradient-to-br from-blue-400 to-purple-400 ring-2 ring-blue-100">
                  <img
                    src={
                      currentUser?.profilePicture ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.username || 'default'}`
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="hidden lg:block text-left">
                  <p className="font-semibold text-sm text-gray-900">{currentUser?.fullName}</p>
                  <p className="text-xs text-gray-500">@{currentUser?.username}</p>
                </div>
              </button>
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                      <img
                        src={
                          currentUser?.profilePicture ||
                          `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.username || 'default'}`
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">{currentUser?.fullName}</p>
                      <p className="text-xs text-gray-600 truncate">@{currentUser?.username}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => router.push(`/profile/${currentUser?._id}`)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <UserIcon className="w-4 h-4 text-gray-700" />
                  <span className="text-sm font-medium">View Profile</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left">
                  <Settings className="w-4 h-4 text-gray-700" />
                  <span className="text-sm font-medium">Settings</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left">
                  <Bookmark className="w-4 h-4 text-gray-700" />
                  <span className="text-sm font-medium">Saved Posts</span>
                </button>
                <div className="border-t border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-red-600 text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Log out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button className="md:hidden p-2" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto pt-20 px-4 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Feed Section */}
          <div className="lg:col-span-8 space-y-5">
            {/* Welcome Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">
                      Welcome back, {currentUser?.fullName?.split(" ")[0]}! 👋
                    </h2>
                    <p className="text-blue-100 text-lg">
                      Discover what your friends are up to
                    </p>
                  </div>
                  <TrendingUp className="w-12 h-12 text-white/80" />
                </div>
              </div>
            </div>

            {/* Posts */}
            {posts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-16 text-center">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl rotate-6"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-3xl -rotate-6"></div>
                  <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  No posts yet
                </h3>
                <p className="text-gray-500 mb-8 text-lg">
                  Be the first to share something amazing!
                </p>
                <button
                  onClick={() => setShowCreatePost(true)}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/40 transition-all inline-flex items-center gap-2"
                >
                  <Camera className="w-5 h-5" />
                  Create Your First Post
                </button>
              </div>
            ) : (
              posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  currentUserId={currentUser?._id || ""}
                  isSaved={savedPostIds.has(post._id)}
                  onLike={handleLike}
                  onComment={handleComment}
                  onSave={handleSavePost}
                  onDeleteComment={handleDeleteComment}
                  onDeletePost={handleDeletePost}
                  onOpenPost={() => setSelectedPost(post)}
                />
              ))
            )}
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-4 space-y-5">
            {/* Current User Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center gap-3">
                <img
                  src={
                    currentUser?.profilePicture ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.username || 'default'}`
                  }
                  alt={currentUser?.username}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{currentUser?.fullName}</p>
                  <p className="text-xs text-gray-500 truncate">
                    @{currentUser?.username}
                  </p>
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-900 text-lg">Suggested for you</h3>
                <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  See All
                </button>
              </div>
              <div className="space-y-4">
                {suggestions.map((user) => (
                  <div key={user.id} className="flex items-center gap-3 group">
                    <div className="relative">
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">
                        {user.fullName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        @{user.username}
                      </p>
                    </div>
                    <button className="px-4 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Trending Topics
              </h3>
              <div className="space-y-3">
                {["#Photography", "#Travel", "#FoodLovers", "#TechNews"].map((tag, index) => (
                  <button
                    key={tag}
                    className="w-full text-left px-4 py-3 bg-white rounded-xl hover:shadow-md transition-all group"
                  >
                    <p className="font-semibold text-sm text-gray-900 group-hover:text-purple-600 transition-colors">
                      {tag}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(Math.random() * 10 + 1).toFixed(1)}k posts
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="text-xs text-gray-500 space-y-3 px-2">
              <div className="flex flex-wrap gap-2">
                <a href="#" className="hover:text-blue-600 transition-colors">About</a>
                <span>•</span>
                <a href="#" className="hover:text-blue-600 transition-colors">Help</a>
                <span>•</span>
                <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
                <span>•</span>
                <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
              </div>
              <p className="text-gray-400">© 2026 Frendly</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCreatePost && (
        <CreatePostModal
          onClose={() => setShowCreatePost(false)}
          onPostCreated={handlePostCreated}
        />
      )}

      {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}

      {selectedPost && (
        <PostModal
          post={selectedPost}
          currentUserId={currentUser?._id || ""}
          isSaved={savedPostIds.has(selectedPost._id)}
          onClose={() => setSelectedPost(null)}
          onLike={handleLike}
          onComment={handleComment}
          onSave={handleSavePost}
          onDeleteComment={handleDeleteComment}
          onDeletePost={handleDeletePost}
        />
      )}

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 z-50 shadow-2xl">
        <div className="flex items-center justify-around h-16 px-2">
          <button className="p-2 relative">
            <Home className="w-6 h-6 text-blue-600" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
          </button>
          <button onClick={() => setShowSearch(true)} className="p-2">
            <Search className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={() => setShowCreatePost(true)}
            className="p-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/40 -mt-6"
          >
            <PlusSquare className="w-6 h-6 text-white" />
          </button>
          <button 
            onClick={() => router.push('/messages')}
            className="p-2 relative"
          >
            <MessageCircle className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full ring-2 ring-white"></span>
          </button>
          <button
            className="w-9 h-9 rounded-full overflow-hidden border-2 border-blue-200"
            onClick={() => router.push(`/profile/${currentUser?._id}`)}
          >
            <img
              src={
                currentUser?.profilePicture ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.username || 'default'}`
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </nav>
    </div>
  );
}