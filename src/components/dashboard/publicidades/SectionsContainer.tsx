import { AdPosition } from "@/types/news.types"
import { Dispatch, SetStateAction } from "react"

interface Props {
    sectionPosition: AdPosition | undefined,
    setSectionPosition: Dispatch<SetStateAction<AdPosition | undefined>>
}

export default function SectionsContainer({ sectionPosition, setSectionPosition }: Props) {



    return (
        <div className={`rounded col-span-9 max-w-7xl  p-5 min-w-full border`}>
            <div className="grid grid-cols-12 gap-3">
                {/* publicidad portada  */}
                <div className="col-span-12 ">
                    <div className="h-[120px] bg-publicidad col-span-12 flex justify-center items-center hover:border-primary border-2">
                        <div
                            className="h-[100px] w-[970px] bg-gray-200/50 border text-foreground text-sm flex justify-center items-center relative"
                            onClick={() => setSectionPosition('top')}
                        >
                            <div className="text-center">
                                <p>Divisor de secciones</p>
                                <p>970 x 100</p>
                            </div>
                            <span className={`${sectionPosition === 'top' ? 'absolute top-0 left-0 h-full w-full block border-primary shadow bg-primary/10' : 'hidden'} `}></span>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 w-full justify-between flex gap-3">

                    <div className="w-full flex flex-col items-start justify-end text-muted-foreground relative shrink">
                        <div className=" bg-publicidad flex justify-center items-center w-[500px] h-[170px] hover:border-primary border-2">
                            <div
                                className="h-[150px] w-[480px] bg-gray-200/50 border text-foreground text-sm flex justify-center items-center relative"
                                onClick={() => setSectionPosition('bottom')}
                            >
                                <div className="text-center">
                                    <p>Debajo de portada</p>
                                    <p>480 x 150</p>
                                </div>
                                <span className={`${sectionPosition === 'bottom' ? 'absolute top-0 left-0 h-full w-full block border-primary shadow bg-primary/10' : 'hidden'} `}></span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-publicidad flex justify-center items-center w-[250px] h-[550px] hover:border-primary border-2">
                        <div
                            className="h-[500px] w-[200px] bg-gray-200/50 border text-foreground text-sm flex justify-center items-center relative"
                            onClick={() => setSectionPosition('side')}
                        >
                            <div className="text-center">
                                <p>Lateral fijo</p>
                                <p>200 x 500</p>
                            </div>
                            <span className={`${sectionPosition === 'side' ? 'absolute top-0 left-0 h-full w-full block border-primary shadow bg-primary/10' : 'hidden'} `}></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
