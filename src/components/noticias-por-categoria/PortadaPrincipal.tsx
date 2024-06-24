import React from 'react'
import SectionTitle from '../home/SectionTitle'
import NoticiaPrincipalCategory from '../home/categories/NoticiaPrincipal.category'
import NoticiasGridCategory from '../home/categories/NoticiasGrid.category'
import InferiorDesktop from '../home/publicidades/Inferior.Desktop'
import NewsCardByCategory from './NewsCardByCategory'
import { Ads, MainNews, SidebarItem } from '@/types/news.types'
import LateralDesktop from '../home/publicidades/Lateral.Desktop'
import CentralMobile from '../home/publicidades/Central.Mobile'
import InferiorMobile from '../home/publicidades/Inferior.Mobile'

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
                    <div className="min-[1760px]:max-w-7xl min-[1760px]:mx-auto grid grid-cols-12 gap-4 px-3 md:mr-[240px]">
                        <NoticiaPrincipalCategory
                            image={{ type: news.mainNews.media.type as 'image' | 'video', url: news.mainNews.media.url }}
                            pretitle={news.mainNews.pretitle}
                            title={news.mainNews.title}
                            category={news.mainNews.category}
                            path={news.mainNews.path!}
                            id={news.mainNews.id}
                        />

                        {/* PUBLICIDAD CENTRAL MOBILE  */}
                        <CentralMobile
                            url={ads?.media?.mobile?.side?.url as string}
                            link={ads?.media?.mobile?.side?.link as string}
                        />

                        <div className="col-span-12 lg:col-span-4 min-h-full pt-3 md:pt-0">
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
                        <InferiorDesktop
                            url={ads?.media?.desktop?.bottom?.url || ''}
                            link={ads?.media?.desktop?.bottom?.link || ''}
                        />
                    </div>
                }
                {/* PUBLICIDAD LATERAL DESKTOP  */}
                <LateralDesktop
                    url={ads?.media?.desktop?.side?.url || ''}
                    link={ads?.media?.desktop?.side?.link || ''}
                />

                {/* PUBLICIDAD INFERIOR MOBILE  */}
                <div className='pt-7 pb-4 mx-3 md:hidden'>
                    <InferiorMobile
                        url={ads?.media?.mobile?.bottom?.url as string}
                        link={ads?.media?.mobile?.bottom?.link as string}
                    />
                </div>
                <NewsCardByCategory news={filteredNews} />
            </div>
        </div>
    )
}
