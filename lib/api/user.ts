import axiosInstance from "./axios";
import { API } from "./endpoints";



export interface User {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  phoneNumber: number;
  gender?: string;
  profilePicture?: string;
  bio?: string;
  role: string;
  followersCount?: number;
  followingCount?: number;
  isFollowing?: boolean;
  isOwnProfile?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const userAPI = {

  getCurrentUser: async () => {
    const response = await axiosInstance.get(API.AUTH.WHOAMI);
    return response.data;
  },  
  

  getUserProfile: async (userId: string) => {
    const response = await axiosInstance.get(`/api/auth/${userId}`);
    return response.data;
  },

  searchUsers: async (query: string) => {
    const response = await axiosInstance.get(`/api/auth/search?q=${query}`);
    return response.data;
  },

  followUser: async (userId: string) => {
    const response = await axiosInstance.post(`/api/auth/${userId}/follow`);
    return response.data;
  },

  unfollowUser: async (userId: string) => {
    const response = await axiosInstance.post(`/api/auth/${userId}/unfollow`);
    return response.data;
  },

  savePost: async (postId: string) => {
    const response = await axiosInstance.post(`/api/auth/posts/${postId}/save`);
    return response.data;
  },

  unsavePost: async (postId: string) => {
    const response = await axiosInstance.post(`/api/auth/posts/${postId}/unsave`);
    return response.data;
  },

  getSavedPosts: async () => {
    const response = await axiosInstance.get("/api/auth/saved-posts");
    return response.data;
  },

  updateProfile: async (data: {
    fullName?: string;
    username?: string;
    bio?: string;
    phoneNumber: number;
    gender?: string;
  }) => {
    const response = await axiosInstance.put("/api/auth/profile", data);
    return response.data;
  },

  updateProfilePicture: async (formData: FormData) => {
    const response = await axiosInstance.put(
      "/api/auth/profile-picture",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  changePassword: async (oldPassword: string, newPassword: string) => {
    const response = await axiosInstance.put("/api/auth/change-password", {
      oldPassword,
      newPassword,
    });
    return response.data;
  },


};