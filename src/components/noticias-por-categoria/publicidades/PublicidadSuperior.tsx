import { Ad } from '@/types/news.types'
import { blurImage } from '@/utils/blurImage'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
    ads?: Ad
}

export default function PublicidadSuperior({ ads }: Props) {
    return (
        <>
            {
                <div className="p-3 md:p-0 md:py-5 bg-publicidad flex justify-center items-center relative min-h-[150px]">
                    {ads && ads.media?.desktop?.top?.url ? (
                        <Link href={ads.media?.desktop?.top?.link as string || '#'} target='_blank' rel='noreferrer'>
                            <Image
                                src={ads.media?.desktop?.top?.url}
                                alt="Publicidad principal"
                                width={970}
                                height={100}
                                placeholder="blur"
                                blurDataURL={blurImage}
                                priority
                                aria-label="Publicidad principal"
                                className='object-cover h-[100px] md:h-auto'
                            />
                        </Link>
                    ) : (
                        <span className="text-sm text-muted-foreground flex items-center justify-center text-center">
                            Espacio publicitario disponible
                        </span>
                    )}
                </div>
            }
        </>
    )
}
