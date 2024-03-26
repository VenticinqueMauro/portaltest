import { Schema, model, models, Document } from "mongoose";

export enum NewsStatus {
    INACTIVE = 'inactive',
    ACTIVE = 'active',
    PENDING = 'pending',
}

interface NewsDocument extends Document {
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

const NewsSchema = new Schema<NewsDocument>({
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    content: {
        type: String,
        required: true,
        minlength: 3
    },
    author: {
        type: String,
        required: true,
        minlength: 3
    },
    category: {
        type: [String], 
    },
    tags: {
        type: [String], 
    },
    image: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(NewsStatus),
        default: NewsStatus.INACTIVE
    },
    comments: {
        type: [String], 
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export const News = models.News || model<NewsDocument>('News', NewsSchema);
