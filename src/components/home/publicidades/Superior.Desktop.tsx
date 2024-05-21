import { blurImage } from '@/utils/blurImage';
import Image from 'next/image'
import React from 'react'

interface Props {
    url: string;
}

export default function SuperiorDesktop({ url }: Props) {

    const hasUrl = url && url.length > 0;

    return (
        <div className="h-[120px] bg-publicidad col-span-12 flex justify-center items-center max-w-6xl mx-auto  relative my-5">
            {
                hasUrl ?
                    <Image
                        src={url}
                        alt={`publicidad`}
                        width={970}
                        height={100}
                        placeholder="blur"
                        blurDataURL={blurImage}
                        priority
                        aria-label="Publicidad superior"

                    />
                    :
                    <span className="text-sm text-muted-foreground flex items-center justify-center text-center">
                        Espacio publicitario disponible
                    </span>
            }
        </div>
    )
}
