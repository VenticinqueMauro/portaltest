import { blurImage } from '@/utils/blurImage';
import Image from 'next/image'
import React from 'react'

interface Props {
    url: string;
}

export default function SuperiorDesktop({ url }: Props) {

    const hasUrl = url && url.length > 0;

    return (
        <div className="h-[120px] bg-publicidad col-span-12 flex justify-start lg:justify-center md:mr-[260px] items-center max-w-7xl 2xl:mx-auto mx-3 2xl:px-0  relative my-5">
            {
                hasUrl ?
                    <Image
                        src={url}
                        alt={`publicidad`}
                        width={970}
                        height={100}
                        placeholder="blur"
                        blurDataURL={blurImage}
                        aria-label="Publicidad superior"
                        loading="lazy"
                    />
                    :
                    <span className="text-sm text-muted-foreground flex items-center justify-center text-center w-full">
                        Espacio publicitario disponible
                    </span>
            }
        </div>
    )
}
