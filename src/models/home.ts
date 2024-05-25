import { MainNews, SectionNewsMap, SidebarItem } from "@/types/news.types";
import { Schema, model, models, Document } from "mongoose";

export interface HomePageDocument extends Document {
    cover: {
        mainNews: MainNews;
        leftSidebar: SidebarItem[];
        rightSidebar: SidebarItem[];
    },
    sections: SectionNewsMap;
}

const HomePageSchema = new Schema<HomePageDocument>({
    cover: {
        mainNews: {
            id: { type: String, required: true },
            media: {
                publicId: { type: String, required: true },
                url: { type: String, required: true },
                type: { type: String, enum: ["image", "video"], required: true }
            },
            pretitle: { type: String, required: true },
            title: { type: String, required: true },
            summary: { type: String, required: true },
            category: { type: String, required: true },
            path: { type: String, required: true },
        },
        leftSidebar: [{
            id: { type: String, required: true },
            media: {
                publicId: { type: String, required: false },
                url: { type: String, required: true },
                type: { type: String, enum: ["image", "video"], required: true }
            },
            pretitle: { type: String, required: true },
            title: { type: String, required: true },
            summary: { type: String, required: true },
            category: { type: String, required: true },
            path: { type: String, required: true },
        }],
        rightSidebar: [{
            id: { type: String, required: true },
            media: {
                publicId: { type: String, required: false },
                url: { type: String, required: true },
                type: { type: String, enum: ["image", "video"], required: true }
            },
            pretitle: { type: String, required: true },
            title: { type: String, required: true },
            summary: { type: String, required: true },
            category: { type: String, required: true },
            path: { type: String, required: true },
        }]
    },
    sections: {
        politica: {
            mainNews: {
                id: { type: String },
                media: {
                    publicId: { type: String },
                    url: { type: String },
                    type: { type: String, enum: ["image", "video"] }
                },
                pretitle: { type: String },
                title: { type: String },
                summary: { type: String },
                category: { type: String },
                path: { type: String },
            },
            gridNews: [{
                id: { type: String },
                media: {
                    publicId: { type: String, required: false },
                    url: { type: String },
                    type: { type: String, enum: ["image", "video"] }
                },
                pretitle: { type: String },
                title: { type: String },
                summary: { type: String },
                category: { type: String },
                path: { type: String },
            }]
        },
        "eco & negocios": {
            mainNews: {
                id: { type: String },
                media: {
                    publicId: { type: String },
                    url: { type: String },
                    type: { type: String, enum: ["image", "video"] }
                },
                pretitle: { type: String },
                title: { type: String },
                summary: { type: String },
                category: { type: String },
                path: { type: String },
            },
            gridNews: [{
                id: { type: String },
                media: {
                    publicId: { type: String, required: false },
                    url: { type: String },
                    type: { type: String, enum: ["image", "video"] }
                },
                pretitle: { type: String },
                title: { type: String },
                summary: { type: String },
                category: { type: String },
                path: { type: String },
            }]
        },
        deportes: {
            mainNews: {
                id: { type: String },
                media: {
                    publicId: { type: String },
                    url: { type: String },
                    type: { type: String, enum: ["image", "video"] }
                },
                pretitle: { type: String },
                title: { type: String },
                summary: { type: String },
                category: { type: String },
                path: { type: String },
            },
            gridNews: [{
                id: { type: String },
                media: {
                    publicId: { type: String, required: false },
                    url: { type: String },
                    type: { type: String, enum: ["image", "video"] }
                },
                pretitle: { type: String },
                title: { type: String },
                summary: { type: String },
                category: { type: String },
                path: { type: String },
            }]
        },
        tendencias: {
            mainNews: {
                id: { type: String },
                media: {
                    publicId: { type: String },
                    url: { type: String },
                    type: { type: String, enum: ["image", "video"] }
                },
                pretitle: { type: String },
                title: { type: String },
                summary: { type: String },
                category: { type: String },
                path: { type: String },
            },
            gridNews: [{
                id: { type: String },
                media: {
                    publicId: { type: String, required: false },
                    url: { type: String },
                    type: { type: String, enum: ["image", "video"] }
                },
                pretitle: { type: String },
                title: { type: String },
                summary: { type: String },
                category: { type: String },
                path: { type: String },
            }]
        },
        portalcana: {
            mainNews: {
                id: { type: String },
                media: {
                    publicId: { type: String },
                    url: { type: String },
                    type: { type: String, enum: ["image", "video"] }
                },
                pretitle: { type: String },
                title: { type: String },
                summary: { type: String },
                category: { type: String },
                path: { type: String },
            },
            gridNews: [{
                id: { type: String },
                media: {
                    publicId: { type: String, required: false },
                    url: { type: String },
                    type: { type: String, enum: ["image", "video"] }
                },
                pretitle: { type: String },
                title: { type: String },
                summary: { type: String },
                category: { type: String },
                path: { type: String },
            }]
        }
    }
});

export const HomePage = models.HomePage || model<HomePageDocument>('HomePage', HomePageSchema);
