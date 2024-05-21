import { HomePageDocument } from "@/models/home";
import InferiorDesktop from "../publicidades/Inferior.Desktop";
import NoticiaPrincipalCategory from "./NoticiaPrincipal.category";
import NoticiasGridCategory from "./NoticiasGrid.category";
import { Ads } from "@/types/news.types";

interface Props {
    homeNews: HomePageDocument;
    ads: Ads;
}

export default function GridDeNoticiasCategory({ homeNews, ads }: Props) {


    return (
        <div className="max-w-6xl mx-auto grid grid-cols-12 gap-4 px-3">
            <NoticiaPrincipalCategory
                image={{ type: homeNews.sections.politica.mainNews.media.type as 'image' | 'video', url: homeNews.sections.politica.mainNews.media.url }}
                pretitle={homeNews.sections.politica.mainNews.pretitle}
                title={homeNews.sections.politica.mainNews.title}
            />

            <div className="col-span-4 min-h-full">
                <div className="grid grid-cols-12 gap-4 h-full">
                    {
                        homeNews.sections.politica.gridNews.map((item, index) => (
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
            <InferiorDesktop url={ads.home.politica?.media?.desktop?.bottom?.url as string} />
        </div>
    )
}
