import { connectDB } from "@/lib/mongodb";
import { News } from "@/models/news";
import { CategoryNews, Media, NewsStatus } from "@/types/news.types";
import { handleError } from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";

export type MoreNews = {
    _id: string;
    title: string;
    pretitle: string;
    media: { portada: Media; }
    category: CategoryNews;
    path: string;
}

export type MoreNewsData = {
    politica: MoreNews[],
    'eco & negocios': MoreNews[],
    deportes: MoreNews[],
    tendencias: MoreNews[],
    portalcana: MoreNews[]
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('category');


    try {
        await connectDB();

        if (query) {
            const news: MoreNews[] = await News.find(
                { category: query, status: NewsStatus.PUBLISHED },
                { _id: 1, media: 1, pretitle: 1, title: 1, summary: 1, category: 1, path: 1, author: 1, createdAt: 1 }
            )
                .sort({ date: -1 })
                .lean();

            return NextResponse.json({ data: news }, { status: 200 });
        }

        const categories: CategoryNews[] = Object.values(CategoryNews);
        const newsData: MoreNewsData = {
            politica: [],
            'eco & negocios': [],
            deportes: [],
            tendencias: [],
            portalcana: []
        };

        for (const category of categories) {
            const news: MoreNews[] = await News.find(
                { category, status: NewsStatus.PUBLISHED },
                { _id: 1, media: 1, pretitle: 1, title: 1, category: 1, path: 1 }
            )
                .sort({ date: -1 })
                .lean();

            newsData[category] = news;
        }

        return NextResponse.json({ data: newsData }, { status: 200 });

    } catch (error) {
        return handleError(error);
    }
}