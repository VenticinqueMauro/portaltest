import { CategoryNews, LinkedNews, NewsStatus } from "@/models/news";

export type NewsType = {
    title: string;
    summary: string;
    content: string;
    status: NewsStatus;
    category: CategoryNews[];
    subscribersOnly: boolean;
    highlightedText?: string;
    newsLinked?: LinkedNews[];
    image?: string;
    author?: string;
    tags?: string[];
    comments?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}
