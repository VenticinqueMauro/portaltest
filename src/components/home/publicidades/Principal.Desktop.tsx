import { blurImage } from '@/utils/blurImage';
import Image from 'next/image';

interface Props {
    url: string;
}

export default function PrincipalDesktop({ url }: Props) {

    const hasUrl = url && url.length > 0;

    return (
        <div className="h-[170px] bg-publicidad col-span-12 flex justify-center items-center relative">
            {hasUrl ? (
                <Image
                    src={url}
                    alt="Publicidad principal"
                    width={970}
                    height={150}
                    placeholder="blur"
                    blurDataURL={blurImage}
                    priority
                    aria-label="Publicidad principal"
                />
            ) : (
                <span className="text-sm text-muted-foreground flex items-center justify-center text-center">
                    Espacio publicitario disponible
                </span>
            )}
        </div>
    )
}
