'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator';
import { NewsType } from '@/types/news.types'
import { useState } from 'react'

export default function EditorSidebar({ news }: { news: NewsType[] }) {

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredNews, setFilteredNews] = useState<NewsType[]>([]); 

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        const filtered = news.filter((news: NewsType) => news.category.toLocaleLowerCase().includes(value) || news.title.toLowerCase().includes(value))
        setFilteredNews(filtered)
        setSearchTerm(value)
    }

    return (
        <div className='rounded border col-span-3 p-3 flex gap-y-3 flex-col sticky top-0 right-0 h-screen overflow-y-auto'>
            <Input
                placeholder="Buscar por título o categoría"
                className="w-56 my-1"
                value={searchTerm}
                onChange={handleSearch}
            />
            <Separator className='mb-2' />
            {
                (filteredNews.length === 0 ? news : filteredNews).map((item, index) => ( 
                    <Card key={item._id} className='rounded relative'>
                        <CardHeader>
                            <CardDescription className='line-clamp-1'>{item.pretitle}</CardDescription>
                            <CardTitle className='line-clamp-3'>{item.title}</CardTitle>
                        </CardHeader>
                        <Checkbox
                            id={`checkbox${index}`} 
                            // value={news._id}
                            // checked={LinkedNews?.includes(news._id as string)}
                            // onCheckedChange={(isChecked) => handleNewsSelect(isChecked as boolean, news._id as string)}
                            className="absolute top-2 right-2 "
                        />
                    </Card>
                ))
            }
        </div>
    )
}
