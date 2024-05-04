import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { MainCover } from "@/types/news.types";
import Image from "next/image"
import { SectionName } from "./EditorContainer";
import React, { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import SubmitButtonEditHome from "./SubmitButton.editHome";


interface Props {
    selectedNews: MainCover
    sectionName: SectionName
    setSectionName: Dispatch<SetStateAction<SectionName>>
}


export default function PreviewEditorContainer({ selectedNews, sectionName, setSectionName }: Props) {


    const portadaPrincipal = selectedNews?.cover.mainNews;
    const lateralIzq = selectedNews?.cover.leftSidebar;
    const lateralDer = selectedNews?.cover.rightSidebar;



    return (
        <div className='rounded col-span-9 max-w-7xl p-5 py-14 max-h-[630px]'>
            <div className="grid grid-cols-12 gap-3">
                <SubmitButtonEditHome selectedNews={selectedNews} />
                <div className="col-span-3 w-full gap-y-3 min-h-full flex flex-col justify-beetwen relative hover:bg-primary/5 cursor-pointer">
                    {
                        Array.from({ length: 4 }).map((_, index) => (
                            <div key={`left-${index}`} className={`${lateralIzq && lateralIzq.length && index !== lateralIzq.length - 1 ? 'border-b-2' : ''} py-2 px-1 h-full flex flex-col gap-1 text-start`} onClick={() => setSectionName('leftSidebar' as SectionName)}>
                                {index === 0 && (
                                    <div className="relative -top-2">
                                        <Image src={lateralIzq && lateralIzq.length ? (lateralIzq[0]?.media.url || '/placeholder.jpg') : '/placeholder.jpg'} alt="placeholder" width={400} height={300} className="w-full object-cover aspect-video rounded" />
                                    </div>
                                )}
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
                        {Array.from({ length: 2 }).map((_, index) => (
                            <React.Fragment key={`fragment-${index}`}>
                                <div key={`right-${index}`} className={`py-2 px-1 h-[50%]`}>
                                    <div className="relative -top-2">
                                        <Image src={lateralDer && lateralDer.length ? (lateralDer[index]?.media.url || '/placeholder.jpg') : '/placeholder.jpg'} alt="placeholder" width={400} height={300} className="w-full object-cover aspect-video rounded" />
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
