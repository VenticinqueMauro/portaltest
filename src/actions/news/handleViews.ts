'use server';

import { connectDB } from "@/lib/mongodb";
import { NewsStatistics } from "@/models/news.views";

export async function incrementarVisita(newsId: string) {
    try {
        await connectDB()
        // Buscar el documento de estadísticas de visitas de noticias
        let statistics = await NewsStatistics.findOne();

        // Verificar si el documento existe
        if (!statistics) {
            // Si no existe, crear uno nuevo
            statistics = new NewsStatistics();
        }

        // Verificar si la noticia ya está en las estadísticas
        const newsIndex = statistics.news_views.findIndex((item: any) => item.news_id.equals(newsId));

        if (newsIndex !== -1) {
            // Si la noticia ya está en las estadísticas, incrementar el contador de visitas
            statistics.news_views[newsIndex].views += 1;
        } else {
            // Si la noticia no está en las estadísticas, agregarla con 1 visita
            statistics.news_views.push({ news_id: newsId, views: 1 });
        }

        // Actualizar la marca de tiempo de la última actualización
        statistics.last_updated = new Date();

        // Guardar los cambios en el documento de estadísticas de visitas de noticias
        await statistics.save();
    } catch (error) {
        console.error('Error al incrementar visita a noticia:', error);
    }
}