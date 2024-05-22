import React from 'react';
import SectionTitle from '../SectionTitle';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Image from 'next/image';
import { blurImage } from '@/utils/blurImage';
import { MoreNews, MoreNewsData } from '@/app/api/news/more-news/route';
import { MainNews, SectionNewsMap, SidebarItem } from '@/types/news.types';

interface Props {
    title: string;
    moreNews?: MoreNewsData;
    category: string;
    sectionData: {
        mainNews: MainNews;
        gridNews: SidebarItem[];
    };
}

const MoreNewsSlider: React.FC<Props> = ({ title, moreNews, category, sectionData }) => {
    if (!moreNews) {
        return null;
    }

    const news = moreNews[category as keyof SectionNewsMap];
    const allNews = [sectionData.mainNews, ...sectionData.gridNews];

    const filteredNews = news.filter(item => {
        return !allNews.some(newsItem => newsItem.id === item._id);
    });

    if (!filteredNews.length) {
        return null;
    }

    return (
        <div className="max-w-6xl mx-auto py-20">
            <SectionTitle title={`Más de ${title}`} />
            <Carousel className="px-3">
                <CarouselContent className="-ml-1 flex gap-4 ">
                    {filteredNews.map((item: MoreNews) => (
                        <CarouselItem key={item._id} className="pl-2 md:pl-1 basis-auto lg:basis-1/5">
                            <div className="rounded flex flex-col justify-start gap-1">
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
                                            controls={false}
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
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}

export default MoreNewsSlider;
