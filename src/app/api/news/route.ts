import { connectDB } from "@/lib/mongodb";
import { News } from "@/models/news";
import { handleError } from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const news = await News.find({});

        if (!news || news.length === 0) {
            return NextResponse.json({ error: "No se encontraron noticias" }, { status: 404 });
        }

        return NextResponse.json({ message: "Noticias encontradas", data: news }, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}

export async function POST(request: NextRequest) {

    try {
        await connectDB();

        const { title, summary, content, category, tags, media, author } = await request.json();

        const existingNews = await News.findOne({ title });

        if (existingNews) {
            return NextResponse.json({ error: "Ya existe una noticia con el mismo título" }, { status: 400 });
        }

        const newNews = new News({
            title,
            summary,
            content,
            category,
            tags,
            media,
            author
        });

        await newNews.save();

        return NextResponse.json({ message: "Noticia creada", data: newNews }, { status: 201 });
    } catch (error) {
        return handleError(error);
    }
}

export async function DELETE(request: NextRequest) {
    try {
        await connectDB();

        const deleteResult = await News.deleteMany({});

        if (deleteResult && deleteResult.deletedCount > 0) {
            return NextResponse.json({ message: "Todas las noticias han sido eliminadas" }, { status: 200 });
        } else {
            return NextResponse.json({ error: "No se encontraron noticias para eliminar" }, { status: 404 });
        }
    } catch (error) {
        return handleError(error);
    }
}

