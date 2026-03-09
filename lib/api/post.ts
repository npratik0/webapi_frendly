import axiosInstance from "./axios";
import { API } from "./endpoints";

export interface Post {
  _id: string;
  user: {
    _id: string;
    username: string;
    fullName: string;
    profilePicture: string;
  };
  caption: string;
  imageUrl: string;
  likes: string[];
  likesCount: number;
  comments: {
    _id: string;
    user: {
      _id: string;
      username: string;
      profilePicture: string;
    };
    text: string;
    createdAt: Date;
  }[];
  commentsCount: number;
  isLiked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const postAPI = {
  createPost: async (formData: FormData) => {
    const response = await axiosInstance.post(API.POSTS, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  getFeed: async (page: number = 1) => {
    const response = await axiosInstance.get(`${API.FEED}?page=${page}`);
    return response.data;
  },

  getUserPosts: async (userId: string) => {
    const response = await axiosInstance.get(API.USER_POSTS(userId));
    return response.data;
  },

  likePost: async (postId: string) => {
    const response = await axiosInstance.post(API.LIKE_POST(postId));
    return response.data;
  },

  addComment: async (postId: string, text: string) => {
    const response = await axiosInstance.post(API.COMMENT_POST(postId), { text });
    return response.data;
  },

  deleteComment: async (postId: string, commentId: string) => {
    const response = await axiosInstance.delete(
      `/api/posts/${postId}/comment/${commentId}`
    );
    return response.data;
  },

  deletePost: async (postId: string) => {
    const response = await axiosInstance.delete(API.DELETE_POST(postId));
    return response.data;
  },
  getSavedPosts: async () => {
    const response = await axiosInstance.get("/api/posts/saved");
    return response.data;
  },

  getPostById: async (postId: string) => {
    const response = await axiosInstance.get(`/api/posts/${postId}`);
    return response.data;
  },
};