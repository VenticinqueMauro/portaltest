import { blurImage } from "@/utils/blurImage";
import Image from "next/image";

interface Props {
    url: string;
}

export default function LateralDesktop({ url }: Props) {

    const hasUrl = url && url.length > 0;

    return (
        <div className="absolute top-0 right-0 h-full">
            <div className="hidden lg:flex justify-center items-center bg-publicidad p-5 sticky top-32 right-0">
                {hasUrl ? (
                    <Image
                        src={url}
                        alt="Publicidad lateral"
                        width={200}
                        height={500}
                        placeholder="blur"
                        blurDataURL={blurImage}
                        priority
                        aria-label="Publicidad lateral"
                    />
                ) : (
                    <span className="w-[200px] h-[500px] text-sm text-muted-foreground flex items-center justify-center text-center">
                        Espacio publicitario disponible
                    </span>
                )}
            </div>
        </div>
    );
}
