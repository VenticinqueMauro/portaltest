import QuotesContainer from "@/components/cotizaciones/Quotes.container";
import { getCover } from "@/components/home/Container.home";
import SectionTitle from "@/components/home/SectionTitle";
import LateralDesktop from "@/components/home/publicidades/Lateral.Desktop";
import Navbar from "@/components/navbar/Navbar";
import PublicidadSuperior from "@/components/noticias-por-categoria/publicidades/PublicidadSuperior";
import Container from "@/components/noticiasIndividuales/Container";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HomePageDocument } from "@/models/home";
import { Ad, NewsType, SectionNewsMap } from "@/types/news.types";
import { blurImage } from "@/utils/blurImage";
import { getFormatedCategoryNews, getNewsByCategory, getNewsByPath } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
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

    const encodedCategory = encodeURIComponent(category);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/ads?category=${encodedCategory}`, { next: { revalidate: 60 } });

        if (!response.ok) {
            console.log('Error al obtener publicidades');
        }
        const { data } = await response.json();

        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}


export default async function Page({ params }: { params: { slug: string[] } }) {
    const { slug } = params;
    const [category, path] = slug;

    const decodeCategory = decodeURIComponent(category.replace(/\+/g, ' '));

    if (category && path) {

        const [news, moreNews, ads] = await Promise.all([
            getNewsByPath(path),
            getFormatedCategoryNews(decodeCategory),
            getAds(decodeCategory)
        ]);

        return (
            <Container news={news} category={decodeCategory} moreNews={moreNews} ads={ads} />
        );
    }

    if (category && !path) {

        const [news, ads] = await Promise.all([
            getNewsByCategory(decodeCategory),
            getAds(decodeCategory)
        ]);

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
                        <div className="max-w-6xl lg:mr-[240px] 2xl:mx-auto px-3">
                            <Link className="rounded min-h-full col-start-1 col-span-12 lg:col-start-3 lg:col-span-8" href={`${category}/${news[0].path}`}>
                                <Card className="bg-gray-100 hover:bg-gray-200 transition-all duration-100">
                                    <div className="px-1">
                                        <div className="relative -top-2">
                                            {news?.[0].media.portada.type !== 'video' ? (
                                                <Image src={news?.[0].media.portada.url} alt={news?.[0].title} width={856} height={422} placeholder="blur" blurDataURL={blurImage} className="object-cover rounded w-full aspect-video" />
                                            ) : (
                                                <video width="856" height="422" controls autoPlay loop className="w-full object-cover aspect-video rounded">
                                                    <source src={news?.[0].media.portada.url} type="video/mp4" />
                                                    Tu navegador no soporta la etiqueta de video.
                                                </video>
                                            )}
                                        </div>
                                    </div>
                                    <CardHeader className="text-center">
                                        <CardDescription className="text-muted-foreground font-medium text-sm">
                                            {news?.[0].pretitle}
                                        </CardDescription>
                                        <CardTitle className="text-3xl">
                                            {news?.[0].title}
                                        </CardTitle>
                                        <CardDescription className="text-lg max-w-xl mx-auto">
                                            {news?.[0].summary}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </Link>
                            <LateralDesktop url={ads?.media?.desktop?.side?.url || ''} />
                        </div>
                    </section>
                </div>
            </main>
        );
    }

    return notFound();
}