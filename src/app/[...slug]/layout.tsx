import QuotesContainer from "@/components/cotizaciones/Quotes.container";
import Navbar from "@/components/navbar/Navbar";
import { getNewsByPath } from "@/utils/utils";

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
    const { slug } = params;
    const path = slug[1];

    try {
        const news = await getNewsByPath(path);

        if (!news) {
            return {
                title: 'Noticia no encontrada',
                description: 'No se encontró la noticia solicitada'
            };
        }

        return {
            title: news.title,
            description: news.summary
        };
    } catch (error) {
        console.error("Error al generar metadatos:", error);
        return {
            title: 'Error',
            description: 'Error al generar metadatos de la noticia'
        };
    }
}

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <section >
            <div className='sticky top-0 left-0 z-20'>
                <Navbar />
                <QuotesContainer />
            </div>
            {children}
        </section>
    )
}