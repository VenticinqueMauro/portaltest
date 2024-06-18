import { blurImage } from "@/utils/blurImage";
import Image from "next/image";
import Link from "next/link";

interface Props {
    url: string;
    link: string;
}

export default function InferiorDesktop({ url, link }: Props) {

    const hasUrl = url && url.length > 0;

    return (
        <div className="col-start-1 col-span-12 mb-10">
            <div
                className="flex justify-center bg-publicidad items-center w-full h-[170px] "
            >
                {
                    hasUrl ?
                        <Link href={link || ''} target='_blank' rel='noreferrer'>
                            <Image
                                src={url}
                                alt={`publicidad lateral`}
                                width={480}
                                height={150}
                                placeholder="blur"
                                blurDataURL={blurImage}
                                loading="lazy"
                                aria-label="Publicidad inferior"
                            />
                        </Link>
                        :
                        <span className="text-sm text-muted-foreground flex items-center justify-center">
                            Espacio publicitario disponible
                        </span>
                }
            </div>
        </div>
    )
}
