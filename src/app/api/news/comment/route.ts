import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { News } from '@/models/news';
import { Comment } from '@/models/comment';
import { ClientUser } from '@/models/client.user';
import { handleError } from '@/utils/utils';
import { isValidObjectId } from 'mongoose';

export async function PUT(request: NextRequest) {
    try {
        const data = await request.json();
        const { newsId, content, parentCommentId, userId } = data;

        if (!isValidObjectId(newsId)) {
            return NextResponse.json({ error: "ID de noticia inválido" }, { status: 400 });
        }

        if (!isValidObjectId(userId)) {
            return NextResponse.json({ error: "ID de usuario inválido" }, { status: 400 });
        }

        console.log("HOLA", newsId, userId)

        await connectDB();

        const session = await ClientUser.findOne({ _id: userId })

        console.log(session)
        if (!session) {
            return NextResponse.json({ success: false, message: 'Authentication required' }, { status: 401 });
        }

        const newComment = new Comment({
            content,
            author: {
                id: session._id,
                fullname: session.fullname,
                image: session?.image || undefined,
            },
            news: newsId,
            createdAt: new Date(),
        });

        if (parentCommentId) {
            newComment.replies = parentCommentId;
        }

        await newComment.save();

        if (parentCommentId) {
            await Comment.findByIdAndUpdate(parentCommentId, { $push: { replies: newComment._id } });
        } else {
            await News.findByIdAndUpdate(newsId, { $push: { comments: newComment._id } });
        }

        return NextResponse.json({ success: true, data: newComment });
    } catch (error) {
        return handleError(error)
    }
}
