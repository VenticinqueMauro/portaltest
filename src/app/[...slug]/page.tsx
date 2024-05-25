import { NewsType } from "@/types/news.types";
import { getNewsByPath } from "@/utils/utils";

export async function generateStaticParams() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/news`, { cache: 'no-store' });
    const { data }: { data: NewsType[] } = await response.json();

    return data.map((news: NewsType) => {
        const path = news.title ? news.title.replace(/\s+/g, '-').toLowerCase() : 'default-path';
        return {
            slug: [news.category, path]
        };
    });
}

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

export default async function Page({ params }: { params: { slug: string[] } }) {
    const { slug } = params;
    const [category, path] = slug;

    const news = await getNewsByPath(path);

    return (
        <div>
            <h1>Categoría: {category}</h1>
            <h2>Path: {path}</h2>
        </div>
    );
}
