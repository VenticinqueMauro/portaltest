import { MoreNews } from '@/app/api/news/more-news/route';
import { Ad, NewsType } from '@/types/news.types';
import QuotesContainer from '../cotizaciones/Quotes.container';
import Navbar from '../navbar/Navbar';
import PublicidadSuperior from '../noticias-por-categoria/publicidades/PublicidadSuperior';
import News from './News';

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
            <PublicidadSuperior ads={ads} />
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
