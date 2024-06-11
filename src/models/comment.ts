import { Schema, Document, model, models } from 'mongoose';

interface Reaction {
    type: 'like' | 'dislike' | 'laugh' | 'angry';
    user: Schema.Types.ObjectId;
}

export interface CommentDocument extends Document {
    content: string;
    author: Schema.Types.ObjectId;
    news: Schema.Types.ObjectId;
    replies?: Schema.Types.ObjectId[];
    reactions?: Reaction[];
    taggedUsers?: Schema.Types.ObjectId[];
    createdAt: Date;
}

const ReactionSchema = new Schema<Reaction>({
    type: { type: String, enum: ['like', 'dislike', 'laugh', 'angry'], required: true },
    user: { type: Schema.Types.ObjectId, ref: 'ClientUser', required: true }
});

const CommentSchema = new Schema<CommentDocument>({
    content: { type: String, required: true },
    author: {
        id: { type: Schema.Types.ObjectId, ref: 'ClientUser', required: true },
        fullname: { type: String, required: true },
        image: { type: String },
    },
    news: { type: Schema.Types.ObjectId, ref: 'News', required: true },
    replies: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    reactions: [ReactionSchema],
    taggedUsers: [{ type: Schema.Types.ObjectId, ref: 'ClientUser' }],
    createdAt: { type: Date, default: Date.now },
});

export const Comment = models.Comment || model<CommentDocument>('Comment', CommentSchema);
