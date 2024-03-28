import { connectDB } from "@/lib/mongodb";
import { News } from "@/models/news";
import { NewsType } from "@/types/news.types";
import { handleError } from "@/utils/utils";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
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
    const news: NewsType = await request.json();

    const token = cookies().get('portal_app')?.value

    if (!token) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const decodedToken: any = verify(token, `${process.env.JWT_KEY}`);

    try {
        await connectDB();

        const newsFound = await News.findOne({ title: news.title });

        if (newsFound) {
            return NextResponse.json({ error: "Ya existe una noticia con el mismo título" }, { status: 400 });
        }

        const newNews = new News({
            ...news,
            author: decodedToken.fullname
        });

        if (!newNews) {
            return NextResponse.json({ error: "No se pudo crear la noticia" }, { status: 400 });
        }

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

