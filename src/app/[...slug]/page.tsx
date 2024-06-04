import QuotesContainer from "@/components/cotizaciones/Quotes.container";
import { getCover } from "@/components/home/Container.home";
import Navbar from "@/components/navbar/Navbar";
import PortadaPrincipal from "@/components/noticias-por-categoria/PortadaPrincipal";
import PublicidadSuperior from "@/components/noticias-por-categoria/publicidades/PublicidadSuperior";
import Container from "@/components/noticiasIndividuales/Container";
import { MainNews, NewsType, SidebarItem } from "@/types/news.types";
import { getFormatedCategoryNews, getNewsByPath } from "@/utils/utils";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/news`, { cache: 'no-store' });
        if (!response.ok) throw new Error('Failed to fetch news data');
        const { data }: { data: NewsType[] } = await response.json();

        return data.map((news: NewsType) => {
            const path = news.title ? news.title.replace(/\s+/g, '-').toLowerCase() : 'default-path';
            return {
                slug: [news.category, path]
            };
        });
    } catch (error) {
        console.error('Error in generateStaticParams:', error);
        return [];
    }
}

async function getAds(category: string) {
    const encodedCategory = encodeURIComponent(category);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/ads?category=${encodedCategory}`, { next: { revalidate: 60 } });
        if (!response.ok) throw new Error('Failed to fetch ads');
        const { data } = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching ads:', error);
        return null;
    }
}

interface SectionData {
    mainNews: MainNews;
    gridNews: SidebarItem[];
}

export default async function Page({ params }: { params: { slug: string[] } }) {
    const { slug } = params;
    const [category, path] = slug || [];

    if (!category) return notFound();

    const decodedCategory = decodeURIComponent(category.replace(/\+/g, ' '));
    let news, moreNews, ads, homeNews;

    try {
        [news, homeNews, moreNews, ads] = await Promise.all([
            path ? getNewsByPath(path) : Promise.resolve(null),
            getCover(),
            getFormatedCategoryNews(decodedCategory),
            getAds(decodedCategory)
        ]);
    } catch (error) {
        console.error('Error fetching data:', error);
        return notFound();
    }

    if (path && news) {
        return (
            <Container news={news} category={decodedCategory} moreNews={moreNews} ads={ads} />
        );
    } else if (!path && homeNews) {
        const sectionTitle = decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1);
        const { data: { sections } } = homeNews;
        const news: SectionData = sections[decodedCategory];

        const allNews = [news.mainNews, ...news.gridNews];
        const filteredNews = moreNews.filter((item: NewsType) => !allNews.some(newsItem => newsItem.id === item._id));

        return (
            <main>
                <PublicidadSuperior ads={ads} />
                <div className='sticky top-0 left-0 z-20'>
                    <Navbar />
                    <QuotesContainer />
                </div>
                <PortadaPrincipal sectionTitle={sectionTitle} allNews={allNews} news={news} ads={ads} filteredNews={filteredNews} />
            </main>
        );
    }

    return notFound();
}
