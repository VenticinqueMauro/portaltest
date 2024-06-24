import { Ads, MainNews, SectionNewsMap, SidebarItem } from "@/types/news.types";
import InferiorDesktop from "../publicidades/Inferior.Desktop";
import NoticiaPrincipalCategory from "./NoticiaPrincipal.category";
import NoticiasGridCategory from "./NoticiasGrid.category";
import InferiorMobile from "../publicidades/Inferior.Mobile";
import CentralMobile from "../publicidades/Central.Mobile";

interface Props {
    sectionData: {
        mainNews: MainNews;
        gridNews: SidebarItem[];
    };
    ads: Ads;
    sectionTitle: string;
}

export default function GridDeNoticiasCategory({ sectionData, ads, sectionTitle }: Props) {

    return (
        <div className="min-[1760px]:max-w-7xl min-[1760px]:mx-auto grid grid-cols-12 gap-4 px-3 md:mr-[240px]">
            <NoticiaPrincipalCategory
                image={{ type: sectionData.mainNews.media.type as 'image' | 'video', url: sectionData.mainNews.media.url }}
                pretitle={sectionData.mainNews.pretitle}
                title={sectionData.mainNews.title}
                category={sectionData.mainNews.category}
                path={sectionData.mainNews.path!}
                id={sectionData.mainNews.id}
            />
            {/* PUBLICIDAD CENTRAL MOBILE  */}
            <CentralMobile
                url={ads.home[sectionTitle as keyof SectionNewsMap]?.media?.mobile?.side?.url as string}
                link={ads.home[sectionTitle as keyof SectionNewsMap]?.media?.mobile?.side?.link as string}
            />
            <div className="col-span-12 lg:col-span-4 min-h-full">
                <div className="grid grid-cols-12 gap-4 h-full">
                    {
                        sectionData.gridNews.map((item, index) => (
                            <NoticiasGridCategory
                                key={item.id}
                                image={{ type: item.media.type as 'image' | 'video', url: item.media.url }}
                                pretitle={item.pretitle}
                                title={item.title}
                                category={item.category}
                                path={item.path!}
                                id={item.id}
                            />
                        ))
                    }
                </div>
            </div>

            {/* PUBLICIDAD INFERIOR DESKTOP  */}
            <InferiorDesktop
                url={ads.home[sectionTitle as keyof SectionNewsMap]?.media?.desktop?.bottom?.url as string}
                link={ads.home[sectionTitle as keyof SectionNewsMap]?.media?.desktop?.bottom?.link as string}
            />
            {/* PUBLICIDAD INFERIOR MOBILE */}
            <InferiorMobile
                url={ads.home[sectionTitle as keyof SectionNewsMap]?.media?.mobile?.bottom?.url as string ?? ''}
                link={ads.home[sectionTitle as keyof SectionNewsMap]?.media?.mobile?.bottom?.link as string ?? ''}
            />
        </div>
    )
}
