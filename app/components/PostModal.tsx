"use client";

import { useState, useEffect, useRef } from "react";
import { Post } from "@/lib/api/post";
import {
  X,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  BookmarkCheck,
  MoreHorizontal,
  Trash2,
  Smile,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PostModalProps {
  post: Post;
  currentUserId: string;
  isSaved: boolean;
  onClose: () => void;
  onLike: (postId: string) => void;
  onComment: (postId: string, text: string) => void;
  onSave: (postId: string) => void;
  onDeleteComment: (postId: string, commentId: string) => void;
  onDeletePost?: (postId: string) => void;
}

export default function PostModal({
  post,
  currentUserId,
  isSaved,
  onClose,
  onLike,
  onComment,
  onSave,
  onDeleteComment,
  onDeletePost,
}: PostModalProps) {
  const [commentText, setCommentText] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const commentsEndRef = useRef<HTMLDivElement>(null);

  const handleComment = () => {
    if (commentText.trim()) {
      onComment(post._id, commentText);
      setCommentText("");
    }
  };

  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [post.comments]);

  const isOwnPost = post.user._id === currentUserId;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl">
        {/* Left - Image */}
        <div className="md:w-1/2 lg:w-3/5 bg-black flex items-center justify-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors md:hidden"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <img
            src={post.imageUrl}
            alt="Post"
            className="w-full h-full object-contain max-h-[50vh] md:max-h-none"
          />
        </div>

        {/* Right - Details */}
        <div className="md:w-1/2 lg:w-2/5 flex flex-col h-[50vh] md:h-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <img
                src={
                  post.user.profilePicture ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.user.username}`
                }
                alt={post.user.username}
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-100"
              />
              <div>
                <p className="font-bold text-sm">{post.user.fullName}</p>
                <p className="text-xs text-gray-500">@{post.user.username}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isOwnPost && (
                <div className="relative">
                  <button
                    onClick={() => setShowOptions(!showOptions)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                  {showOptions && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowOptions(false)}
                      />
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border z-50">
                        <button
                          onClick={() => {
                            if (onDeletePost) {
                              onDeletePost(post._id);
                              onClose();
                            }
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="text-sm font-medium">Delete</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
              <button
                onClick={onClose}
                className="hidden md:block p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Caption & Comments */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Caption */}
            {post.caption && (
              <div className="flex gap-3">
                <img
                  src={
                    post.user.profilePicture ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.user.username}`
                  }
                  alt={post.user.username}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-bold mr-2">{post.user.fullName}</span>
                    <span className="text-gray-700">{post.caption}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            )}

            {/* Comments */}
            {post.comments.map((comment) => (
              <div key={comment._id} className="flex gap-3">
                <img
                  src={
                    comment.user.profilePicture ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user.username}`
                  }
                  alt={comment.user.username}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="bg-gray-50 rounded-2xl px-3 py-2">
                    <p className="text-sm">
                      <span className="font-bold mr-2">{comment.user.username}</span>
                      <span className="text-gray-700">{comment.text}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-1 px-3">
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                    {(comment.user._id === currentUserId || isOwnPost) && (
                      <button
                        onClick={() => onDeleteComment(post._id, comment._id)}
                        className="text-xs text-red-500 hover:text-red-700 font-medium"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={commentsEndRef} />
          </div>

          {/* Actions */}
          <div className="border-t border-gray-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onLike(post._id)}
                  className="hover:scale-110 transition-transform"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      post.isLiked
                        ? "fill-red-500 text-red-500"
                        : "text-gray-700"
                    }`}
                  />
                </button>
                <button className="hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6 text-gray-700" />
                </button>
                <button className="hover:scale-110 transition-transform">
                  <Send className="w-6 h-6 text-gray-700" />
                </button>
              </div>
              <button
                onClick={() => onSave(post._id)}
                className="hover:scale-110 transition-transform"
              >
                {isSaved ? (
                  <BookmarkCheck className="w-6 h-6 fill-blue-600 text-blue-600" />
                ) : (
                  <Bookmark className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>

            <p className="font-bold text-sm">
              {post.likesCount.toLocaleString()}{" "}
              {post.likesCount === 1 ? "like" : "likes"}
            </p>

            <p className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>

            {/* Add Comment */}
            <div className="flex items-center gap-2 pt-3 border-t">
              <Smile className="w-6 h-6 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleComment()}
                className="flex-1 text-sm outline-none"
              />
              <button
                onClick={handleComment}
                disabled={!commentText.trim()}
                className="text-sm text-blue-600 font-semibold disabled:opacity-40"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}