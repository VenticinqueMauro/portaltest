import { MainNews, SidebarItem } from "@/types/news.types";
import { Schema, model, models, Document } from "mongoose";

interface HomePageDocument extends Document {
    cover: {
        mainNews: MainNews;
        leftSidebar: SidebarItem[];
        rightSidebar: SidebarItem[];
    };
}

const HomePageSchema = new Schema<HomePageDocument>({
    cover: {
        mainNews: {
            _id: { type: String, required: true },
            media: {
                publicId: { type: String, required: true },
                url: { type: String, required: true },
                type: { type: String, enum: ["image", "video"], required: true }
            },
            pretitle: { type: String, required: true },
            title: { type: String, required: true },
            summary: { type: String, required: true }
        },
        leftSidebar: [{
            _id: { type: String, required: true },
            media: {
                publicId: { type: String, required: false },
                url: { type: String, required: true },
                type: { type: String, enum: ["image", "video"], required: true }
            },
            pretitle: { type: String, required: true },
            title: { type: String, required: true },
            summary: { type: String, required: true }
        }],
        rightSidebar: [{
            _id: { type: String, required: true },
            media: {
                publicId: { type: String, required: false },
                url: { type: String, required: true },
                type: { type: String, enum: ["image", "video"], required: true }
            },
            pretitle: { type: String, required: true },
            title: { type: String, required: true },
            summary: { type: String, required: true }
        }]
    }
});

export const HomePage = models.HomePage || model<HomePageDocument>('HomePage', HomePageSchema);
