import { connectDB } from "@/lib/mongodb";
import { News } from "@/models/news";
import { View } from "@/models/views";
import { handleError } from "@/utils/utils";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;

    try {
        // Validar el ID
        if (!isValidObjectId(id)) {
            return NextResponse.json({ error: "ID de noticia inválido" }, { status: 400 });
        }

        await connectDB();

        // Consultar la noticia
        const newsFound = await News.findById(id);

        // Verificar si se encontró la noticia
        if (!newsFound) {
            return NextResponse.json({ error: "No se encontró la noticia" }, { status: 404 });
        }

        // Incrementar las vistas
        await View.updateOne({ newsId: id }, { $inc: { viewsCount: 1 }, $push: { viewDateTime: new Date() } }, { upsert: true });

        return NextResponse.json({ message: "Noticia encontrada", data: newsFound }, { status: 200 });

    } catch (error) {
        return handleError(error);
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;

    try {
        await connectDB();

        const newsFound = await News.findById(id);

        if (!newsFound) {
            return NextResponse.json({ error: "No se encontró la noticia" }, { status: 404 });
        }

        const updatedNews = await News.findOneAndUpdate(
            { _id: id }, // Condición de búsqueda
            { ...request.json(), updatedAt: new Date() }, // Datos actualizados
            { new: true } // Opción para devolver el documento actualizado
        );

        if (!updatedNews) {
            return NextResponse.json({ error: "No se pudo actualizar la noticia" }, { status: 500 });
        }

        return NextResponse.json({ message: "Noticia actualizada", data: updatedNews }, { status: 200 });

    } catch (error) {
        return handleError(error);
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;

    try {
        await connectDB();

        const newsFound = await News.findById(id);

        if (!newsFound) {
            return NextResponse.json({ error: "No se encontró la noticia" }, { status: 404 });
        }

        await News.deleteOne({ _id: id });

        return NextResponse.json({ message: "Noticia eliminada" }, { status: 200 });

    } catch (error) {
        return handleError(error);
    }
}
