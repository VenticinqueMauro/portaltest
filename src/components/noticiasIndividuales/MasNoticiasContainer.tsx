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
            <div className="max-w-6xl 2xl:mx-auto">
                <span className="italic tracking-tight text-2xl text-tdn relative inline-block">
                    <h2 className="pt-2 border-t border-tdn w-[200px] mb-5 relative">
                        {`Más de ${category == 'eco & negocios' ? 'economía' : category}`}
                        <span className="w-[40px] h-1 bg-tdn block absolute top-0 left-0"></span>
                    </h2>
                </span>
            </div>
            <CarouselMasNoticias id={id} moreNews={filteredMoreNews} />
            {/* <LateralDesktop url={moreNews[0].media.portada.url as string} /> */}
        </div>
    )
}
