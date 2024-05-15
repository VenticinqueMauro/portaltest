import { connectDB } from "@/lib/mongodb";
import { News } from "@/models/news";
import { NewsStatistics } from "@/models/news.views";
import { NewsView } from "@/types/news.types";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try {
        // Conectar a la base de datos
        await connectDB();

        // Obtener el documento de estadísticas de visitas de noticias
        const statistics = await NewsStatistics.findOne();

        // Verificar si existen estadísticas
        if (!statistics) {
            return NextResponse.json({ error: "No hay estadísticas disponibles" }, { status: 404 });
        }

        // Ordenar las noticias por el número de visitas de manera descendente
        statistics.news_views.sort((a: NewsView, b: NewsView) => b.views - a.views);

        // Tomar las 4 primeras noticias más vistas
        const topNewsIds = statistics.news_views.slice(0, 4).map((item: NewsView) => item.news_id);

        // Consultar las noticias más vistas desde la colección de noticias
        const topNews = await News.find({ _id: { $in: topNewsIds } }).select('pretitle title media');

        return NextResponse.json({ message: "Las 4 noticias más vistas", data: topNews }, { status: 200 });

    } catch (error) {
        console.error('Error al obtener las 4 noticias más vistas:', error);
        return NextResponse.json({ error: "Error al obtener las 4 noticias más vistas" }, { status: 500 });
    }
}
