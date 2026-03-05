// types/user.ts
export type UserRole = 'user' | 'admin';
export type UserStatus = 'active' | 'inactive';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    createdAt: string;
    lastLogin?: string;
}