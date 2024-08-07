import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import Image from "next/image";
import SectionTitle from "./SectionTitle";
import { blurImage } from "@/utils/blurImage";
import Link from "next/link";
import { fontLato } from "@/app/fonts";

interface MostRead {
    _id: string;
    pretitle: string;
    title: string;
    category: string;
    path: string;
    media: {
        portada: {
            publicId: string;
            url: string;
            type: 'image' | 'video'
        }
    }
}

async function getMostReads() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/newsstatics`, { next: { revalidate: 60 } });

        if (!response.ok) {
            console.log('Error al obtener las noticias mas leidas');
        }
        const { data } = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

export default async function MasLeidas() {

    const mostReads: MostRead[] = await getMostReads();

    if (!mostReads || !mostReads.length) {
        return null;
    }

    return (
        <div className="min-[1760px]:max-w-7xl min-[1760px]:mx-auto pt-7 md:pt-0 md:mr-[240px] lg:py-20">
            <SectionTitle title='Las más leídas' />
            <div className="px-14">
                <Carousel className="max-w-7xl mx-auto">
                    <CarouselContent className="-ml-1 flex gap-4">
                        {mostReads?.map((item: MostRead) => (
                            <CarouselItem key={item._id} className="pl-2 md:pl-1 lg:basis-1/5 md:hover:shadow md:hover:bg-gray-50 transition-all duration-100 max-w-[400px]">
                                <Link href={`${item.category}/${item.path}`} className="rounded flex flex-col justify-start gap-1">
                                    <div className="px-1">
                                        {(
                                            item.media.portada.type !== 'video' ? (
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
                                            )
                                        )}
                                    </div>
                                    <div className="text-start px-1">
                                        <p className={`${fontLato.className} text-sm font-medium text-muted-foreground`}>{item.pretitle}</p>
                                        <p className="font-semibold tracking-tight line-clamp-3">{item.title}</p>
                                    </div>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="" />
                    <CarouselNext className="" />
                </Carousel>
            </div>
        </div>
    )
}
