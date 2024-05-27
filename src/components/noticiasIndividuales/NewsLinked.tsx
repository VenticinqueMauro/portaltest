'use client';

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
import { useEffect, useState } from "react";

async function getNewsLinked(ids: string[]) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/news/news-linked`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ids })
    });

    if (!response.ok) {
        throw new Error('Failed to fetch news');
    }
    return await response.json();
}

type NewsLinked = {
    category: string;
    media: {
        gallery: string[];
        portada: {
            publicId: string;
            url: string;
            type: string;
        };
        zona1: {
            publicId: string;
            url: string;
            type: string;
        };
    };
    path: string;
    pretitle: string;
    title: string;
    _id: string;
};

interface Props {
    newsLinked?: string[]
}

export default function NewsLinked({ newsLinked }: Props) {

    const [news, setNews] = useState<NewsLinked[] | []>([]);

    useEffect(() => {
        if (newsLinked && newsLinked.length > 0) {
            const fetchNews = async () => {
                const newsData = await getNewsLinked(newsLinked);
                setNews(newsData);
            };

            fetchNews();
        }
    }, [newsLinked]);

    if (!news.length) {
        return null;
    }

    return (
        <div className="py-10">
            <div className="max-w-6xl 2xl:mx-auto">
                <span className="italic tracking-tight text-2xl text-tdn relative inline-block">
                    <h2 className="pt-2 border-t border-tdn w-[200px] mb-5 relative">
                        Notas relacionadas
                        <span className="w-[40px] h-1 bg-tdn block absolute top-0 left-0"></span>
                    </h2>
                </span>
            </div>
            <div className="px-14 md:px-0">
                <Carousel className="max-w-5xl mx-auto">
                    <CarouselContent className="-ml-1 flex gap-4 ">
                        {news.map((item: NewsLinked) => (
                            <CarouselItem key={item._id} className="pl-2 md:pl-1 lg:basis-1/5 md:hover:shadow md:hover:bg-gray-50 transition-all duration-100 max-w-[400px]">
                                <Link href={`/${item.category}/${item.path}`} className="rounded flex flex-col justify-start gap-1">
                                    <div className="px-1">
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
                                        <p className="text-sm font-bold text-muted-foreground">{item.pretitle}</p>
                                        <p className="font-semibold tracking-tight line-clamp-3">{item.title}</p>
                                    </div>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {
                        news.length > 1 &&
                        <>
                            <CarouselPrevious className="" />
                            <CarouselNext className="" />
                        </>
                    }
                </Carousel>
            </div>

        </div>
    )
}
