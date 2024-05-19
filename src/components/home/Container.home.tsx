import { HomePageDocument } from "@/models/home";
import LateralDerecho from "./LateralDerecho";
import LateralIzquierdo from "./LateralIzquierdo";
import NoticiaCentral from "./NoticiaCentral";

async function getCover() {
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

export default async function ContainerHome() {

    const { data: homeNews }: { data: HomePageDocument } = await getCover();

    return (
        <main className="py-10">
            {/* COVER PORTADA */}
            <div className="max-w-6xl mx-auto grid grid-cols-12 gap-4 ">

                {/* CENTRAL  */}
                <NoticiaCentral
                    image={{ type: homeNews.cover.mainNews.media.type as 'image' | 'video', url: homeNews.cover.mainNews.media.url }}
                    pretitle={homeNews.cover.mainNews.pretitle}
                    title={homeNews.cover.mainNews.title}
                    summary={homeNews.cover.mainNews.summary}
                />

                {/* LATERAL DERECHO  */}
                <div className="col-span-2  flex flex-col ">
                    {homeNews.cover.rightSidebar.map((item, index) => (
                        <LateralDerecho key={item.id} image={{ type: item.media.type as 'image' | 'video', url: item.media.url }} pretitle={item.pretitle} title={item.title} index={index} />
                    ))}
                </div>

                {/* LATERAL IZQUIERDO  */}
                <div className="col-span-2 col-start-1 order-1 row-start-1 flex flex-col justify-between">
                    {homeNews.cover.leftSidebar.map((item, index) => (
                        <LateralIzquierdo
                            key={item.id}
                            image={{ type: item.media.type as 'image' | 'video', url: item.media.url }}
                            pretitle={item.pretitle}
                            title={item.title}
                            index={index}
                            isLast={index === homeNews.cover.leftSidebar.length - 1}
                        />
                    ))}
                </div>

            </div>

        </main>
    )
}
