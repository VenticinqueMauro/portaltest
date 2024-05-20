import Image from "next/image";
import { Separator } from "../ui/separator";
import { blurImage } from "@/utils/blurImage";

interface Props {
    image: {
        type: "image" | "video";
        url: string;
    },
    pretitle: string;
    title: string;
    index: number;
}

export default function LateralDerecho({ image, pretitle, title, index }: Props) {
    return (
        <>
            <div className="rounded  flex flex-col justify-between">
                <div>
                    <div className="px-1">
                        <div className="relative -top-2">
                            {image.type !== 'video' ? (
                                <Image src={image.url} alt={title} width={400} height={300}  placeholder="blur"
                                blurDataURL={blurImage} className="rounded" />
                            ) : (
                                <video
                                    width="400"
                                    height="300"
                                    controls={false}
                                    autoPlay
                                    loop
                                    className="w-full object-cover aspect-video rounded"
                                >
                                    <source src={image.url} type="video/mp4" />
                                    Tu navegador no soporta la etiqueta de video.
                                </video>
                            )}
                        </div>
                    </div>
                    <div className="text-start px-1">
                        <p className="text-sm font-bold text-muted-foreground">{pretitle}</p>
                        <p className="font-semibold tracking-tight line-clamp-4">{title}</p>
                    </div>
                </div>
            </div>
            {index === 0 && <Separator className="block mt-5 mb-7" />}
        </>
    )
}
