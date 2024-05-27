import { MoreNews } from '@/app/api/news/more-news/route';
import { NewsType } from '@/types/news.types';
import News from './News';

interface Props {
    news: NewsType;
    category: string;
    moreNews: MoreNews[]
}

export default function Container({ news, category, moreNews }: Props) {

    if (!news) {
        return null
    }

    return (
        <section className="py-5 relative ">
            <News news={news} category={category} moreNews={moreNews} />
        </section>
    )
}
