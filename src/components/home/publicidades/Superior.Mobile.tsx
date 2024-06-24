import { blurImage } from '@/utils/blurImage';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

interface Props {
    url: string;
    link: string;
}

export default function SuperiorMobile({ url, link }: Props) {

    const hasUrl = url && url.length > 0;

    return (
        <div className="h-[120px] bg-publicidad col-span-12 flex justify-start  items-center p-3 relative my-5 md:hidden">
            {
                hasUrl ?
                    <Link href={link || '#'} target='_blank' rel='noreferrer'>
                        <Image
                            src={url}
                            alt={`publicidad`}
                            fill
                            className="object-cover"
                            placeholder="blur"
                            blurDataURL={blurImage}
                            aria-label="Publicidad superior"
                            loading="lazy"
                        />
                    </Link>
                    :
                    <span className="text-sm text-muted-foreground flex items-center justify-center text-center w-full">
                        Espacio publicitario disponible
                    </span>
            }
        </div>
    )
}
