import React from 'react'
import SectionTitle from '../home/SectionTitle'
import NoticiaPrincipalCategory from '../home/categories/NoticiaPrincipal.category'
import NoticiasGridCategory from '../home/categories/NoticiasGrid.category'
import InferiorDesktop from '../home/publicidades/Inferior.Desktop'
import NewsCardByCategory from './NewsCardByCategory'
import { Ads, MainNews, SidebarItem } from '@/types/news.types'
import LateralDesktop from '../home/publicidades/Lateral.Desktop'

interface Props {
    sectionTitle: string;
    allNews: MainNews[];
    news: {
        mainNews: MainNews;
        gridNews: SidebarItem[];
    };
    ads: any;
    filteredNews: MainNews[];
}

export default function PortadaPrincipal({ sectionTitle, allNews, news, ads, filteredNews }: Props) {

    return (
        <div className="py-10">
            <div className="relative">
                <SectionTitle title={sectionTitle} />
                {
                    allNews.length &&
                    <div className="max-w-7xl 2xl:mx-auto grid grid-cols-12 gap-4 px-3 md:lg:mr-[240px]">
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
                <LateralDesktop url={ads?.media?.desktop?.side?.url || ''} />
                <NewsCardByCategory news={filteredNews} />
            </div>
        </div>
    )
}
