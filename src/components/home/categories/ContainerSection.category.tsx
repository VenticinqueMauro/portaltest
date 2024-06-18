import { Ads, MainNews, SectionNewsMap, SidebarItem } from "@/types/news.types";
import SuperiorDesktop from "../publicidades/Superior.Desktop";
import SectionTitle from "../SectionTitle";
import GridDeNoticiasCategory from "./GridDeNoticias.category";
import LateralDesktop from "../publicidades/Lateral.Desktop";
import { MoreNewsData } from "@/app/api/news/more-news/route";
import dynamic from "next/dynamic";

const MoreNewsSlider = dynamic(() => import("./MoreNewsSlider"));

interface Props {
    sectionData: {
        mainNews: MainNews;
        gridNews: SidebarItem[];
    };
    sectionTitle: string;
    ads: Ads;
    moreNews?: MoreNewsData;
}

export default function ContainerSectionCategory({ sectionData, sectionTitle, moreNews, ads }: Props) {

    if (!sectionData || !sectionData.mainNews || !sectionData.mainNews.id) {
        return null;
    }

    const title = sectionTitle === 'politica' ? 'Política' :
        sectionTitle === 'eco & negocios' ? 'Economía' :
            sectionTitle === 'portalcana' ? 'Portal de la caña' :
                sectionTitle === 'deportes' ? 'Deportes' :
                    sectionTitle === 'tendencias' ? 'Tendencias' :
                        sectionTitle;

    return (
        <section className="relative ">
            {/* PUBLICIDAD SUPERIOR DESKTOP */}
            <SuperiorDesktop
                url={ads.home[sectionTitle as keyof SectionNewsMap]?.media?.desktop?.top?.url as string ?? ''}
                link={ads.home[sectionTitle as keyof SectionNewsMap]?.media?.desktop?.top?.link as string ?? ''}
            />
            {/* TITULO DE SECCION */}
            <div className="py-10">
                <SectionTitle title={title} />
            </div>
            {/* GRILLA DE NOTICIAS  */}
            <GridDeNoticiasCategory sectionData={sectionData} ads={ads} sectionTitle={sectionTitle} />
            {/* MAS NOTICIAS  */}
            <MoreNewsSlider title={title} moreNews={moreNews} category={sectionTitle} sectionData={sectionData} />
            {/* PUBLICIDAD LATERAL */}
            <LateralDesktop
                url={ads.home[sectionTitle as keyof SectionNewsMap]?.media?.desktop?.side?.url as string}
                link={ads.home[sectionTitle as keyof SectionNewsMap]?.media?.desktop?.side?.link as string}
            />
        </section>
    )
}
