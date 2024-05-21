import { HomePageDocument } from "@/models/home";
import { Ads } from "@/types/news.types";
import SuperiorDesktop from "../publicidades/Superior.Desktop";
import SectionTitle from "../SectionTitle";
import GridDeNoticiasCategory from "./GridDeNoticias.category";
import LateralDesktop from "../publicidades/Lateral.Desktop";

interface Props {
    homeNews: HomePageDocument;
    ads: Ads;
}
export default function ContainerSectionCategory({ homeNews, ads }: Props) {

    console.log(homeNews)

    return (
        <section className="relative">
            {/* PUBLICIDAD SUPERIOR DESKTOP */}
            <SuperiorDesktop url={ads.home.politica?.media?.desktop?.top?.url as string} />
            {/* TITULO DE SECCION */}
            <SectionTitle title="Política" />
            {/* GRILLA DE NOTICIAS  */}
            <GridDeNoticiasCategory homeNews={homeNews} ads={ads} />
            {/* PUBLICIDAD LATERAL */}
            <LateralDesktop url={ads.home.politica?.media?.desktop?.side?.url as string} />
        </section>
    )
}
