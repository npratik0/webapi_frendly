// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { postAPI, Post } from "@/lib/api/post";
// import { userAPI, User } from "@/lib/api/user";
// import {
//   Settings,
//   Grid,
//   Bookmark,
//   Loader2,
//   UserPlus,
//   UserCheck,
//   ArrowLeft,
//   MapPin,
//   Link as LinkIcon,
//   Calendar,
//   Heart,
//   MessageCircle,
// } from "lucide-react";
// import { toast } from "react-hot-toast";
// import PostModal from "@/app/components/PostModal";
// import { format } from "date-fns";

// export default function ProfilePage() {
//   const params = useParams();
//   const router = useRouter();
//   const userId = params.userId as string;

//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const [profileUser, setProfileUser] = useState<any>(null);
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [savedPosts, setSavedPosts] = useState<Post[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState<"posts" | "saved">("posts");
//   const [selectedPost, setSelectedPost] = useState<Post | null>(null);
//   const [savedPostIds, setSavedPostIds] = useState<Set<string>>(new Set());
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [followersCount, setFollowersCount] = useState(0);

//   useEffect(() => {
//     fetchData();
//   }, [userId]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const [currentUserResponse, profileResponse, postsResponse] =
//         await Promise.all([
//           userAPI.getCurrentUser(),
//           userAPI.getUserProfile(userId),
//           postAPI.getUserPosts(userId),
//         ]);

//       if (currentUserResponse.success) {
//         setCurrentUser(currentUserResponse.data);
//       }

//       if (profileResponse.success) {
//         setProfileUser(profileResponse.data);
//         setIsFollowing(profileResponse.data.isFollowing);
//         setFollowersCount(profileResponse.data.followersCount);
//       }

//       if (postsResponse.success) {
//         setPosts(postsResponse.data);
//       }

//       // Fetch saved posts if it's own profile
//       if (profileResponse.data.isOwnProfile) {
//         const savedResponse = await postAPI.getSavedPosts();
//         if (savedResponse.success) {
//           setSavedPosts(savedResponse.data);
//         }

//         const savedIdsResponse = await userAPI.getSavedPosts();
//         if (savedIdsResponse.success) {
//           setSavedPostIds(new Set(savedIdsResponse.data));
//         }
//       }
//     } catch (error: any) {
//       toast.error("Failed to load profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFollow = async () => {
//     try {
//       if (isFollowing) {
//         await userAPI.unfollowUser(userId);
//         setIsFollowing(false);
//         setFollowersCount((prev) => prev - 1);
//         toast.success("Unfollowed successfully");
//       } else {
//         await userAPI.followUser(userId);
//         setIsFollowing(true);
//         setFollowersCount((prev) => prev + 1);
//         toast.success("Following successfully");
//       }
//     } catch (error: any) {
//       toast.error("Failed to update follow status");
//     }
//   };

//   const handleLike = async (postId: string) => {
//     try {
//       const response = await postAPI.likePost(postId);
//       if (response.success) {
//         setPosts((prevPosts) =>
//           prevPosts.map((post) => (post._id === postId ? response.data : post))
//         );
//         setSavedPosts((prevPosts) =>
//           prevPosts.map((post) => (post._id === postId ? response.data : post))
//         );
//         if (selectedPost && selectedPost._id === postId) {
//           setSelectedPost(response.data);
//         }
//       }
//     } catch (error: any) {
//       toast.error("Failed to like post");
//     }
//   };

//   const handleComment = async (postId: string, text: string) => {
//     try {
//       const response = await postAPI.addComment(postId, text);
//       if (response.success) {
//         setPosts((prevPosts) =>
//           prevPosts.map((post) => (post._id === postId ? response.data : post))
//         );
//         setSavedPosts((prevPosts) =>
//           prevPosts.map((post) => (post._id === postId ? response.data : post))
//         );
//         if (selectedPost && selectedPost._id === postId) {
//           setSelectedPost(response.data);
//         }
//       }
//     } catch (error: any) {
//       toast.error("Failed to add comment");
//     }
//   };

//   const handleSavePost = async (postId: string) => {
//     try {
//       const isSaved = savedPostIds.has(postId);

//       if (isSaved) {
//         await userAPI.unsavePost(postId);
//         setSavedPostIds((prev) => {
//           const newSet = new Set(prev);
//           newSet.delete(postId);
//           return newSet;
//         });
//         setSavedPosts((prev) => prev.filter((post) => post._id !== postId));
//         toast.success("Post unsaved");
//       } else {
//         await userAPI.savePost(postId);
//         setSavedPostIds((prev) => new Set(prev).add(postId));
//         toast.success("Post saved");
//       }
//     } catch (error: any) {
//       toast.error("Failed to save post");
//     }
//   };

//   const handleDeleteComment = async (postId: string, commentId: string) => {
//     try {
//       const response = await postAPI.deleteComment(postId, commentId);
//       if (response.success) {
//         setPosts((prevPosts) =>
//           prevPosts.map((post) => (post._id === postId ? response.data : post))
//         );
//         if (selectedPost && selectedPost._id === postId) {
//           setSelectedPost(response.data);
//         }
//         toast.success("Comment deleted");
//       }
//     } catch (error: any) {
//       toast.error("Failed to delete comment");
//     }
//   };

//   const handleDeletePost = async (postId: string) => {
//     if (!confirm("Are you sure you want to delete this post?")) return;

//     try {
//       const response = await postAPI.deletePost(postId);
//       if (response.success) {
//         setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
//         setSelectedPost(null);
//         toast.success("Post deleted successfully");
//       }
//     } catch (error: any) {
//       toast.error("Failed to delete post");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
//           <p className="text-gray-600 font-medium">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   const isOwnProfile = profileUser?.isOwnProfile;
//   const displayPosts = activeTab === "posts" ? posts : savedPosts;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 pb-20">
//       {/* Header */}
//       <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-40">
//         <div className="max-w-5xl mx-auto px-4 py-4">
//           <button
//             onClick={() => router.back()}
//             className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             <span className="font-medium">Back</span>
//           </button>
//         </div>
//       </div>

//       <div className="max-w-5xl mx-auto px-4 py-8">
//         {/* Profile Header */}
//         <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-8 mb-6">
//           <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
//             {/* Profile Picture */}
//             <div className="relative">
//               <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-400 to-indigo-400 p-1 bg-gradient-to-r from-blue-600 to-indigo-600">
//                 <img
//                   src={
//                     profileUser?.profilePicture ||
//                     "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
//                   }
//                   alt={profileUser?.username}
//                   className="w-full h-full rounded-full object-cover bg-white"
//                 />
//               </div>
//               <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 rounded-full border-4 border-white flex items-center justify-center">
//                 <span className="text-white text-lg">✓</span>
//               </div>
//             </div>

//             {/* Profile Info */}
//             <div className="flex-1 text-center md:text-left">
//               <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
//                 <div>
//                   <h1 className="text-3xl font-bold text-gray-900 mb-1">
//                     {profileUser?.fullName}
//                   </h1>
//                   <p className="text-gray-500">@{profileUser?.username}</p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   {isOwnProfile ? (
//                     <button
//                       onClick={() => router.push("/settings")}
//                       className="px-6 py-2 border-2 border-gray-300 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
//                     >
//                       <Settings className="w-4 h-4" />
//                       Edit Profile
//                     </button>
//                   ) : (
//                     <button
//                       onClick={handleFollow}
//                       className={`px-6 py-2 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
//                         isFollowing
//                           ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
//                           : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/30"
//                       }`}
//                     >
//                       {isFollowing ? (
//                         <>
//                           <UserCheck className="w-4 h-4" />
//                           Following
//                         </>
//                       ) : (
//                         <>
//                           <UserPlus className="w-4 h-4" />
//                           Follow
//                         </>
//                       )}
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* Stats */}
//               <div className="flex items-center justify-center md:justify-start gap-8 mb-4">
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
//                   <p className="text-sm text-gray-500">Posts</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-gray-900">
//                     {followersCount}
//                   </p>
//                   <p className="text-sm text-gray-500">Followers</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-gray-900">
//                     {profileUser?.followingCount || 0}
//                   </p>
//                   <p className="text-sm text-gray-500">Following</p>
//                 </div>
//               </div>

//               {/* Bio */}
//               {profileUser?.bio && (
//                 <p className="text-gray-700 mb-4 max-w-md">{profileUser.bio}</p>
//               )}

//               {/* Additional Info */}
//               <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
//                 {currentUser?.createdAt && (
//                   <div className="flex items-center gap-1">
//                     <Calendar className="w-4 h-4" />
//                     <span>
//                       Joined {format(new Date(currentUser.createdAt), "MMMM yyyy")}
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-6">
//           <div className="flex justify-center">
//             <button
//               onClick={() => setActiveTab("posts")}
//               className={`flex-1 flex items-center justify-center gap-2 py-4 border-b-2 transition-colors ${
//                 activeTab === "posts"
//                   ? "border-blue-600 text-blue-600"
//                   : "border-transparent text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               <Grid className="w-5 h-5" />
//               <span className="font-semibold">Posts</span>
//               <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">
//                 {posts.length}
//               </span>
//             </button>
//             {isOwnProfile && (
//               <button
//                 onClick={() => setActiveTab("saved")}
//                 className={`flex-1 flex items-center justify-center gap-2 py-4 border-b-2 transition-colors ${
//                   activeTab === "saved"
//                     ? "border-blue-600 text-blue-600"
//                     : "border-transparent text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 <Bookmark className="w-5 h-5" />
//                 <span className="font-semibold">Saved</span>
//                 <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">
//                   {savedPosts.length}
//                 </span>
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Posts Grid */}
//         {displayPosts.length === 0 ? (
//           <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
//             <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               {activeTab === "posts" ? (
//                 <Grid className="w-10 h-10 text-gray-400" />
//               ) : (
//                 <Bookmark className="w-10 h-10 text-gray-400" />
//               )}
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-2">
//               {activeTab === "posts" ? "No posts yet" : "No saved posts"}
//             </h3>
//             <p className="text-gray-500">
//               {activeTab === "posts"
//                 ? isOwnProfile
//                   ? "Share your first post to get started"
//                   : "This user hasn't posted anything yet"
//                 : "Posts you save will appear here"}
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-3 gap-1 md:gap-4">
//             {displayPosts.map((post) => (
//               <button
//                 key={post._id}
//                 onClick={() => setSelectedPost(post)}
//                 className="aspect-square relative group cursor-pointer overflow-hidden rounded-lg md:rounded-2xl"
//               >
//                 <img
//                   src={post.imageUrl}
//                   alt="Post"
//                   className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
//                   <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-4 text-white">
//                     <div className="flex items-center gap-1">
//                       <Heart className="w-5 h-5 fill-white" />
//                       <span className="font-bold text-sm">
//                         {post.likesCount}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <MessageCircle className="w-5 h-5 fill-white" />
//                       <span className="font-bold text-sm">
//                         {post.commentsCount}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Post Modal */}
//       {selectedPost && (
//         <PostModal
//           post={selectedPost}
//           currentUserId={currentUser?._id || ""}
//           isSaved={savedPostIds.has(selectedPost._id)}
//           onClose={() => setSelectedPost(null)}
//           onLike={handleLike}
//           onComment={handleComment}
//           onSave={handleSavePost}
//           onDeleteComment={handleDeleteComment}
//           onDeletePost={isOwnProfile ? handleDeletePost : undefined}
//         />
//       )}
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { postAPI, Post } from "@/lib/api/post";
import { userAPI, User } from "@/lib/api/user";
import {
  Settings,
  Grid,
  Bookmark,
  Loader2,
  UserPlus,
  UserCheck,
  ArrowLeft,
  Calendar,
  Heart,
  MessageCircle,
  Camera,
  Mail,
  Phone,
  MapPin,
  Link as LinkIcon,
  Shield,
  Edit2,
} from "lucide-react";
import { toast } from "react-hot-toast";
import PostModal from "@/app/components/PostModal";
import EditProfileModal from "@/app/components/EditProfileModal";
import ChangePasswordModal from "@/app/components/ChangePasswordModal";
import { format } from "date-fns";

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [profileUser, setProfileUser] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"posts" | "saved">("posts");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [savedPostIds, setSavedPostIds] = useState<Set<string>>(new Set());
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [currentUserResponse, profileResponse, postsResponse] =
        await Promise.all([
          userAPI.getCurrentUser(),
          userAPI.getUserProfile(userId),
          postAPI.getUserPosts(userId),
        ]);

      if (currentUserResponse.success) {
        setCurrentUser(currentUserResponse.data);
      }

      if (profileResponse.success) {
        setProfileUser(profileResponse.data);
        setIsFollowing(profileResponse.data.isFollowing);
        setFollowersCount(profileResponse.data.followersCount);
      }

      if (postsResponse.success) {
        setPosts(postsResponse.data);
      }

      if (profileResponse.data.isOwnProfile) {
        const savedResponse = await postAPI.getSavedPosts();
        if (savedResponse.success) {
          setSavedPosts(savedResponse.data);
        }

        const savedIdsResponse = await userAPI.getSavedPosts();
        if (savedIdsResponse.success) {
          setSavedPostIds(new Set(savedIdsResponse.data));
        }
      }
    } catch (error: any) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await userAPI.unfollowUser(userId);
        setIsFollowing(false);
        setFollowersCount((prev) => prev - 1);
        toast.success("Unfollowed successfully");
      } else {
        await userAPI.followUser(userId);
        setIsFollowing(true);
        setFollowersCount((prev) => prev + 1);
        toast.success("Following successfully");
      }
    } catch (error: any) {
      toast.error("Failed to update follow status");
    }
  };

  const handleProfileUpdated = () => {
    fetchData();
    setShowEditProfile(false);
    toast.success("Profile updated successfully");
  };

  const handleLike = async (postId: string) => {
    try {
      const response = await postAPI.likePost(postId);
      if (response.success) {
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post._id === postId ? response.data : post))
        );
        setSavedPosts((prevPosts) =>
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
        setSavedPosts((prevPosts) =>
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
        setSavedPostIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(postId);
          return newSet;
        });
        setSavedPosts((prev) => prev.filter((post) => post._id !== postId));
        toast.success("Post unsaved");
      } else {
        await userAPI.savePost(postId);
        setSavedPostIds((prev) => new Set(prev).add(postId));
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  const isOwnProfile = profileUser?.isOwnProfile;
  const displayPosts = activeTab === "posts" ? posts : savedPosts;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Back</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Cover Image */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl h-48 md:h-64 mb-8 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-8 -mt-32 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Picture */}
            <div className="relative -mt-20 md:-mt-24">
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-6 border-white shadow-2xl bg-gradient-to-br from-blue-100 to-purple-100">
                  <img
                    src={
                      profileUser?.profilePicture ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileUser?.username || 'default'}`
                    }
                    alt={profileUser?.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                {isOwnProfile && (
                  <button
                    onClick={() => setShowEditProfile(true)}
                    className="absolute bottom-2 right-2 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transition-colors"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                )}
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-white text-xs font-semibold shadow-lg">
                Active
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left mt-4 md:mt-0">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {profileUser?.fullName}
                  </h1>
                  <p className="text-gray-500 font-medium">
                    @{profileUser?.username}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  {isOwnProfile ? (
                    <>
                      <button
                        onClick={() => setShowEditProfile(true)}
                        className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit Profile
                      </button>
                      <button
                        onClick={() => setShowChangePassword(true)}
                        className="px-6 py-2.5 border-2 border-gray-300 hover:border-gray-400 rounded-xl font-semibold text-sm transition-colors flex items-center gap-2"
                      >
                        <Shield className="w-4 h-4" />
                        Password
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleFollow}
                      className={`px-8 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg flex items-center gap-2 ${
                        isFollowing
                          ? "bg-gray-100 hover:bg-gray-200 text-gray-700 border-2 border-gray-300"
                          : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/30"
                      }`}
                    >
                      {isFollowing ? (
                        <>
                          <UserCheck className="w-4 h-4" />
                          Following
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4" />
                          Follow
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Bio */}
              {profileUser?.bio && (
                <p className="text-gray-700 mb-6 text-lg max-w-2xl">
                  {profileUser.bio}
                </p>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 max-w-md mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 text-center border border-blue-100">
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {posts.length}
                  </p>
                  <p className="text-sm font-medium text-gray-600">Posts</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 text-center border border-purple-100">
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {followersCount}
                  </p>
                  <p className="text-sm font-medium text-gray-600">Followers</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-4 text-center border border-green-100">
                  <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                    {profileUser?.followingCount || 0}
                  </p>
                  <p className="text-sm font-medium text-gray-600">Following</p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                {currentUser?.email && (
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span>{currentUser.email}</span>
                  </div>
                )}
                {currentUser?.createdAt && (
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>
                      Joined {format(new Date(currentUser.createdAt), "MMMM yyyy")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex">
            <button
              onClick={() => setActiveTab("posts")}
              className={`flex-1 flex items-center justify-center gap-3 py-5 font-semibold transition-all relative ${
                activeTab === "posts"
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Grid className="w-5 h-5" />
              <span>Posts</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-bold">
                {posts.length}
              </span>
              {activeTab === "posts" && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600" />
              )}
            </button>
            {isOwnProfile && (
              <button
                onClick={() => setActiveTab("saved")}
                className={`flex-1 flex items-center justify-center gap-3 py-5 font-semibold transition-all relative border-l ${
                  activeTab === "saved"
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Bookmark className="w-5 h-5" />
                <span>Saved</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-bold">
                  {savedPosts.length}
                </span>
                {activeTab === "saved" && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="mt-8">
          {displayPosts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-200 p-20 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                {activeTab === "posts" ? (
                  <Grid className="w-12 h-12 text-blue-600" />
                ) : (
                  <Bookmark className="w-12 h-12 text-blue-600" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {activeTab === "posts" ? "No posts yet" : "No saved posts"}
              </h3>
              <p className="text-gray-500 text-lg">
                {activeTab === "posts"
                  ? isOwnProfile
                    ? "Share your first post to get started"
                    : "This user hasn't posted anything yet"
                  : "Posts you save will appear here"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
              {displayPosts.map((post) => (
                <button
                  key={post._id}
                  onClick={() => setSelectedPost(post)}
                  className="aspect-square relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    src={post.imageUrl}
                    alt="Post"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex items-center gap-6 text-white">
                      <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                        <Heart className="w-5 h-5 fill-white" />
                        <span className="font-bold">{post.likesCount}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                        <MessageCircle className="w-5 h-5 fill-white" />
                        <span className="font-bold">{post.commentsCount}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
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
          onDeletePost={isOwnProfile ? handleDeletePost : undefined}
        />
      )}

      {showEditProfile && currentUser && (
        <EditProfileModal
          user={currentUser}
          onClose={() => setShowEditProfile(false)}
          onSuccess={handleProfileUpdated}
        />
      )}

      {showChangePassword && (
        <ChangePasswordModal
          onClose={() => setShowChangePassword(false)}
          onSuccess={() => {
            setShowChangePassword(false);
            toast.success("Password changed successfully");
          }}
        />
      )}
    </div>
  );
}