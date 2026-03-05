"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Search, Loader2, UserPlus } from "lucide-react";
import { userAPI } from "@/lib/api/user";
import { toast } from "react-hot-toast";

interface SearchModalProps {
  onClose: () => void;
}

interface SearchResult {
  _id: string;
  username: string;
  fullName: string;
  profilePicture: string;
  bio: string;
}

export default function SearchModal({ onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<SearchResult[]>([]);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const searchUsers = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        const response = await userAPI.searchUsers(query);
        if (response.success) {
          setResults(response.data);
        }
      } catch (error: any) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(searchUsers, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleUserClick = (user: SearchResult) => {
    // Save to recent searches
    const updated = [
      user,
      ...recentSearches.filter((u) => u._id !== user._id),
    ].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));

    // Navigate to profile
    router.push(`/profile/${user._id}`);
    onClose();
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center z-50 p-4 pt-20">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200">
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 text-sm outline-none"
          />
          {loading && <Loader2 className="w-5 h-5 animate-spin text-blue-600" />}
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto">
          {query.trim().length === 0 ? (
            // Recent searches
            recentSearches.length > 0 ? (
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm text-gray-900">Recent</h3>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear all
                  </button>
                </div>
                <div className="space-y-2">
                  {recentSearches.map((user) => (
                    <UserItem
                      key={user._id}
                      user={user}
                      onClick={() => handleUserClick(user)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center px-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Search for users
                </h3>
                <p className="text-sm text-gray-500">
                  Find friends by their name or username
                </p>
              </div>
            )
          ) : results.length > 0 ? (
            <div className="p-4 space-y-2">
              {results.map((user) => (
                <UserItem
                  key={user._id}
                  user={user}
                  onClick={() => handleUserClick(user)}
                />
              ))}
            </div>
          ) : !loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <UserPlus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">No results found</h3>
              <p className="text-sm text-gray-500">
                Try searching with a different keyword
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function UserItem({
  user,
  onClick,
}: {
  user: SearchResult;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors"
    >
      <img
        src={
          user.profilePicture ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`
        }
        alt={user.username}
        className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
      />
      <div className="flex-1 text-left min-w-0">
        <p className="font-semibold text-sm text-gray-900 truncate">
          {user.fullName}
        </p>
        <p className="text-xs text-gray-500 truncate">@{user.username}</p>
        {user.bio && (
          <p className="text-xs text-gray-400 truncate mt-0.5">{user.bio}</p>
        )}
      </div>
    </button>
  );
}