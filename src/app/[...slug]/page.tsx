import Container from "@/components/noticiasIndividuales/Container";
import { NewsType } from "@/types/news.types";
import { getFormatedCategoryNews, getNewsByPath } from "@/utils/utils";
import { notFound } from "next/navigation";

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

async function getAds(category: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/ads?category=${category}`, { next: { revalidate: 60 } });

        if (!response.ok) {
            console.log('Error al obtener publicidades');
        }
        const { data } = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}


export default async function Page({ params }: { params: { slug: string[] } }) {
    const { slug } = params;
    const [category, path] = slug;

    const decodeCategory = decodeURIComponent(category)

    if (category && path) {
        const [news, moreNews, ads] = await Promise.all([
            getNewsByPath(path),
            getFormatedCategoryNews(category),
            getAds(category)
        ]);


        return (
            <Container news={news} category={decodeCategory} moreNews={moreNews} ads={ads} />
        );
    }

    if (category && !path) {
        return (
            <p>{category}</p>
        )
    }

    return notFound();

}
