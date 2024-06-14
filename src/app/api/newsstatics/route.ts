import { connectDB } from '@/lib/mongodb';
import { News } from '@/models/news';
import { NewsStatistics } from '@/models/news.views';
import { NextResponse, NextRequest } from 'next/server';

// Define los tipos
interface NewsView {
    news_id: string;
    views: number;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
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

        // Tomar las 10 primeras noticias más vistas
        const topNewsIds: string[] = statistics.news_views.slice(0, 10).map((item: NewsView) => item.news_id);

        // Consultar las noticias más vistas desde la colección de noticias
        const topNews = await News.find({ _id: { $in: topNewsIds } })
            .select('pretitle title media category path')
            .lean(); // .lean() para devolver objetos JavaScript simples en lugar de documentos Mongoose

        // Ordenar las noticias devueltas para mantener el mismo orden que en topNewsIds
        const topNewsOrdered: any = topNewsIds.map(id => topNews.find((news: any) => news._id.toString() === id.toString()));

        return NextResponse.json({ message: "Las 10 noticias más vistas", data: topNewsOrdered }, { status: 200 });

    } catch (error) {
        console.error('Error al obtener las noticias más vistas:', error);
        return NextResponse.json({ error: "Error al obtener las noticias más vistas" }, { status: 500 });
    }
}
