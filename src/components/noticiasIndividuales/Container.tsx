import { MoreNews } from '@/app/api/news/more-news/route';
import { Ad, NewsType } from '@/types/news.types';
import QuotesContainer from '../cotizaciones/Quotes.container';
import Navbar from '../navbar/Navbar';
import News from './News';
import PrincipalDesktop from '../home/publicidades/Principal.Desktop';

interface Props {
    news: NewsType;
    category: string;
    moreNews: MoreNews[]
}

async function getAds(category: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/ads?category=${category}`, { next: { revalidate: 60 } });

        if (!response.ok) {
            console.log('Error al obtener publicidades');
        }
        const { data } = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

export default async function Container({ news, category, moreNews }: Props) {

    const ads: Ad = await getAds(category);

    if (!news) {
        return null
    }

    return (
        <section>
            {
                ads.media?.desktop?.top?.url &&
                <PrincipalDesktop url={ads.media?.desktop?.top?.url} />
            }
            <div className='sticky top-0 left-0 z-20'>
                <Navbar />
                <QuotesContainer />
            </div>
            <div className="py-5 relative ">
                <News news={news} category={category} moreNews={moreNews} />
            </div>
        </section>
    )
}
