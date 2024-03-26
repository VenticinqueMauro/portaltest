import { NewsStatus } from "@/models/news";

export type NewsType = {
    title: string;
    content: string;
    author: string;
    category?: string[];
    tags?: string[];
    image: string;
    status: NewsStatus;
    comments?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}
