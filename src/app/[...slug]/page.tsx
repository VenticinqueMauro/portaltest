import MasNoticiasContainer from "@/components/noticiasIndividuales/MasNoticiasContainer";
import { NewsType } from "@/types/news.types";
import { blurImage } from "@/utils/blurImage";
import { getNewsByPath } from "@/utils/utils";
import Image from "next/image";
import { MoreNews } from "../api/news/more-news/route";

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

async function getFormatedCategoryNews(query: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/news/more-news?category=${query}`, { next: { revalidate: 60 } });

        if (!response.ok) {
            console.log('Error al obtener el cover de la home');
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

    const news: NewsType = await getNewsByPath(path);
    const moreNews: MoreNews[] = await getFormatedCategoryNews(decodeCategory);


    return (
        <section className="py-5 relative ">

            <div className="max-w-5xl mx-auto lg:mr-[240px] 2xl:mx-auto px-3">
                <div className="space-y-3">
                    <h3 className="text-muted-foreground font-bold ">{news.pretitle}</h3>
                    <h1 className="text-3xl font-semibold leading-none tracking-tight">{news.title}</h1>
                    <h2 className="text-muted-foreground">{news.summary}</h2>
                </div>
                <div className="flex flex-col md:flex-row mt-5 gap-4">


                    <div>
                        <div className="px-1">
                            <div className="relative -top-2">
                                {
                                    news.media?.portada.type !== 'video' ?
                                        <Image src={news.media?.portada.url as string} alt={news.title} width={400} height={300} placeholder="blur"
                                            blurDataURL={blurImage} className="object-cover rounded w-full aspect-video" />
                                        :
                                        <video width="400" height="300" controls={true} autoPlay loop className="w-full object-cover aspect-video rounded">
                                            <source src={news.media?.portada.url as string} type="video/mp4" />
                                            Tu navegador no soporta la etiqueta de video.
                                        </video>
                                }
                            </div>
                        </div>            <p>{news.media?.portada.caption}</p>
                        <div dangerouslySetInnerHTML={{ __html: news.content }} />
                    </div>
                    <MasNoticiasContainer category={decodeCategory} id={news._id as string} />
                </div>
            </div>
        </section>

    );
}
