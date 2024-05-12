import { Ads } from '@/types/news.types';
import { Schema, Document, model, models } from 'mongoose';

interface AdDocument extends Document {
    media?: {
        desktop?: {
            top?: { public_Id?: string; url?: string },
            side?: { public_Id?: string; url?: string },
            bottom?: { public_Id?: string; url?: string }
        };
        mobile?: {
            top?: { public_Id?: string; url?: string },
            side?: { public_Id?: string; url?: string },
            bottom?: { public_Id?: string; url?: string }
        }
    };
}

const AdSchema = new Schema<AdDocument>({
    media: {
        desktop: {
            top: { public_id: String, url: String },
            side: { public_id: String, url: String },
            bottom: { public_id: String, url: String }
        },
        mobile: {
            top: { public_id: String, url: String },
            side: { public_id: String, url: String },
            bottom: { public_id: String, url: String }
        }
    }
});

export interface AdsDocument extends Document {
    ads: Ads;
}

const AdsSchema = new Schema<AdsDocument>({
    ads: {
        home: {
            portada: { type: AdSchema },
            politica: { type: AdSchema },
            'eco & negocios': { type: AdSchema },
            deportes: { type: AdSchema },
            tendencias: { type: AdSchema },
            portalcana: { type: AdSchema }
        }
    }
});

export const Ad = models.Ad || model<AdsDocument>('Ad', AdsSchema);
