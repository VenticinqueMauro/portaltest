import { incrementarVisita } from "@/actions/news/handleViews";
import { connectDB } from "@/lib/mongodb";
import { News } from "@/models/news";
import { handleError, normalizeTitle } from "@/utils/utils";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;

    try {
        // Validar el ID de la noticia
        if (!isValidObjectId(id)) {
            return NextResponse.json({ error: "ID de noticia inválido" }, { status: 400 });
        }

        // Conectar a la base de datos
        await connectDB();

        // Consultar la noticia por su ID
        const newsFound = await News.findById(id);

        // Verificar si se encontró la noticia
        if (!newsFound) {
            return NextResponse.json({ error: "No se encontró la noticia" }, { status: 404 });
        }

        // Incrementar la visita en el documento de estadísticas de visitas de noticias
        await incrementarVisita(id);

        return NextResponse.json({ message: "Noticia encontrada", data: newsFound }, { status: 200 });

    } catch (error) {
        console.error('Error al obtener noticia:', error);
        return NextResponse.json({ error: "Error al obtener noticia" }, { status: 500 });
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

        const data = await request.json();
        
        const path = normalizeTitle(data.title);

        const updatedNews = await News.findOneAndUpdate(
            { _id: id }, // Condición de búsqueda
            { ...data, path, updatedAt: new Date() }, // Datos actualizados
            { new: true } // Opción para devolver el documento actualizado
        );

        if (!updatedNews) {
            return NextResponse.json({ error: "No se pudo actualizar la noticia" }, { status: 500 });
        }

        console.log(updatedNews)

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
