import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { News } from "@/models/news";

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        // Leer el cuerpo de la solicitud
        const { ids } = await request.json();

        // Validar que los IDs están presentes y son un array
        if (!Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ error: 'No IDs provided' }, { status: 400 });
        }

        // Convertir los IDs a ObjectId
        const objectIds = ids.filter(id => id !== "").map(id => new ObjectId(id));

        // Realizar la consulta con Mongoose
        const news = await News.find(
            { _id: { $in: objectIds } },
            { _id: 1, media: 1, pretitle: 1, title: 1, category: 1, path: 1 }
        );

        // Devolver la respuesta con las noticias
        return NextResponse.json(news);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
