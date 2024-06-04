import { fontMerriweather } from '@/app/fonts'
import { NewsType } from '@/types/news.types'
import { blurImage } from '@/utils/blurImage'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
    news: any
}

export default function NewsCardByCategory({ news }: Props) {
    return (
        <div className="max-w-6xl 2xl:mx-auto px-3 lg:mr-[240px]">
            {
                news.map((item: Partial<NewsType>) => (
                    <Link href={`/${item.category}/${item.path}`} key={item._id} className="flex flex-col-reverse md:flex-row justify-between gap-2 md:gap-10 border-b py-4 hover:bg-gray-50 p-1">
                        <div className="min-w-fit text-xs md:text-sm text-muted-foreground font-light " >8 de mayo de 2024</div>
                        <div className="flex flex-col space-y-2 grow order-first md:order-none">
                            <h3 className="text-2xl font-semibold leading-none tracking-tight">{item.title}</h3>
                            <h4 className={`${fontMerriweather.className} text-md`}>{item.summary}</h4>
                            <h5 className="text-muted-foreground text-sm">Por <b className="text-foreground capitalize">{item.author}</b></h5>
                        </div>
                        {
                            item.media?.portada.type !== 'video' ? (
                                <Image
                                    src={item.media?.portada.url ?? ''}
                                    alt={item.title ?? ''}
                                    width={400}
                                    height={300}
                                    className=" object-cover aspect-video rounded md:w-72 "
                                    placeholder="blur"
                                    blurDataURL={blurImage}
                                    priority
                                />
                            ) : (
                                <video width="400" height="300" controls={true} autoPlay loop className="w-full object-cover aspect-video rounded md:w-72 ">
                                    <source src={item.media?.portada.url} type="video/mp4" />
                                    Tu navegador no soporta la etiqueta de video.
                                </video>
                            )
                        }
                    </Link>
                ))
            }
        </div>
    )
}
