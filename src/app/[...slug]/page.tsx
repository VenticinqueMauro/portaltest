import QuotesContainer from "@/components/cotizaciones/Quotes.container";
import { getCover } from "@/components/home/Container.home";
import SectionTitle from "@/components/home/SectionTitle";
import NoticiaPrincipalCategory from "@/components/home/categories/NoticiaPrincipal.category";
import NoticiasGridCategory from "@/components/home/categories/NoticiasGrid.category";
import InferiorDesktop from "@/components/home/publicidades/Inferior.Desktop";
import Navbar from "@/components/navbar/Navbar";
import PublicidadSuperior from "@/components/noticias-por-categoria/publicidades/PublicidadSuperior";
import Container from "@/components/noticiasIndividuales/Container";
import { MainNews, NewsType, SidebarItem } from "@/types/news.types";
import { blurImage } from "@/utils/blurImage";
import { getFormatedCategoryNews, getNewsByPath } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fontMerriweather } from "../fonts";

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

interface SectionData {
    mainNews: MainNews;
    gridNews: SidebarItem[];
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

        const sectionTitle = decodeCategory.charAt(0).toUpperCase() + decodeCategory.slice(1);

        const [homeNews, ads, moreNews] = await Promise.all([
            getCover(),
            getAds(decodeCategory),
            getFormatedCategoryNews(category)
        ]);


        const { data: { sections } } = homeNews;

        const news: SectionData = sections[decodeCategory];

        const allNews = [news.mainNews, ...news.gridNews];

        const filteredNews = moreNews.filter((item: NewsType) => {
            return !allNews.some((newsItem) => newsItem.id === item._id);
        });

        console.log(moreNews, decodeCategory)

        return (
            <main>
                <PublicidadSuperior ads={ads} />
                <div className='sticky top-0 left-0 z-20'>
                    <Navbar />
                    <QuotesContainer />
                </div>
                <div className="py-10">
                    <div className="relative">
                        <SectionTitle title={sectionTitle} />
                        {
                            allNews.length &&
                            <div className="max-w-6xl 2xl:mx-auto grid grid-cols-12 gap-4 px-3 lg:mr-[240px]">
                                <NoticiaPrincipalCategory
                                    image={{ type: news.mainNews.media.type as 'image' | 'video', url: news.mainNews.media.url }}
                                    pretitle={news.mainNews.pretitle}
                                    title={news.mainNews.title}
                                    category={news.mainNews.category}
                                    path={news.mainNews.path!}
                                    id={news.mainNews.id}
                                />

                                <div className="col-span-12 lg:col-span-4 min-h-full">
                                    <div className="grid grid-cols-12 gap-4 h-full">
                                        {
                                            news.gridNews.map((item, index) => (
                                                <NoticiasGridCategory
                                                    key={item.id}
                                                    image={{ type: item.media.type as 'image' | 'video', url: item.media.url }}
                                                    pretitle={item.pretitle}
                                                    title={item.title}
                                                    category={item.category}
                                                    path={item.path!}
                                                    id={item.id}
                                                />
                                            ))
                                        }
                                    </div>
                                </div>
                                {/* PUBLICIDAD INFERIOR DESKTOP  */}
                                <InferiorDesktop url={ads?.media?.desktop?.bottom?.url || ''} />
                            </div>
                        }
                        <div className="max-w-6xl 2xl:mx-auto px-3 lg:mr-[240px]">
                            {
                                filteredNews.map((item: Partial<NewsType>) => (
                                    <Link href={`/${decodeCategory}/${item.path}`} key={item._id} className="flex flex-col-reverse md:flex-row justify-between gap-2 md:gap-10 border-b py-4 hover:bg-gray-50 p-1">
                                        <div className="min-w-fit text-xs md:text-sm text-muted-foreground font-light " >8 de mayo de 2024</div>
                                        <div className="flex flex-col space-y-2 grow order-first md:order-none">
                                            <h3 className="text-2xl font-semibold leading-none tracking-tight">{item.title}</h3>
                                            <h4 className={`${fontMerriweather.className} text-md`}>{item.summary}</h4>
                                            <h5 className="text-muted-foreground text-sm">Por <b className="text-foreground capitalize">{item.author}</b></h5>
                                        </div>
                                        {
                                            item.media?.portada.type !== 'video' ? (
                                                <Image
                                                    src={item.media?.portada.url ?? ''}
                                                    alt={item.title ?? ''}
                                                    width={400}
                                                    height={300}
                                                    className=" object-cover aspect-video rounded md:w-72 "
                                                    placeholder="blur"
                                                    blurDataURL={blurImage}
                                                    priority
                                                />
                                            ) : (
                                                <video width="400" height="300" controls={true} autoPlay loop className="w-full object-cover aspect-video rounded md:w-72 ">
                                                    <source src={item.media?.portada.url} type="video/mp4" />
                                                    Tu navegador no soporta la etiqueta de video.
                                                </video>
                                            )
                                        }
                                    </Link>
                                ))
                            }
                        </div>

                    </div>
                </div>
            </main>
        );
    }

    return notFound();
}