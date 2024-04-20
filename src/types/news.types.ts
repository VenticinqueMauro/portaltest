import { UserRole } from "@/models/admin.user";
import { CategoryNews, MediaNews } from "@/models/news";

export type NewsType = {
    _id?: string,
    title: string;
    summary: string;
    content: string;
    status: NewsStatus;
    category: CategoryNews;
    subscribersOnly: boolean;
    highlightedText?: string;
    lastModifiedBy?: string;
    newsLinked?: string[];
    media?: MediaNews;
    author?: string;
    tags?: string[];
    comments?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export type AdminUser = {
    _id: string
    email: string;
    password: string;
    fullname: string;
    role: UserRole;
}

export enum NewsStatus {
    PUBLISHED = 'publicado',
    PENDING = 'pendiente',
}