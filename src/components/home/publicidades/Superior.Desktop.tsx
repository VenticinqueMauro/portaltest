import { blurImage } from '@/utils/blurImage';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

interface Props {
    url: string;
    link: string;
}

export default function SuperiorDesktop({ url, link }: Props) {

    const hasUrl = url && url.length > 0;

    return (
        <div className="h-[120px] bg-publicidad col-span-12 hidden md:flex justify-start lg:justify-center md:mr-[260px] items-center min-[1760px]:max-w-7xl min-[1760px]:mx-auto mx-3 p-3 2xl:px-0  relative mt-10">
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
