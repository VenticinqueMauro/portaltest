import { MoreNews } from "@/app/api/news/more-news/route";
import SectionTitle from "../home/SectionTitle";
import CarouselMasNoticias from "./CarouselMasNoticias";
import { Ad } from "@/types/news.types";
import LateralDesktop from "../home/publicidades/Lateral.Desktop";
import { blurImage } from "@/utils/blurImage";
import Image from "next/image";

interface Props {
    category: string;
    id: string;
    moreNews: MoreNews[];
    ads?: Ad
}

export default async function MasNoticiasContainer({ category, id, moreNews, ads }: Props) {

    const filteredMoreNews = moreNews.filter(item => item._id !== id)

    if (!filteredMoreNews.length) {
        return null
    }

    return (
        <div className="min-h-full relative">
            <div className="max-w-6xl pt-5 md:pt-0 2xl:mx-auto">
                <span className="italic tracking-tight text-2xl text-tdn relative inline-block">
                    <h2 className="pt-2 border-t border-tdn w-[200px] mb-5 relative">
                        {`Más de ${category == 'eco & negocios' ? 'economía' : category}`}
                        <span className="w-[40px] h-1 bg-tdn block absolute top-0 left-0"></span>
                    </h2>
                </span>
            </div>
            <CarouselMasNoticias id={id} moreNews={filteredMoreNews} />
            <div className="absolute top-0 right-0 h-full">
                <div className="hidden md:flex justify-center items-center bg-publicidad p-5 sticky top-40 right-0 mt-[600px]">
                    {ads?.media?.desktop?.side?.url ? (
                        <Image
                            src={ads?.media?.desktop?.side?.url}
                            alt="Publicidad lateral"
                            width={200}
                            height={500}
                            placeholder="blur"
                            blurDataURL={blurImage}
                            priority
                            aria-label="Publicidad lateral"
                        />
                    ) : (
                        <span className="w-[200px] h-[500px] text-sm text-muted-foreground flex items-center justify-center text-center">
                            Espacio publicitario disponible
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
