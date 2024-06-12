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

        await connectDB();

        const session = await ClientUser.findOne({ _id: userId })

        if (!session) {
            return NextResponse.json({ success: false, message: 'Se requiere autenticación' }, { status: 401 });
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

        return NextResponse.json({ message: 'Comentario agregado exitosamente', data: newComment });
    } catch (error) {
        return handleError(error)
    }
}


export async function DELETE(request: NextRequest) {
    try {
        await connectDB();

        const { commentId, newsId } = await request.json();

        if (!commentId || !newsId) {
            return NextResponse.json({ error: 'Falta commentId o newsId' }, { status: 400 });
        }

        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment) {
            return NextResponse.json({ error: 'Comentario no encontrado' }, { status: 404 });
        }

        await News.findByIdAndUpdate(newsId, {
            $pull: { comments: commentId }
        });

        return NextResponse.json({ message: 'Comentario eliminado con éxito' }, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}
