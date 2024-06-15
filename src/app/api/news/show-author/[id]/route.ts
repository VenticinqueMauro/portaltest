import { connectDB } from "@/lib/mongodb";
import { News } from "@/models/news";
import { handleError } from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const { showAuthor } = await request.json();

    if (typeof showAuthor !== 'boolean') {
        return NextResponse.json({ error: 'El estado de mostrar autor no puede estar vacío' }, { status: 400 });
    }

    try {
        await connectDB();

        const updatedNews = await News.findOneAndUpdate(
            { _id: id },
            { showAuthor: showAuthor },
            { new: true }
        );

        if (!updatedNews) {
            return NextResponse.json({ error: 'Noticia no encontrada' }, { status: 404 });
        }

        return NextResponse.json({ message: showAuthor ? 'El autor ahora es visible' : 'Se oculto el autor de la noticia' }, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}