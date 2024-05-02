import { MainNews, SidebarItem } from "@/types/news.types";
import { Schema, model, models, Document } from "mongoose";



interface HomePageDocument extends Document {
    portada: {
        noticiaprincipal: MainNews;
        lateralizq: SidebarItem[];
        lateralder: SidebarItem[];
    };
}

const HomePageSchema = new Schema<HomePageDocument>({
    portada: {
        noticiaprincipal: {
            media: {
                publicId: { type: String, required: true },
                url: { type: String, required: true },
                type: { type: String, enum: ["image", "video"], required: true }
            },
            pretitle: { type: String, required: true },
            title: { type: String, required: true },
            summary: { type: String, required: true }
        },
        lateralizq: [{
            media: {
                publicId: { type: String, required: false },
                url: { type: String, required: true },
                type: { type: String, enum: ["image", "video"], required: true }
            },
            pretitle: { type: String, required: true },
            title: { type: String, required: true },
            summary: { type: String, required: true }
        }],
        lateralder: [{
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
