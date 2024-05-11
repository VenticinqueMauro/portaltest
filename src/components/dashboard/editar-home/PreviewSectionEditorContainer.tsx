import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { CategoryNews, SectionNewsMap } from "@/types/news.types"
import { Lora } from 'next/font/google'
import Image from "next/image"
import { Dispatch, SetStateAction, useEffect } from "react"
import { SectionsName } from "./EditorContainer"
import SubmitButtonEditHome from "./SubmitButton.sections"
import ClearPortada from "./ClearPortada"

const lora = Lora({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-sans",
})


interface Props {
    valueSection: string;
    titleSection: string;
    selectedSectionNews: SectionNewsMap,
    sectionName: SectionsName
    setSectionName: Dispatch<SetStateAction<SectionsName>>
    setSelectedSectionNews: Dispatch<SetStateAction<SectionNewsMap>>
}

export default function PreviewSectionEditorContainer({ valueSection, titleSection, selectedSectionNews, sectionName, setSelectedSectionNews, setSectionName }: Props) {

    const portadaPrincipal = selectedSectionNews[valueSection as CategoryNews]?.mainNews;
    const gridLateral = selectedSectionNews[valueSection as CategoryNews]?.gridNews;

    useEffect(() => {
        const getMainSection = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/edit-home/cover`)
            const { data } = await response.json();

            if (data) {
                setSelectedSectionNews((prevData) => {
                    return data.sections;
                });
            }
        }

        getMainSection();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    return (
        <div className={`rounded col-span-9 max-w-7xl p-5 max-h-[630px]`}>
            <div className="col-span-9 col-start-1 gap-x-4 flex items-center justify-end">
                <ClearPortada valueSection={valueSection} setSelectedSectionNews={setSelectedSectionNews} />
                <SubmitButtonEditHome valueSection={valueSection} selectedNews={selectedSectionNews} />
            </div>
            <div className="grid grid-cols-12 gap-3">
                <h2 className="col-span-12 tracking-tight text-2xl text-muted-foreground">{titleSection}</h2>
                <div className={`${lora.className} col-start-1 col-span-6 flex flex-col gap-5 cursor-pointer z-20 `} onClick={() => setSectionName('mainNews' as SectionsName)}>
                    <Card className="rounded hover:border-primary hover:border-2 relative min-h-full">
                        {
                            portadaPrincipal.media.type !== 'video' ?
                                <Image src={portadaPrincipal.media.url ? portadaPrincipal.media.url : '/placeholder.svg'} alt="placeholder" width={400} height={300} className="w-full object-cover aspect-video rounded" />
                                :
                                <video width="400" height="300" controls={false} autoPlay loop className="w-full object-cover aspect-video rounded">
                                    <source src={portadaPrincipal.media.url} type="video/mp4" />
                                    Tu navegador no soporta la etiqueta de video.
                                </video>
                        }
                        <CardHeader>
                            <CardDescription className="text-muted-foreground font-bold text-sm">
                                {portadaPrincipal.pretitle ? portadaPrincipal.pretitle : <span className="max-w-[150px] rounded h-[20px] mx-auto bg-gray-200 block" />}
                            </CardDescription>
                            <CardTitle className="text-3xl line-clamp-3">
                                {portadaPrincipal.title ? portadaPrincipal.title : <span className="w-full h-[40px] rounded mx-auto bg-gray-200 block" />}
                            </CardTitle>
                        </CardHeader>
                        <span className={`${sectionName === 'mainNews' ? 'absolute top-0 left-0 h-full w-full block border-primary shadow bg-primary/10' : 'hidden'} `}></span>
                    </Card>
                </div>

                <div className="col-span-6 gap-3 grid grid-cols-12 hover:border-primary hover:border-2 rounded cursor-pointer relative" onClick={() => setSectionName('gridNews' as SectionsName)}>
                    {
                        Array.from({ length: 4 }).map((_, index) => (
                            <Card key={index} className="rounded col-span-6">
                                {
                                    gridLateral[index]?.media?.type !== 'video' ? (
                                        <Image
                                            src={gridLateral[index]?.media?.url || '/placeholder.svg'}
                                            alt="placeholder"
                                            width={400}
                                            height={300}
                                            className="w-full object-cover aspect-video rounded"
                                        />
                                    ) : (
                                        <video width="400" height="300" controls={false} autoPlay loop className="w-full object-cover aspect-video rounded">
                                            <source src={gridLateral[index]?.media?.url} type="video/mp4" />
                                            Tu navegador no soporta la etiqueta de video.
                                        </video>
                                    )
                                }
                                <CardHeader>
                                    <CardDescription className="text-sm font-bold text-muted-foreground">
                                        {gridLateral[index]?.pretitle ? gridLateral[index]?.pretitle : <span className="max-w-[150px] rounded h-[15px] mx-auto bg-gray-200 block" />}
                                    </CardDescription>
                                    <CardTitle className="font-semibold tracking-tight line-clamp-2">
                                        {gridLateral[index]?.title ? gridLateral[index]?.title : <span className="w-full rounded h-[50px] mx-auto bg-gray-200 block" />}
                                    </CardTitle>
                                </CardHeader>
                            </Card>
                        ))
                    }
                    <span className={`${sectionName === 'gridNews' ? 'absolute top-0 left-0 h-full w-full block border-primary shadow bg-primary/10' : 'hidden'} `}></span>
                </div>

                {/* publicidadD */}
                <div className="row-start-4 col-span-6 w-full h-[150px] bg-publicidad cursor-not-allowed text-xs text-muted-foreground flex justify-center items-center">Publicidad</div>

            </div>
        </div>
    )
}
