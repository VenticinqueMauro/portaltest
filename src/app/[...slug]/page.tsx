import Container from "@/components/noticiasIndividuales/Container";
import { NewsType } from "@/types/news.types";
import { getFormatedCategoryNews, getNewsByPath } from "@/utils/utils";

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


export default async function Page({ params }: { params: { slug: string[] } }) {
    const { slug } = params;
    const [category, path] = slug;

    const decodeCategory = decodeURIComponent(category)

    const [news, moreNews] = await Promise.all([
        getNewsByPath(path),
        getFormatedCategoryNews(category)
    ]);


    return (
        <Container news={news} category={decodeCategory} moreNews={moreNews} />
    );
}
