import { MoreNews } from "@/app/api/news/more-news/route";
import SectionTitle from "../home/SectionTitle";
import CarouselMasNoticias from "./CarouselMasNoticias";

async function getFormatedCategoryNews(query: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/news/more-news?category=${query}`, { next: { revalidate: 60 } });

        if (!response.ok) {
            console.log('Error al obtener el cover de la home');
        }
        const { data } = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

interface Props {
    category: string;
    id: string;
}

export default async function MasNoticiasContainer
    ({ category, id }: Props) {

    const moreNews: MoreNews[] = await getFormatedCategoryNews(category);

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
