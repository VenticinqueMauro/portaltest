import { MoreNews } from "@/app/api/news/more-news/route";
import { NewsType } from "@/types/news.types";
import { blurImage } from "@/utils/blurImage";
import Image from "next/image";
import MasNoticiasContainer from "./MasNoticiasContainer";
import dynamic from "next/dynamic";


const NewsLinked = dynamic(() => import("./NewsLinked"), { ssr: false });

interface Props {
    news: NewsType;
    category: string;
    moreNews: MoreNews[]
}

export default function News({ news, category, moreNews }: Props) {

    return (
        <div className="max-w-5xl mx-auto lg:mr-[240px] 2xl:mx-auto px-3">
            <div className="space-y-3">
                <h3 className="text-muted-foreground font-bold ">{news.pretitle}</h3>
                <h1 className="text-3xl font-semibold leading-none tracking-tight">{news.title}</h1>
                <h2 className="text-muted-foreground">{news.summary}</h2>
            </div>
            <div className="flex flex-col md:flex-row mt-5 gap-4">
                <div className="grow">
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
                {/* CAROUSEL MAS NOTICIAS  */}
                <MasNoticiasContainer moreNews={moreNews} category={category} id={news._id as string} />
            </div>
            <NewsLinked newsLinked={news.newsLinked} />
        </div>
    )
}
