// "use client";

// import { useState } from "react";
// import { Post } from "@/lib/api/post";
// import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Smile, Trash2 } from "lucide-react";
// import { formatDistanceToNow } from "date-fns";

// interface PostCardProps {
//   post: Post;
//   currentUserId: string;
//   onLike: (postId: string) => void;
//   onComment: (postId: string, text: string) => void;
//   onDeleteComment: (postId: string, commentId: string) => void;
//   onDeletePost?: (postId: string) => void;
// }

// export default function PostCard({ 
//   post, 
//   currentUserId, 
//   onLike, 
//   onComment, 
//   onDeleteComment,
//   onDeletePost 
// }: PostCardProps) {
//   const [commentText, setCommentText] = useState("");
//   const [showComments, setShowComments] = useState(false);
//   const [showOptions, setShowOptions] = useState(false);

//   const handleComment = () => {
//     if (commentText.trim()) {
//       onComment(post._id, commentText);
//       setCommentText("");
//     }
//   };

//   const isOwnPost = post.user._id === currentUserId;

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//       {/* Post Header */}
//       <div className="flex items-center justify-between p-4">
//         <div className="flex items-center gap-3">
//           <img
//             src={post.user.profilePicture || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + post.user.username}
//             alt={post.user.username}
//             className="w-10 h-10 rounded-full object-cover"
//           />
//           <div>
//             <p className="font-semibold text-sm">{post.user.username}</p>
//             <p className="text-xs text-gray-500">
//               {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
//             </p>
//           </div>
//         </div>
//         {isOwnPost && (
//           <div className="relative">
//             <button 
//               onClick={() => setShowOptions(!showOptions)}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//             >
//               <MoreHorizontal className="w-5 h-5" />
//             </button>
//             {showOptions && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 z-10">
//                 <button
//                   onClick={() => {
//                     if (onDeletePost) {
//                       onDeletePost(post._id);
//                       setShowOptions(false);
//                     }
//                   }}
//                   className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                   <span className="text-sm font-medium">Delete Post</span>
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Post Image */}
//       <img src={post.imageUrl} alt="Post" className="w-full aspect-square object-cover" />

//       {/* Post Actions */}
//       <div className="p-4 space-y-3">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <button 
//               onClick={() => onLike(post._id)} 
//               className="hover:opacity-70 transition-opacity"
//             >
//               <Heart
//                 className={`w-6 h-6 ${post.isLiked ? "fill-red-500 text-red-500" : "text-gray-700"}`}
//               />
//             </button>
//             <button
//               onClick={() => setShowComments(!showComments)}
//               className="hover:opacity-70 transition-opacity"
//             >
//               <MessageCircle className="w-6 h-6 text-gray-700" />
//             </button>
//             <button className="hover:opacity-70 transition-opacity">
//               <Send className="w-6 h-6 text-gray-700" />
//             </button>
//           </div>
//           <button className="hover:opacity-70 transition-opacity">
//             <Bookmark className="w-6 h-6 text-gray-700" />
//           </button>
//         </div>

//         <p className="font-semibold text-sm">{post.likesCount} likes</p>

//         {post.caption && (
//           <div className="text-sm">
//             <span className="font-semibold mr-2">{post.user.username}</span>
//             <span className="text-gray-700">{post.caption}</span>
//           </div>
//         )}

//         {post.commentsCount > 0 && !showComments && (
//           <button
//             onClick={() => setShowComments(true)}
//             className="text-sm text-gray-500 hover:text-gray-700"
//           >
//             View all {post.commentsCount} comments
//           </button>
//         )}

//         {/* Comments Section */}
//         {showComments && post.comments.length > 0 && (
//           <div className="space-y-3 pt-2 border-t max-h-64 overflow-y-auto">
//             {post.comments.map((comment) => (
//               <div key={comment._id} className="flex gap-3">
//                 <img
//                   src={comment.user.profilePicture || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + comment.user.username}
//                   alt={comment.user.username}
//                   className="w-8 h-8 rounded-full flex-shrink-0"
//                 />
//                 <div className="flex-1 min-w-0">
//                   <div className="bg-gray-50 rounded-2xl px-3 py-2">
//                     <p className="text-sm">
//                       <span className="font-semibold">{comment.user.username}</span>{" "}
//                       <span className="text-gray-700">{comment.text}</span>
//                     </p>
//                   </div>
//                   <div className="flex items-center gap-3 mt-1 px-3">
//                     <p className="text-xs text-gray-500">
//                       {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
//                     </p>
//                     {(comment.user._id === currentUserId || isOwnPost) && (
//                       <button
//                         onClick={() => onDeleteComment(post._id, comment._id)}
//                         className="text-xs text-red-500 hover:text-red-700 font-medium"
//                       >
//                         Delete
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Add Comment */}
//         <div className="flex items-center gap-2 border-t pt-3">
//           <Smile className="w-6 h-6 text-gray-400 flex-shrink-0" />
//           <input
//             type="text"
//             placeholder="Add a comment..."
//             value={commentText}
//             onChange={(e) => setCommentText(e.target.value)}
//             onKeyPress={(e) => e.key === "Enter" && handleComment()}
//             className="flex-1 text-sm outline-none"
//           />
//           <button
//             onClick={handleComment}
//             disabled={!commentText.trim()}
//             className="text-sm text-blue-600 font-semibold disabled:opacity-50"
//           >
//             Post
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { Post } from "@/lib/api/post";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Trash2,
  BookmarkCheck,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: Post;
  currentUserId: string;
  isSaved: boolean;
  onLike: (postId: string) => void;
  onComment: (postId: string, text: string) => void;
  onSave: (postId: string) => void;
  onDeleteComment: (postId: string, commentId: string) => void;
  onDeletePost?: (postId: string) => void;
  onOpenPost: () => void;
}

export default function PostCard({
  post,
  currentUserId,
  isSaved,
  onLike,
  onComment,
  onSave,
  onDeleteComment,
  onDeletePost,
  onOpenPost,
}: PostCardProps) {
  const [commentText, setCommentText] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleComment = () => {
    if (commentText.trim()) {
      onComment(post._id, commentText);
      setCommentText("");
    }
  };

  const isOwnPost = post.user._id === currentUserId;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={
                post.user.profilePicture ||
                "https://api.dicebear.com/7.x/avataaars/svg?seed=" +
                  post.user.username
              }
              alt={post.user.username}
              className="w-11 h-11 rounded-full object-cover border-2 border-blue-100"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-blue-600 rounded-full border-2 border-white" />
          </div>
          <div>
            <p className="font-bold text-sm text-gray-900">{post.user.fullName}</p>
            <div className="flex items-center gap-2">
              <p className="text-xs text-gray-500">@{post.user.username}</p>
              <span className="text-gray-300">•</span>
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
        </div>
        {isOwnPost && (
          <div className="relative">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <MoreHorizontal className="w-5 h-5 text-gray-600" />
            </button>
            {showOptions && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowOptions(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                  <button
                    onClick={() => {
                      if (onDeletePost) {
                        onDeletePost(post._id);
                        setShowOptions(false);
                      }
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Delete Post</span>
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Post Image */}
      <div
        className="relative bg-gray-100 cursor-pointer group"
        onClick={onOpenPost}
      >
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <img
          src={post.imageUrl}
          alt="Post"
          className={`w-full aspect-square object-cover transition-all duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          } group-hover:scale-105`}
          onLoad={() => setImageLoaded(true)}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-6 text-white">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 fill-white" />
              <span className="font-bold">{post.likesCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-6 h-6 fill-white" />
              <span className="font-bold">{post.commentsCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Post Actions */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onLike(post._id)}
              className="hover:scale-110 transition-transform active:scale-95"
            >
              <Heart
                className={`w-6 h-6 transition-all ${
                  post.isLiked
                    ? "fill-red-500 text-red-500 scale-110"
                    : "text-gray-700 hover:text-red-500"
                }`}
              />
            </button>
            <button
              onClick={onOpenPost}
              className="hover:scale-110 transition-transform active:scale-95"
            >
              <MessageCircle className="w-6 h-6 text-gray-700 hover:text-blue-600 transition-colors" />
            </button>
            <button className="hover:scale-110 transition-transform active:scale-95">
              <Send className="w-6 h-6 text-gray-700 hover:text-blue-600 transition-colors" />
            </button>
          </div>
          <button
            onClick={() => onSave(post._id)}
            className="hover:scale-110 transition-transform active:scale-95"
          >
            {isSaved ? (
              <BookmarkCheck className="w-6 h-6 fill-blue-600 text-blue-600" />
            ) : (
              <Bookmark className="w-6 h-6 text-gray-700 hover:text-blue-600 transition-colors" />
            )}
          </button>
        </div>

        {post.likesCount > 0 && (
          <button onClick={onOpenPost} className="group">
            <p className="font-bold text-sm group-hover:text-blue-600 transition-colors">
              {post.likesCount.toLocaleString()}{" "}
              {post.likesCount === 1 ? "like" : "likes"}
            </p>
          </button>
        )}

        {post.caption && (
          <div className="text-sm">
            <span className="font-bold mr-2">{post.user.fullName}</span>
            <span className="text-gray-700">{post.caption}</span>
          </div>
        )}

        {post.commentsCount > 0 && (
          <button
            onClick={onOpenPost}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            View all {post.commentsCount} comments
          </button>
        )}

        {/* Quick comment preview */}
        {post.comments.length > 0 && (
          <div className="space-y-1">
            {post.comments.slice(0, 2).map((comment) => (
              <div key={comment._id} className="text-sm">
                <span className="font-semibold mr-2">{comment.user.username}</span>
                <span className="text-gray-700">{comment.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Add Comment */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleComment()}
            className="flex-1 text-sm outline-none placeholder-gray-400"
          />
          <button
            onClick={handleComment}
            disabled={!commentText.trim()}
            className="text-sm text-blue-600 font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:text-blue-700 transition-colors"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}