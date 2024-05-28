import Image from "next/image";
import { Separator } from "../ui/separator";
import { blurImage } from "@/utils/blurImage";
import Link from "next/link";

interface Props {
    image: {
        type: "image" | "video";
        url: string;
    },
    pretitle: string;
    title: string;
    category: string;
    path: string;
    index: number;
}

export default function LateralDerecho({ image, pretitle, title, category, path, index }: Props) {
    return (
        <>
            <Link href={`${category}/${path}`} className="rounded flex flex-col justify-between md:hover:shadow md:hover:bg-gray-50 transition-all duration-100 cursor-pointer">
                <div>
                    <div className="px-1">
                        <div className="relative -top-2">
                            {image.type !== 'video' ? (
                                <Image src={image.url} alt={title} width={400} height={300} placeholder="blur"
                                    blurDataURL={blurImage} className="object-cover rounded w-full aspect-video" />
                            ) : (
                                <video
                                    width="400"
                                    height="300"
                                    controls={true}
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
                        <p className="text-sm font-medium text-muted-foreground">{pretitle}</p>
                        <p className="font-semibold tracking-tight line-clamp-4">{title}</p>
                    </div>
                </div>
            </Link>
            {index === 0 && <Separator className="hidden md:block mt-5 mb-7" />}
            <Separator className="md:hidden mt-5 mb-7" />
        </>
    )
}
