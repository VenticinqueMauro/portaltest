import Image from 'next/image'
import React from 'react'

interface Props {
    url: string;
}

export default function SuperiorDesktop({ url }: Props) {

    if (!url) {
        return null;
    }

    return (
        <div className="h-[120px] bg-publicidad col-span-12 flex justify-center items-center max-w-6xl mx-auto  relative my-5">
            <Image
                src={url}
                alt={`publicidad`}
                width={970}
                height={100}
                priority
            />
        </div>
    )
}
