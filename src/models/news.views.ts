import { Document, Schema, model, models } from "mongoose";

interface NewsStatisticsDocument extends Document {
    news_views: {
        news_id: Schema.Types.ObjectId,
        views: number
    }[],
    last_updated: Date
}

const NewsStatisticsSchema = new Schema<NewsStatisticsDocument>({
    news_views: [{
        news_id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        views: {
            type: Number,
            default: 0
        }
    }],
    last_updated: {
        type: Date,
        default: Date.now
    }
});

export const NewsStatistics = models.NewsStatistics || model<NewsStatisticsDocument>('NewsStatistics', NewsStatisticsSchema);
