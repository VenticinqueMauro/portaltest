import { MoreNews } from "@/app/api/news/more-news/route";
import { Ad, NewsType } from "@/types/news.types";
import { blurImage } from "@/utils/blurImage";
import dynamic from "next/dynamic";
import Image from "next/image";
import InferiorDesktop from "../home/publicidades/Inferior.Desktop";
import { Separator } from "../ui/separator";
import BreadCrumb from "./BreadCrumb";
import { CreatedAndUpdated } from "./CreatedAndUpdated";
import MasNoticiasContainer from "./MasNoticiasContainer";
import Tags from "./Tags";
import { fontLato, fontMerriweather } from "@/app/fonts";
const CommentsContainer = dynamic(() => import("./CommentsContainer"), { ssr: false });

const NewsLinked = dynamic(() => import("./NewsLinked"), { ssr: false });
const Gallery = dynamic(() => import("./Gallery"), { ssr: false });

interface Props {
    news: NewsType;
    category: string;
    moreNews: MoreNews[];
    ads?: Ad
}

export default function News({ news, category, moreNews, ads }: Props) {

    const showAuthor = !news.showAuthor ? 'Tendencia de noticias' : news.author;


    return (
        <div className="max-w-7xl mx-auto px-3">

            {/* BREADCRUMB  */}
            <BreadCrumb category={category} />

            <div className="space-y-3">
                <h3 className={`${fontLato.className} text-muted-foreground font-medium`}>{news.pretitle}</h3>
                <h1 className="text-3xl md:text-4xl font-bold leading-none tracking-tight">{news.title}</h1>
                <h2 className={`${fontMerriweather.className} text-lg`}>{news.summary}</h2>
                <h3 className="text-muted-foreground text-sm">Por <b className="text-foreground capitalize">{showAuthor}</b></h3>
                <Separator />
            </div>
            <div className="flex flex-col md:flex-row mt-3 gap-4 relative">
                <div className="grow">
                    <CreatedAndUpdated createdAt={news.createdAt} updatedAt={news.updatedAt} />
                    <div>
                        <div className="relative -top-2">
                            {
                                news.media?.portada.type !== 'video' ?
                                    <Image src={news.media?.portada.url as string} alt={news.title} width={856} height={422} placeholder="blur"
                                        blurDataURL={blurImage} className="object-cover rounded w-full aspect-video" />
                                    :
                                    <video width="400" height="300" controls={true} autoPlay loop className="w-full object-cover aspect-video rounded">
                                        <source src={news.media?.portada.url as string} type="video/mp4" />
                                        Tu navegador no soporta la etiqueta de video.
                                    </video>
                            }
                        </div>
                    </div>
                    <p className="text-xs mb-2 text-muted-foreground">{news.media?.portada.caption}</p>
                    <div className="pb-7" dangerouslySetInnerHTML={{ __html: news.content }} />
                    <InferiorDesktop url={ads?.media?.desktop?.bottom?.url || ''} />
                    <Gallery gallery={news.media?.gallery} />
                    <Tags tags={news.tags} />
                    <CommentsContainer comments={news.comments} id={news._id as string} category={news.category} />
                </div>
                <Separator orientation='vertical' />
                {/* CAROUSEL MAS NOTICIAS  */}
                <MasNoticiasContainer moreNews={moreNews} category={category} id={news._id as string} ads={ads} />
            </div>
            <NewsLinked newsLinked={news.newsLinked} />
        </div>
    )
}
