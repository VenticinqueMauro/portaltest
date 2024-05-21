import { HomePageDocument } from "@/models/home";
import InferiorDesktop from "../publicidades/Inferior.Desktop";
import NoticiaPrincipalCategory from "./NoticiaPrincipal.category";
import NoticiasGridCategory from "./NoticiasGrid.category";
import { Ads, MainNews, SectionNewsMap, SidebarItem } from "@/types/news.types";

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
        <div className="max-w-6xl mx-auto grid grid-cols-12 gap-4 px-3">
            <NoticiaPrincipalCategory
                image={{ type: sectionData.mainNews.media.type as 'image' | 'video', url: sectionData.mainNews.media.url }}
                pretitle={sectionData.mainNews.pretitle}
                title={sectionData.mainNews.title}
            />

            <div className="col-span-4 min-h-full">
                <div className="grid grid-cols-12 gap-4 h-full">
                    {
                        sectionData.gridNews.map((item, index) => (
                            <NoticiasGridCategory
                                key={item.id}
                                image={{ type: item.media.type as 'image' | 'video', url: item.media.url }}
                                pretitle={item.pretitle}
                                title={item.title}
                            />
                        ))
                    }
                </div>
            </div>

            {/* PUBLICIDAD INFERIOR DESKTOP  */}
            <InferiorDesktop url={ads.home[sectionTitle as keyof SectionNewsMap]?.media?.desktop?.bottom?.url as string} />
        </div>
    )
}
