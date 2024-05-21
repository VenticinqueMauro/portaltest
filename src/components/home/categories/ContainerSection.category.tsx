import { Ads, MainNews, SectionNewsMap, SidebarItem } from "@/types/news.types";
import SuperiorDesktop from "../publicidades/Superior.Desktop";
import SectionTitle from "../SectionTitle";
import GridDeNoticiasCategory from "./GridDeNoticias.category";
import LateralDesktop from "../publicidades/Lateral.Desktop";

interface Props {
    sectionData: {
        mainNews: MainNews;
        gridNews: SidebarItem[];
    };
    sectionTitle: string;
    ads: Ads;
}

export default function ContainerSectionCategory({ sectionData, sectionTitle, ads }: Props) {

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
            <SuperiorDesktop url={ads.home[sectionTitle as keyof SectionNewsMap]?.media?.desktop?.top?.url as string} />
            {/* TITULO DE SECCION */}
            <SectionTitle title={title} />
            {/* GRILLA DE NOTICIAS  */}
            <GridDeNoticiasCategory sectionData={sectionData} ads={ads} sectionTitle={sectionTitle} />
            {/* PUBLICIDAD LATERAL */}
            <LateralDesktop url={ads.home[sectionTitle as keyof SectionNewsMap]?.media?.desktop?.side?.url as string} />
        </section>
    )
}
