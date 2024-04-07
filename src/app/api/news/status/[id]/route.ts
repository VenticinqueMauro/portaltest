import { connectDB } from "@/lib/mongodb";
import { News } from "@/models/news";
import { handleError } from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const status = await request.json()

    if (status === undefined) {
        return NextResponse.json({ error: 'El estado de la noticia no puede estar vacío' }, { status: 400 });
    }

    try {
        await connectDB();

        const updatedNews = await News.findOneAndUpdate(
            { _id: id },
            { status: status },
            { new: true } 
        );

        if (!updatedNews) {
            return NextResponse.json({ error: 'Noticia no encontrada' }, { status: 404 });
        }

        return NextResponse.json({ message: `${status === 'publicado' ? 'Noticia publicada con éxito' : 'Noticia en estado pendiente'}` }, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}
