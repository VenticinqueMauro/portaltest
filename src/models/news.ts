import { Schema, model, models, Document, Types } from "mongoose";

export enum NewsStatus {
    PUBLISHED = 'publicado',
    PENDING = 'pendiente',
}

export interface MediaNews {
        portada: {
            publicId: string;
            url: string;
            type: "image" | "video";
        };
        zona1: {
            publicId: string;
            url: string;
            type: "image" | "video";
        };
        zona2: {
            publicId: string;
            url: string;
            type: "image" | "video";
        };
        gallery: Array<{
            publicId: string;
            url: string;
            type: "image" | "video";
        }>;
}

export interface LinkedNews {
    _id: Types.ObjectId;
    title: string;
    summary: string;
    image: string;
}

export enum CategoryNews {
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
    category: CategoryNews;
    subscribersOnly: boolean;
    lastModifiedBy?: string;
    highlightedText?: string;
    newsLinked?: LinkedNews[];
    media?: MediaNews;
    author?: string;
    tags?: string[];
    comments?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

const NewsSchema = new Schema<NewsDocument>({
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
            publicId: String,
            url: String,
            type: {
                type: String,
                enum: ['image', 'video']
            }
        },
        zona1: {
            publicId: String,
            url: String,
            type: {
                type: String,
                enum: ['image', 'video']
            }
        },
        zona2: {
            publicId: String,
            url: String,
            type: {
                type: String,
                enum: ['image', 'video']
            }
        },
        gallery: [{
            publicId: String,
            url: String,
            type: {
                type: String,
                enum: ['image', 'video']
            }
        }]
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
