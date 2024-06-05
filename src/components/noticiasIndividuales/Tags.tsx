import React from 'react'

interface Props {
    tags?: string[]
}

export default function Tags({ tags }: Props) {

    if (!tags || !tags.length) {
        return null;
    }

    return (
        <div className='flex flex-wrap gap-2 text-sm italic text-tdn/90'>
            {tags.map((tag, index) => (
                <p key={`${tag}-${index}`}>#{tag}</p>
            ))}
        </div>
    )
}
