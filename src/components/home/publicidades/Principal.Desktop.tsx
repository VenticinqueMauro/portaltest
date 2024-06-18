import { blurImage } from '@/utils/blurImage';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
    url: string;
    link: string;
}

export default function PrincipalDesktop({ url, link }: Props) {

    const hasUrl = url && url.length > 0;

    return (
        <div className="p-3 md:p-0 md:h-[170px] bg-publicidad col-span-12 flex justify-center items-center relative">
            {hasUrl ? (
                <Link href={`${link || '#'} `} target='_blank' rel='noreferrer'>
                    <Image
                        src={url}
                        alt="Publicidad principal"
                        fill
                        placeholder="blur"
                        blurDataURL={blurImage}
                        aria-label="Publicidad principal"
                        className='h-auto w-auto'
                        loading="lazy"
                    />
                </Link>
            ) : (
                <span className="text-sm text-muted-foreground flex items-center justify-center text-center">
                    Espacio publicitario disponible
                </span>
            )}
        </div>
    )
}
