import { HomePageDocument } from "@/models/home";
import { Ads, SectionNewsMap } from "@/types/news.types";
import LateralDerecho from "./LateralDerecho";
import LateralIzquierdo from "./LateralIzquierdo";
import MasLeidas from "./MasLeidas";
import NoticiaCentral from "./NoticiaCentral";
import ContainerSectionCategory from "./categories/ContainerSection.category";
import LateralDesktop from "./publicidades/Lateral.Desktop";
import { MoreNewsData } from "@/app/api/news/more-news/route";

export async function getCover() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/edit-home/cover`, { next: { revalidate: 60 } });

        if (!response.ok) {
            console.log('Error al obtener el cover de la home');
        }

        return await response.json();
    } catch (error) {
        console.log(error)
    }
}

export async function getFormatedCategoryNews(): Promise<MoreNewsData | undefined> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/news/more-news`, { next: { revalidate: 60 } });

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
    ads: Ads
}

export default async function ContainerHome({ ads }: Props) {

    const { data: homeNews }: { data: HomePageDocument } = await getCover();

    const moreNews = await getFormatedCategoryNews();

    const sections = Object.keys(homeNews.sections);

    return (
        <main className="py-10">
            {/* NOTICIAS PRINCIPALES */}
            <section className="relative">
                <div className="max-w-7xl lg:mr-[240px] 2xl:mx-auto grid grid-cols-12 gap-4 px-3">

                    {/* CENTRAL  */}
                    <NoticiaCentral
                        image={{ type: homeNews.cover.mainNews.media.type as 'image' | 'video', url: homeNews.cover.mainNews.media.url }}
                        pretitle={homeNews.cover.mainNews.pretitle}
                        title={homeNews.cover.mainNews.title}
                        summary={homeNews.cover.mainNews.summary}
                        category={homeNews.cover.mainNews.category}
                        path={homeNews.cover.mainNews.path!}
                    />

                    {/* LATERAL DERECHO  */}
                    <div className="col-span-12 lg:col-span-3  flex flex-col items-center justify-between">
                        {homeNews.cover.rightSidebar.map((item, index) => (
                            <LateralDerecho
                                key={item.id}
                                image={{ type: item.media.type as 'image' | 'video', url: item.media.url }}
                                pretitle={item.pretitle}
                                title={item.title}
                                category={item.category}
                                path={item.path!}
                                index={index}
                            />
                        ))}
                    </div>

                    {/* LATERAL IZQUIERDO  */}
                    <div className="row-start-3 col-span-12 lg:col-span-2 lg:col-start-1 lg:order-1 lg:row-start-1 flex flex-col justify-between">
                        {homeNews.cover.leftSidebar.map((item, index) => (
                            <LateralIzquierdo
                                key={item.id}
                                image={{ type: item.media.type as 'image' | 'video', url: item.media.url }}
                                pretitle={item.pretitle}
                                title={item.title}
                                category={item.category}
                                path={item.path!}
                                index={index}
                                isLast={index === homeNews.cover.leftSidebar.length - 1}
                            />
                        ))}
                    </div>
                </div>

                <MasLeidas />

                {/* PUBLICIDAD LATERAL */}
                <LateralDesktop url={ads.home.portada?.media?.desktop?.side?.url as string} />
            </section>

            {sections.map((sectionKey) => {
                const sectionData = homeNews.sections[sectionKey as keyof SectionNewsMap];
                const sectionTitle = sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1);

                return (
                    <ContainerSectionCategory
                        key={sectionKey}
                        sectionData={sectionData}
                        sectionTitle={sectionTitle.toLowerCase()}
                        moreNews={moreNews}
                        ads={ads}
                    />
                );
            })}
        </main>
    )
}
