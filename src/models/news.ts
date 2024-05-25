import { CategoryNews, MediaNews, NewsStatus } from "@/types/news.types";
import { Document, Schema, model, models } from "mongoose";


interface NewsDocument extends Document {
    pretitle: string;
    title: string;
    summary: string;
    content: string;
    status: NewsStatus;
    category: CategoryNews;
    subscribersOnly: boolean;
    lastModifiedBy?: string;
    newsLinked?: string[];
    media?: MediaNews;
    author?: string;
    tags?: string[];
    comments?: string[];
    path: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const NewsSchema = new Schema<NewsDocument>({
    pretitle: {
        type: String,
        required: [true, 'El antetítulo es obligatorio'],
        minlength: [3, 'El antetítulo debe tener al menos 3 caracteres']
    },
    title: {
        type: String,
        required: [true, 'El título es obligatorio'],
        minlength: [3, 'El título debe tener al menos 3 caracteres']
    },
    summary: {
        type: String,
        required: [true, 'El resumen es obligatorio'],
        minlength: [3, 'El resumen debe tener al menos 3 caracteres']
    },
    content: {
        type: String,
        required: [true, 'El contenido es obligatorio'],
        minlength: [3, 'El contenido debe tener al menos 3 caracteres']
    },
    author: {
        type: String,
        minlength: [3, 'El autor debe tener al menos 3 caracteres']
    },
    category: {
        type: String,
        enum: Object.values(CategoryNews),
    },
    tags: {
        type: [String],
    },
    media: {
        portada: {
            caption: String,
            publicId: String,
            url: String,
            type: {
                type: String,
                enum: ['image', 'video'],
                required: true
            },
        },
        zona1: {
            publicId: String,
            url: String,
            type: {
                type: String,
                enum: ['image', 'video'],
                required: false
            }
        },
        zona2: {
            publicId: String,
            url: String,
            type: {
                type: String,
                enum: ['image', 'video'],
                required: false
            }
        },
        gallery: [{
            publicId: String,
            url: String,
            type: {
                type: String,
                enum: ['image', 'video'],
                required: false
            }
        }]
    },
    newsLinked: {
        type: [String],
        default: []
    },
    status: {
        type: String,
        enum: Object.values(NewsStatus),
        default: NewsStatus.PENDING
    },
    subscribersOnly: {
        type: Boolean,
        default: false
    },
    comments: {
        type: [String],
        default: []
    },
    path: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastModifiedBy: {
        type: String,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});


export const News = models.News || model<NewsDocument>('News', NewsSchema);
