import { connectDB } from "@/lib/mongodb";
import { News } from "@/models/news";
import { handleError } from "@/utils/utils";
import { verify } from "jsonwebtoken";
import { isValidObjectId } from "mongoose";
import { cookies } from "next/headers";
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

        return NextResponse.json({ message: "Noticia encontrada", data: newsFound }, { status: 200 });

    } catch (error) {
        return handleError(error);
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;

    const token = cookies().get('portal_app')?.value

    if (!token) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const decodedToken: any = verify(token, `${process.env.JWT_KEY}`)

    try {
        await connectDB();

        const newsFound = await News.findById(id);

        if (!newsFound) {
            return NextResponse.json({ error: "No se encontró la noticia" }, { status: 404 });
        }

        const updatedNews = await News.findOneAndUpdate(
            { _id: id }, // Condición de búsqueda
            { ...await request.json(), updatedAt: new Date(), lastModifiedBy: decodedToken.fullname }, // Datos actualizados
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
