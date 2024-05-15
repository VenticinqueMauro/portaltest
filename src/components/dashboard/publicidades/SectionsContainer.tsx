import { AdPosition, AdSectionName, Ads } from "@/types/news.types"
import Image from "next/image";
import { Dispatch, SetStateAction } from "react"

interface Props {
    allAds: Ads;
    sectionName: string;
    sectionPosition: AdPosition | undefined,
    setSectionPosition: Dispatch<SetStateAction<AdPosition | undefined>>
}

export default function SectionsContainer({ allAds, sectionName, sectionPosition, setSectionPosition }: Props) {

    const imageAd = allAds.home && allAds.home[sectionName as AdSectionName] && allAds.home[sectionName as AdSectionName]?.media;


    return (
        <div className={`rounded col-span-9 max-w-7xl  p-5 min-w-full border`}>
            <div className="grid grid-cols-12 gap-3">
                {/* publicidad portada  */}
                <div className="col-span-12 ">
                    <div className="h-[120px] bg-publicidad col-span-12 flex justify-center items-center hover:border-primary border-2 relative">
                        {
                            imageAd && imageAd.desktop && imageAd.desktop?.top?.public_id ?
                                <Image
                                    src={imageAd.desktop.top.url as string}
                                    alt={`${sectionName}-${sectionPosition}`}
                                    width={970}
                                    height={100}
                                    className="cursor-pointer"
                                    onClick={() => setSectionPosition('top')}
                                />
                                :
                                <div
                                    className="h-[100px] w-[970px] bg-gray-200/50 border text-foreground text-sm flex justify-center items-center cursor-pointer"
                                    onClick={() => setSectionPosition('top')}
                                >
                                    <div className="text-center">
                                        <p>Banner principal</p>
                                        <p>970 x 100</p>
                                    </div>
                                </div>
                        }
                        <span className={`${sectionPosition === 'top' ? 'absolute top-0 left-0 h-full w-full block shadow bg-primary/10 border-primary border-2' : 'hidden'} `}></span>
                    </div>
                </div>

                <div className="col-span-12 w-full justify-between flex gap-3">

                    <div className="w-full flex flex-col items-start justify-end text-muted-foreground relative shrink">
                        <div className=" bg-publicidad flex justify-center items-center w-[500px] h-[170px] hover:border-primary border-2 relative">
                            {
                                imageAd && imageAd.desktop && imageAd.desktop?.bottom?.public_id ?
                                    <Image
                                        src={imageAd.desktop.bottom.url as string}
                                        alt={`${sectionName}-${sectionPosition}`}
                                        width={480}
                                        height={150}
                                        className="cursor-pointer"
                                        onClick={() => setSectionPosition('bottom')}
                                    />
                                    :
                                    <div
                                        className="h-[150px] w-[480px] bg-gray-200/50 border text-foreground text-sm flex justify-center items-center relative"
                                        onClick={() => setSectionPosition('bottom')}
                                    >
                                        <div className="text-center">
                                            <p>Debajo de portada</p>
                                            <p>480 x 150</p>
                                        </div>
                                    </div>
                            }

                            <span className={`${sectionPosition === 'bottom' ? 'absolute top-0 left-0 h-full w-full block border-primary border-2 shadow bg-primary/10' : 'hidden'} `}></span>
                        </div>
                    </div>

                    <div
                        className="bg-publicidad flex justify-center items-center w-[250px] h-[550px] hover:border-primary border-2 relative"
                        onClick={() => setSectionPosition('side')}
                    >
                        {
                            imageAd && imageAd.desktop && imageAd.desktop?.side?.public_id ?
                                <Image
                                    src={imageAd.desktop.side.url as string}
                                    alt={`${sectionName}-${sectionPosition}`}
                                    width={200}
                                    height={500}
                                    className="cursor-pointer"
                                    onClick={() => setSectionPosition('side')}
                                />
                                :
                                <div className="h-[500px] w-[200px] bg-gray-200/50 border text-foreground text-sm flex justify-center items-center ">
                                    <div className="text-center">
                                        <p>Lateral fijo</p>
                                        <p>200 x 500</p>
                                    </div>
                                </div>
                        }
                        <span className={`${sectionPosition === 'side' ? 'absolute top-0 left-0 h-full w-full block border-primary border-2 shadow bg-primary/10' : 'hidden'} `}></span>
                    </div>
                </div>
            </div>
        </div>
    )
}
