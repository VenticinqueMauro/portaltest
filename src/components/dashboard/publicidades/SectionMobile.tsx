import { AdPosition } from "@/types/news.types";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface Props {
    imageAd: any;
    sectionName: string;
    sectionPosition: AdPosition | undefined;
    setSectionPosition: Dispatch<SetStateAction<AdPosition | undefined>>
}

export default function SectionMobile({ imageAd, sectionName, sectionPosition, setSectionPosition }: Props) {
    return (
        <div className={`rounded col-span-9 max-w-xs mx-auto p-3  border overflow-y-auto max-h-[650px] mb-20 ` }>
            <div className="grid grid-cols-12 gap-3">
                {/* publicidad portada  */}
                <div className="h-[120px] bg-publicidad col-span-12 flex justify-center items-center hover:border-primary border-2 relative">
                    {imageAd && imageAd.mobile && imageAd.mobile?.top?.public_id ? (
                        <div className="relative w-[400px] h-[100px]">
                            <Image
                                src={imageAd.mobile.top.url as string}
                                alt={`${sectionName}-${sectionPosition}`}
                                fill
                                className="cursor-pointer object-cover"
                                onClick={() => setSectionPosition('top')}
                            />
                        </div>
                    ) : (
                        <div
                            className="h-[100px] w-[400px] bg-gray-200/50 border text-foreground text-sm flex justify-center items-center cursor-pointer"
                            onClick={() => setSectionPosition('top')}
                        >
                            <div className="text-center">
                                <p>Banner principal</p>
                                <p>400 x 100</p>
                            </div>
                        </div>
                    )}
                    <span className={`${sectionPosition === 'top' ? 'absolute top-0 left-0 h-full w-full block shadow bg-primary/10 border-primary border-2' : 'hidden'} `}></span>
                </div>

                {/* publicidad central  */}

                <div className="h-[420px] bg-publicidad col-span-12 flex justify-center items-center hover:border-primary border-2 relative" >
                    {imageAd && imageAd.mobile && imageAd.mobile?.side?.public_id ? (
                        <div className="relative w-[400px] h-[400px]">
                            <Image
                                src={imageAd.mobile.side.url as string}
                                alt={`${sectionName}-${sectionPosition}`}
                                fill
                                className="cursor-pointer object-cover"
                                onClick={() => setSectionPosition('side')}
                            />
                        </div>
                    ) : (
                        <div
                            className="h-[400px] w-[400px] bg-gray-200/50 border text-foreground text-sm flex justify-center items-center cursor-pointer"
                            onClick={() => setSectionPosition('side')}
                        >
                            <div className="text-center">
                                <p>Banner central</p>
                                <p>400 x 400</p>
                            </div>
                        </div>
                    )}
                    <span className={`${sectionPosition === 'side' ? 'absolute top-0 left-0 h-full w-full block shadow bg-primary/10 border-primary border-2' : 'hidden'} `}></span>
                </div>

                {/* publicidad inferior  */}

                <div className="h-[420px] bg-publicidad col-span-12 flex justify-center items-center hover:border-primary border-2 relative" >
                    {imageAd && imageAd.mobile && imageAd.mobile?.bottom?.public_id ? (
                        <div className="relative w-[400px] h-[100px]">
                            <Image
                                src={imageAd.mobile.bottom.url as string}
                                alt={`${sectionName}-${sectionPosition}`}
                                fill
                                className="cursor-pointer object-cover"
                                onClick={() => setSectionPosition('bottom')}
                            />
                        </div>
                    ) : (
                        <div
                            className="h-[400px] w-[400px] bg-gray-200/50 border text-foreground text-sm flex justify-center items-center cursor-pointer"
                            onClick={() => setSectionPosition('bottom')}
                        >
                            <div className="text-center">
                                <p>Banner inferior</p>
                                <p>400 x 400</p>
                            </div>
                        </div>
                    )}
                    <span className={`${sectionPosition === 'bottom' ? 'absolute top-0 left-0 h-full w-full block shadow bg-primary/10 border-primary border-2' : 'hidden'} `}></span>
                </div>
            </div>
        </div>
    )
}
