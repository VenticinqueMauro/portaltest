import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { MainCover } from "@/types/news.types";
import Image from "next/image"
import { SectionName } from "./EditorContainer";
import { Dispatch, SetStateAction } from "react";


interface Props {
    selectedNews: MainCover
    sectionName: SectionName
    setSectionName: Dispatch<SetStateAction<SectionName>>
}


export default function PreviewEditorContainer({ selectedNews, sectionName, setSectionName }: Props) {


    const portadaPrincipal = selectedNews?.cover.mainNews;
    const lateralIzq = selectedNews?.cover.mainNews;

    const noticias = [
        {
            img: '/placeholder.jpg',
            pretitle: "Actualidad",
            title: "Nuevas medidas para combatir el cambio climático"
        },
        {
            pretitle: "Deportes",
            title: "Equipo local gana el campeonato nacional de fútbol"
        },
        {
            pretitle: "Economía",
            title: "Crecimiento récord en el sector tecnológico"
        },
        {
            pretitle: "Cultura",
            title: "Festival de música regresa con artistas internacionales"
        }
    ];

    const noticias2 = [
        {
            img: '/placeholder.jpg',
            pretitle: "Política",
            title: "El gobierno anuncia un plan integral para la reforma del sistema de salud pública"
        },
        {
            img: '/placeholder.jpg',
            pretitle: "Tecnología",
            title: "Avances en inteligencia artificial: cómo la IA está transformando diversas industrias en todo el mundo"
        }
    ];

    return (
        <div className='rounded col-span-9 max-w-7xl p-5 py-14 max-h-[630px]'>
            <div className="grid grid-cols-12 gap-3">
                <div className="col-span-3 w-full gap-y-3 min-h-full flex flex-col justify-beetwen relative hover:bg-primary/5 cursor-pointer">
                    {
                        noticias.map((noticia, index) => (
                            <div key={noticia.title} className={`${index === noticias.length - 1 ? '' : 'border-b-2'} py-2 px-1 `} onClick={() => setSectionName('leftSidebar' as SectionName)}>
                                {
                                    noticia.img && (
                                        <div className="relative -top-2">
                                            <Image src={noticia.img} alt="placeholder" width={400} height={300} className="w-full object-cover aspect-video rounded" />
                                        </div>
                                    )
                                }
                                <p className="text-sm font-bold text-muted-foreground">{noticia.pretitle}</p>
                                <h3 className="font-semibold tracking-tight">{noticia.title}</h3>
                            </div>
                        )
                        )
                    }
                    <span className={`${sectionName === 'leftSidebar' ? 'absolute top-0 left-0 h-full w-full block border-primary shadow bg-primary/10' : 'hidden'} `}></span>
                </div>


                <div className="col-span-6 w-full min-h-full relative  cursor-pointer">
                    <Card className="rounded  min-h-full hover:bg-primary/5" onClick={() => setSectionName('mainNews' as SectionName)}>
                        <div className="px-1">
                            <div className="relative -top-2" >
                                <Image src={portadaPrincipal?.media.url.length ? portadaPrincipal?.media.url : '/placeholder.jpg'} alt="placeholder" width={400} height={300} className="w-full object-cover aspect-video rounded" />
                            </div>
                        </div>
                        <CardHeader className="text-center">
                            <CardDescription className="text-muted-foreground font-bold text-sm">
                                {portadaPrincipal?.pretitle.length ? portadaPrincipal?.pretitle : <span className="w-[150px] rounded h-[20px] mx-auto bg-gray-200 block" />}
                            </CardDescription>
                            <CardTitle className="text-3xl">
                                {portadaPrincipal?.title.length ? portadaPrincipal?.title : <span className="w-full h-[30px] rounded mx-auto bg-gray-200 block" />}
                            </CardTitle>
                            <CardDescription>
                                {portadaPrincipal?.summary.length ? portadaPrincipal?.summary : <span className="w-full h-[200px] rounded mx-auto bg-gray-200 block" />}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <span className={`${sectionName === 'mainNews' ? 'absolute top-0 left-0 h-full w-full block border-primary shadow bg-primary/10' : 'hidden'} `}></span>
                </div>


                <div className="col-span-3 w-full min-h-full relative hover:bg-primary/5  cursor-pointer">
                    <div className="col-span-3 w-full min-h-full flex flex-col justify-between" onClick={() => setSectionName('rightSidebar' as SectionName)}>
                        {noticias2.map((noticia, index) => (
                            <div key={noticia.title} className={`${index !== noticias2.length - 1 ? 'border-b-2' : ''} py-2 px-1  min-h-full`}>
                                {
                                    noticia.img && (
                                        <div className="relative -top-2">
                                            <Image src={noticia.img} alt="placeholder" width={400} height={300} className="w-full object-cover aspect-video rounded" />
                                        </div>
                                    )
                                }
                                <p className="text-sm font-bold text-muted-foreground">{noticia.pretitle}</p>
                                <h3 className="font-semibold tracking-tight">{noticia.title}</h3>
                            </div>
                        ))}
                    </div>
                    <span className={`${sectionName === 'rightSidebar' ? 'absolute top-0 left-0 h-full w-full block border-primary shadow bg-primary/10' : 'hidden'} `}></span>
                </div>
            </div>
        </div>

    )
}
