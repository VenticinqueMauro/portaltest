import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel";
import Image from "next/image";
import SectionTitle from "./SectionTitle";
import { blurImage } from "@/utils/blurImage";

interface MostRead {
    _id: string;
    pretitle: string;
    title: string;
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

    if (!mostReads.length) {
        return null;
    }

    return (
        <div className="max-w-6xl mx-auto py-20">
            <SectionTitle title='Las más leídas' />
            <Carousel className="px-3">
                <CarouselContent className="-ml-1 flex gap-4 ">
                    {mostReads?.map((item: MostRead) => (
                        <CarouselItem key={item._id} className="pl-2 md:pl-1 basis-auto lg:basis-1/5">
                            <div className="rounded flex flex-col justify-start gap-1">
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
                                                controls={false}
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
                                    <p className="text-sm font-bold text-muted-foreground">{item.pretitle}</p>
                                    <p className="font-semibold tracking-tight line-clamp-3">{item.title}</p>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}
