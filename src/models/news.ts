import { Schema, model, models, Document, Types } from "mongoose";

export enum NewsStatus {
    INACTIVE = 'inactive',
    ACTIVE = 'active',
    PENDING = 'pending',
}

export interface LinkedNews {
    _id: Types.ObjectId;
    title: string;
    summary: string;
    image: string;
}

export enum CategoryNews{
    POLITICA = 'politica',
    ECONEGOCIOS = 'eco & negocios',
    DEPORTES = 'deportes',
    TENDENCIAS = 'tendencias',
    PORTALCANA = 'portalcana',
}

interface NewsDocument extends Document {
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

const NewsSchema = new Schema<NewsDocument>({
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    summary: {
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
        minlength: 3
    },
    category: {
        type: [String],
        enum: Object.values(CategoryNews),
    },
    tags: {
        type: [String],
    },
    image: {
        type: String,
        required: true,
    },
    highlightedText: {
        type: String
    },
    newsLinked: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'News',
            validate: {
                validator: function (val: any[]) {
                    return val.length <= 3;
                },
                message: `El campo 'noticias vinculadas' no puede tener más de ${3} noticias vinculadas.`
            }
        }],
        default: []
    },
    status: {
        type: String,
        enum: Object.values(NewsStatus),
        default: NewsStatus.INACTIVE
    },
    subscribersOnly: {
        type: Boolean,
        default: false
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
