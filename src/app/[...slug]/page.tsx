import Container from "@/components/noticiasIndividuales/Container";
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

export default async function Page({ params }: { params: { slug: string[] } }) {
    const { slug } = params;
    const [category, path] = slug;

    const decodeCategory = decodeURIComponent(category)

    const news: NewsType = await getNewsByPath(path);

    return (
        <Container news={news} category={decodeCategory} />
    );
}
