import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { MainCover } from "@/types/news.types";
import { Lora } from 'next/font/google';
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import ClearPortada from "./ClearPortada";
import { SectionName } from "./EditorContainer";
import SubmitButtonEditHome from "./SubmitButton.cover";

const lora = Lora({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-sans",
})


interface Props {
    selectedNews: MainCover
    sectionName: SectionName
    setSelectedNews: Dispatch<SetStateAction<MainCover>>
    setSectionName: Dispatch<SetStateAction<SectionName>>
}


export default function PreviewPortadaEditorContainer({ selectedNews, sectionName, setSelectedNews, setSectionName }: Props) {


    const portadaPrincipal = selectedNews?.cover.mainNews;
    const lateralIzq = selectedNews?.cover.leftSidebar;
    const lateralDer = selectedNews?.cover.rightSidebar;


    useEffect(() => {
        const getMainCover = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/edit-home/cover`)

            const { data } = await response.json();

            if (data) {
                setSelectedNews(data);
            }
        }

        getMainCover();
    }, [setSelectedNews])


    return (
        <div className={`rounded col-span-9 max-w-7xl p-5 max-h-[630px]`}>
            <div className="grid grid-cols-12 gap-x-3">
                <div className="col-span-12 col-start-1 gap-x-4 flex items-center justify-end">
                    <ClearPortada setSelectedNews={setSelectedNews} />
                    <SubmitButtonEditHome selectedNews={selectedNews} />
                </div>
                <h2 className="col-span-12 tracking-tight text-2xl text-muted-foreground pb-3">Portada</h2>
                <div className={`${lora.className} col-span-3 w-full gap-y-3 min-h-full flex flex-col justify-beetwen relative hover:border-primary hover:border-2 cursor-pointer`}>
                    {
                        Array.from({ length: 4 }).map((_, index) => (
                            <div key={`left-${index}`} className={`${lateralIzq && lateralIzq.length && index !== lateralIzq.length - 1 ? 'border-b-2' : ''} py-2 px-1 h-full flex flex-col gap-1 text-start`} onClick={() => setSectionName('leftSidebar' as SectionName)}>
                                {/* LOGICA PARA MOSTRAR LA IMAGEN DE LA PRIMERA NOTICIA  */}
                                {/* {index === 0 && lateralIzq && lateralIzq.length ? (
                                    <div className="relative -top-2">
                                        {
                                            lateralIzq[0].media.type !== 'video' ?
                                                <Image src={lateralIzq && lateralIzq.length ? (lateralIzq[0]?.media.url || '/placeholder.svg') : '/placeholder.svg'} alt="placeholder" width={856} height={422} className="w-full object-cover aspect-video rounded" />
                                                :
                                                <video width="400" height="300" controls={true} autoPlay loop className="w-full object-cover aspect-video rounded">
                                                    <source src={lateralIzq && lateralIzq.length ? lateralIzq[0]?.media.url : '/placeholder.svg'} type="video/mp4" />
                                                    Tu navegador no soporta la etiqueta de video.
                                                </video>
                                        }
                                    </div>) :
                                    index === 0 ?
                                        <Image src='/placeholder.svg' alt="placeholder" width={856} height={422} className="w-full object-cover aspect-video rounded" /> : null
                                } */}
                                <p className="text-sm font-bold text-muted-foreground">
                                    {lateralIzq && lateralIzq[index]?.pretitle.length ? lateralIzq[index]?.pretitle : <span className="w-[150px] rounded h-[10px] mx-auto bg-gray-200 block mb-2" />}
                                </p>
                                <h3 className="font-semibold tracking-tight line-clamp-2">
                                    {lateralIzq && lateralIzq[index] ? lateralIzq[index]?.title : <span className="w-full h-[70px] rounded mx-auto bg-gray-200 block" />}
                                </h3>
                            </div>
                        ))
                    }
                    <span className={`${sectionName === 'leftSidebar' ? 'absolute top-0 left-0 h-full w-full block border-primary shadow bg-primary/10' : 'hidden'} `}></span>
                </div>


                <div className={`${lora.className} col-span-6 w-full min-h-full relative  cursor-pointer`}>
                    <Card className="rounded  min-h-full hover:border-primary hover:border-2" onClick={() => setSectionName('mainNews' as SectionName)}>
                        <div className="px-1">
                            <div className="relative -top-2" >
                                {
                                    portadaPrincipal.media.type !== 'video' ?
                                        <Image src={portadaPrincipal?.media.url.length > 0 ? portadaPrincipal.media.url : '/placeholder.svg'} alt="placeholder" width={856} height={422} className="w-full object-cover aspect-video rounded" />
                                        :
                                        <video width="400" height="300" controls={true} autoPlay loop className="w-full object-cover aspect-video rounded">
                                            <source src={portadaPrincipal?.media.url} type="video/mp4" />
                                            Tu navegador no soporta la etiqueta de video.
                                        </video>
                                }
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


                <div className={`${lora.className} col-span-3 w-full min-h-full relative hover:border-primary hover:border-2  cursor-pointer`}>
                    <div className="col-span-3 w-full min-h-full flex flex-col justify-between" onClick={() => setSectionName('rightSidebar' as SectionName)}>
                        {Array.from({ length: 2 }).map((_, index) => (
                            <React.Fragment key={`fragment-${index}`}>
                                <div key={`right-${index}`} className={`py-2 px-1 h-[50%]`}>
                                    <div className="relative -top-2">
                                        {
                                            lateralDer && lateralDer.length ? (
                                                lateralDer[index]?.media?.type !== 'video' ? (
                                                    <Image
                                                        src={lateralDer[index]?.media?.url || '/placeholder.svg'}
                                                        alt="placeholder"
                                                        width={400}
                                                        height={300}
                                                        className="w-full object-cover aspect-video rounded"
                                                    />
                                                ) : (
                                                    <video width="400" height="300" controls={true} autoPlay loop className="w-full object-cover aspect-video rounded">
                                                        <source src={lateralDer[index]?.media?.url} type="video/mp4" />
                                                        Tu navegador no soporta la etiqueta de video.
                                                    </video>
                                                )
                                            ) : (
                                                <Image
                                                    src='/placeholder.svg'
                                                    alt="placeholder"
                                                    width={400}
                                                    height={300}
                                                    className="w-full object-cover aspect-video rounded"
                                                />
                                            )
                                        }
                                    </div>

                                    <p className="text-sm font-bold text-muted-foreground">
                                        {lateralDer && lateralDer[index]?.pretitle.length ? lateralDer[index]?.pretitle : <span className="w-[150px] rounded h-[10px] mx-auto bg-gray-200 block mb-2" />}
                                    </p>
                                    <h3 className="font-semibold tracking-tight">
                                        {lateralDer && lateralDer[index] ? lateralDer[index]?.title : <span className="w-full h-[100px] rounded mx-auto bg-gray-200 block" />}
                                    </h3>
                                </div>
                                {index !== 1 && (
                                    <div key={`divider-${index}`} className="border-b-2 mb-3"></div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <span className={`${sectionName === 'rightSidebar' ? 'absolute top-0 left-0 h-full w-full block border-primary shadow bg-primary/10' : 'hidden'} `}></span>
                </div>
            </div>
        </div>

    )
}
