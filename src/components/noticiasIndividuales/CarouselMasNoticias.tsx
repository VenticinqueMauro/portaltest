import { MoreNews } from "@/app/api/news/more-news/route";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import { blurImage } from "@/utils/blurImage";
import Image from "next/image";
import Link from "next/link";

interface Props {
    id: string;
    moreNews: MoreNews[]
}

export default function CarouselMasNoticias({ id, moreNews }: Props) {


    if (!moreNews || !moreNews.length) {
        return null;
    }

    return (
        <div className="px-14 md:px-0">
            {/* DESKTOP  */}
            <Carousel orientation={'vertical'} className="hidden md:block md:px-3">
                <CarouselContent className={"space-y-3 -ml-1 flex gap-4"}>
                    {moreNews.slice(0.4).map((item: MoreNews, index) => (
                        <CarouselItem key={item._id} className="pl-2 md:pl-1 lg:basis-1/5  md:hover:bg-gray-50 transition-all duration-100 cursor-pointer max-w-[220px]">
                            <Link href={`${item.category}/${item.path}`} className="rounded flex flex-col justify-start gap-1">
                                <div className={`${index === 0 ? 'block' : 'hidden'} px-1`}>
                                    {item.media.portada.type !== 'video' ? (
                                        <Image
                                            src={item.media.portada.url}
                                            alt={item.title}
                                            width={400}
                                            height={300}
                                            className="rounded aspect-video object-cover"
                                            placeholder="blur"
                                            blurDataURL={blurImage}
                                        />
                                    ) : (
                                        <video
                                            width="400"
                                            height="300"
                                            controls={true}
                                            autoPlay
                                            loop
                                            className="w-full object-cover aspect-video rounded"
                                        >
                                            <source src={item.media.portada.url} type="video/mp4" />
                                            Tu navegador no soporta la etiqueta de video.
                                        </video>
                                    )}
                                </div>
                                <div className="text-start px-1">
                                    <p className="text-xs font-bold text-muted-foreground">{item.pretitle}</p>
                                    <p className="text-sm font-semibold tracking-tight line-clamp-3">{item.title}</p>
                                </div>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="md:hidden" />
                <CarouselNext className="md:hidden" />
            </Carousel>
            {/* MOBILE */}
            <Carousel orientation={'horizontal'} className="md:hidden md:px-3">
                <CarouselContent className={"-ml-1 flex gap-4"}>
                    {moreNews.slice(0, 4).map((item: MoreNews, index) => (
                        <CarouselItem key={item._id} className="pl-2 md:pl-1 lg:basis-1/5  md:hover:bg-gray-50 transition-all duration-100 cursor-pointer max-w-[220px]">
                            <Link href={`${item.category}/${item.path}`} className="rounded flex flex-col justify-start gap-1">
                                <div className={`px-1`}>
                                    {item.media.portada.type !== 'video' ? (
                                        <Image
                                            src={item.media.portada.url}
                                            alt={item.title}
                                            width={400}
                                            height={300}
                                            className="rounded aspect-video object-cover"
                                            placeholder="blur"
                                            blurDataURL={blurImage}
                                        />
                                    ) : (
                                        <video
                                            width="400"
                                            height="300"
                                            controls={true}
                                            autoPlay
                                            loop
                                            className="w-full object-cover aspect-video rounded"
                                        >
                                            <source src={item.media.portada.url} type="video/mp4" />
                                            Tu navegador no soporta la etiqueta de video.
                                        </video>
                                    )}
                                </div>
                                <div className="text-start px-1">
                                    <p className="text-xs font-bold text-muted-foreground">{item.pretitle}</p>
                                    <p className="text-sm font-semibold tracking-tight line-clamp-3">{item.title}</p>
                                </div>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="md:hidden" />
                <CarouselNext className="md:hidden" />
            </Carousel>
        </div>
    );
}
