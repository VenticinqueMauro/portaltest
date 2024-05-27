import { MoreNews } from "@/app/api/news/more-news/route";
import SectionTitle from "../home/SectionTitle";
import CarouselMasNoticias from "./CarouselMasNoticias";

interface Props {
    category: string;
    id: string;
    moreNews: MoreNews[]
}

export default async function MasNoticiasContainer({ category, id, moreNews }: Props) {

    const filteredMoreNews = moreNews.filter(item => item._id !== id)

    if (!filteredMoreNews.length) {
        return null
    }

    return (
        <div>
            <SectionTitle title={`Más de ${category == 'eco & negocios' ? 'economía' : category}`} />
            <CarouselMasNoticias id={id} moreNews={filteredMoreNews} />
            {/* <LateralDesktop url={moreNews[0].media.portada.url as string} /> */}
        </div>
    )
}
