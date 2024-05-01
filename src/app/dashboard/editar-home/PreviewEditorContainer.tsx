import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import Image from "next/image"






export default function PreviewEditorContainer() {

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

    const noticias3 = [
        {
            img: '/placeholder.jpg',
            pretitle: "Política",
            title: "El gobierno anuncia un plan integral para la reforma del sistema de salud pública"
        },
        {
            img: '/placeholder.jpg',
            pretitle: "Tecnología",
            title: "Avances en inteligencia artificial: cómo la IA está transformando diversas industrias en todo el mundo"
        },
        {
            img: '/placeholder.jpg',
            pretitle: "Economía",
            title: "Crecimiento récord en el sector tecnológico"
        },
        {
            img: '/placeholder.jpg',
            pretitle: "Cultura",
            title: "Festival de música regresa con artistas internacionales"
        }
    ];



    return (
        <div className='rounded border col-span-9 max-w-6xl p-5'>
            <div className="grid grid-cols-12 gap-3">
                <div className="col-span-3 w-full gap-y-3 min-h-full flex flex-col justify-beetwen">
                    {noticias.map((noticia, index) => (
                        <div key={noticia.title} className={`${index === noticias.length - 1 ? '' : 'border-b-2'} py-2 `}>
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
                    )}
                </div>


                <div className="col-span-6 w-full min-h-full ">
                    <Card className="rounded">
                        <div className="px-1">
                            <div className="relative -top-2" >
                                <Image src='/placeholder.jpg' alt="placeholder" width={400} height={300} className="w-full object-cover aspect-video rounded" />
                            </div>
                        </div>
                        <CardHeader className="text-center">
                            <CardDescription className="text-muted-foreground font-bold text-sm">COPA LIBERTADORES</CardDescription>
                            <CardTitle className="text-3xl">Contundente marcha en protesta por los ajustes en las universidades</CardTitle>
                            <CardDescription>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo facilis animi repellat, in illum alias facere rem? Non temporibus necessitatibus consequuntur placeat, nulla delectus aperiam fugiat. Rem consequuntur voluptate asperiores et quo. Tempora doloremque corrupti dolorem distinctio rem voluptates dolor!</CardDescription>
                        </CardHeader>
                    </Card>
                </div>


                <div className="col-span-3 w-full min-h-full">
                    <div className="col-span-3 w-full gap-y-3 min-h-full flex flex-col justify-between">
                        {noticias2.map((noticia, index) => (
                            <div key={noticia.title} className={`${index !== noticias2.length - 1 ? 'border-b-2' : ''} py-2 `}>
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
                </div>

                <div className="col-span-12 w-full mt-14">
                    <h3 className="tracking-tight text-xl text-violet-700 italic mb-5 border-t border-primary max-w-xs">Las más leídas</h3>
                    <div className="flex justify-between gap-2">
                        {noticias3.map((noticia, index) => (
                            <div key={noticia.title} className="flex flex-col flex-grow max-w-[200px]">
                                <div className="relative mb-2">
                                    <Image src={noticia.img} alt="placeholder" width={400} height={300} className="w-full object-cover aspect-video rounded" />
                                </div>
                                <p className="text-sm font-bold text-muted-foreground">{noticia.pretitle}</p>
                                <h3 className="font-semibold tracking-tight line-clamp-2">{noticia.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>

    )
}
