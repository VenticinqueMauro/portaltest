import QuotesContainer from "@/components/cotizaciones/Quotes.container";
import { getCover } from "@/components/home/Container.home";
import SectionTitle from "@/components/home/SectionTitle";
import LateralDesktop from "@/components/home/publicidades/Lateral.Desktop";
import Navbar from "@/components/navbar/Navbar";
import PublicidadSuperior from "@/components/noticias-por-categoria/publicidades/PublicidadSuperior";
import Container from "@/components/noticiasIndividuales/Container";
import { HomePageDocument } from "@/models/home";
import { Ad, NewsType, SectionNewsMap } from "@/types/news.types";
import { blurImage } from "@/utils/blurImage";
import { getFormatedCategoryNews, getNewsByPath } from "@/utils/utils";
import Image from "next/image";
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


        const [news, ads] = await Promise.all([
            getFormatedCategoryNews(decodeCategory),
            getAds(category),
            getFormatedCategoryNews(decodeCategory)
        ]);

        console.log(ads)

        const sectionTitle = decodeCategory.charAt(0).toUpperCase() + decodeCategory.slice(1);

        return (
            <main>
                <PublicidadSuperior ads={ads} />
                <div className='sticky top-0 left-0 z-20'>
                    <Navbar />
                    <QuotesContainer />
                </div>
                <div className="py-10">
                    <section className="relative">
                        <SectionTitle title={sectionTitle} />
                        <div className="max-w-6xl lg:mr-[240px] 2xl:mx-auto  px-3">
                            <h2>{news?.[0]?.title || 'no hay datos'}</h2>
                            <LateralDesktop url={ads?.media.desktop?.side?.url} />
                        </div>
                    </section>
                </div>
            </main>
        )
    }

    return notFound();

}
