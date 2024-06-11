import { connectDB } from "@/lib/mongodb";
import { News } from "@/models/news";
import { NewsStatus } from "@/types/news.types";
import { handleError, normalizeTitle } from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const pathQuery = searchParams.get('path');
    const categoryQuery = searchParams.get('category');

    try {
        await connectDB();

        let news;
        if (pathQuery) {
            news = await News.findOne({ path: pathQuery }).populate({ path: 'comments' }).lean()
        } else if (categoryQuery) {
            news = await News.find(
                { category: categoryQuery, status: NewsStatus.PUBLISHED },
                { _id: 1, media: 1, pretitle: 1, title: 1, category: 1, path: 1 }
            )
                .sort({ date: -1 })
                .lean();;
        } else {
            news = await News.find({});
        }

        if (!news || (Array.isArray(news) && news.length === 0)) {
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

        const { pretitle, title, summary, content, category, tags, media, author, newsLinked } = await request.json();

        const existingNews = await News.findOne({ title });

        if (existingNews) {
            return NextResponse.json({ error: "Ya existe una noticia con el mismo título" }, { status: 400 });
        }

        const path = normalizeTitle(title);

        const newNews = new News({
            pretitle,
            title,
            summary,
            content,
            category,
            tags,
            media,
            author,
            newsLinked,
            path
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

