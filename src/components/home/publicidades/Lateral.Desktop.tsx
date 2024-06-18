import { blurImage } from "@/utils/blurImage";
import Image from "next/image";
import Link from "next/link";

interface Props {
    url: string;
    link: string;
}

export default function LateralDesktop({ url, link }: Props) {

    const hasUrl = url && url.length > 0;

    return (
        <div className="absolute top-0 right-0 h-full">
            <div className="hidden md:flex justify-center items-center bg-publicidad p-5 sticky top-52 right-0">
                {hasUrl ? (
                    <Link href={link || '#'} target='_blank' rel='noreferrer'>
                        <Image
                            src={url}
                            alt="Publicidad lateral"
                            width={200}
                            height={500}
                            placeholder="blur"
                            blurDataURL={blurImage}
                            aria-label="Publicidad lateral"
                            loading="lazy"
                        />
                    </Link>
                ) : (
                    <span className="w-[200px] h-[500px] text-sm text-muted-foreground flex items-center justify-center text-center">
                        Espacio publicitario disponible
                    </span>
                )}
            </div>
        </div>
    );
}
