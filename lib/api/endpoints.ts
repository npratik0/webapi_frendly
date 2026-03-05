export const API = {
    AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
         WHOAMI: '/api/auth/whoami',

        LOGOUT: "/api/auth/logout",
        ME: "/api/auth/me",

        UPDATEPROFILE: '/api/auth/update-profile',
        REQUEST_PASSWORD_RESET: '/api/auth/request-password-reset',
        RESET_PASSWORD: (token: string) => `/api/auth/reset-password/${token}`,



        
    },
     ADMIN:{
        USER:{
            CREATE: '/api/admin/users/',
            GET_ALL: '/api/admin/users/',
            GET_ONE: (userId: string) => `/api/admin/users/${userId}`,
            UPDATE: (userId: string) => `/api/admin/users/${userId}`,
            DELETE: (userId: string) => `/api/admin/users/${userId}`,
        }
    },
    // Posts
        POSTS: "/api/posts",
        FEED: "/api/posts/feed",
        USER_POSTS: (userId: string) => `/api/posts/user/${userId}`,
        LIKE_POST: (postId: string) => `/api/posts/${postId}/like`,
        COMMENT_POST: (postId: string) => `/api/posts/${postId}/comment`,
        DELETE_POST: (postId: string) => `/api/posts/${postId}`,
}