import { MoreNews } from '@/app/api/news/more-news/route';
import { Ad, NewsType } from '@/types/news.types';
import QuotesContainer from '../cotizaciones/Quotes.container';
import Navbar from '../navbar/Navbar';
import News from './News';
import PrincipalDesktop from '../home/publicidades/Principal.Desktop';
import Image from 'next/image';
import { blurImage } from '@/utils/blurImage';

interface Props {
    news: NewsType;
    category: string;
    moreNews: MoreNews[];
    ads?: Ad
}



export default async function Container({ news, category, moreNews, ads }: Props) {


    if (!news) {
        return null
    }

    return (
        <section>
            {
                <div className="p-3 md:p-0 md:py-5 bg-publicidad flex justify-center items-center relative">
                    {ads && ads.media?.desktop?.top?.url ? (
                        <Image
                            src={ads.media?.desktop?.top?.url}
                            alt="Publicidad principal"
                            width={970}
                            height={100}
                            placeholder="blur"
                            blurDataURL={blurImage}
                            priority
                            aria-label="Publicidad principal"
                            className='object-cover h-[100px] md:h-auto'
                        />
                    ) : (
                        <span className="text-sm text-muted-foreground flex items-center justify-center text-center">
                            Espacio publicitario disponible
                        </span>
                    )}
                </div>
            }
            <div className='sticky top-0 left-0 z-20'>
                <Navbar />
                <QuotesContainer />
            </div>
            <div className="py-5 relative ">
                <News news={news} category={category} moreNews={moreNews} ads={ads} />
            </div>
        </section>
    )
}
