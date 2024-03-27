import { Schema, model, Document } from "mongoose";

interface ViewDocument extends Document {
    newsId: Schema.Types.ObjectId;
    viewsCount: number;
    viewDateTime: Date[];
}

const ViewSchema = new Schema<ViewDocument>({
    newsId: {
        type: Schema.Types.ObjectId,
        ref: 'News',
        required: true
    },
    viewsCount: {
        type: Number,
        default: 0
    },
    viewDateTime: {
        type: [Date],
        default: []
    }
});

export const View = model<ViewDocument>('View', ViewSchema);