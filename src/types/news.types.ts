import { CategoryNews, MediaNews, NewsStatus } from "@/models/news";

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
