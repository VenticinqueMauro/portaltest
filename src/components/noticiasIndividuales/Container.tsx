import { NewsType } from '@/types/news.types';
import MasNoticiasContainer from './MasNoticiasContainer';
import News from './News';

interface Props {
    news: NewsType;
    category: string;
}

export default function Container({ news, category }: Props) {
    return (
        <section className="py-5 relative ">
            <News news={news}>
                <MasNoticiasContainer category={category} id={news._id as string} />
            </News>
        </section>
    )
}
