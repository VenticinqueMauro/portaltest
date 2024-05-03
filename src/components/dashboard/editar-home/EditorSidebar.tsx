'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { MainCover, NewsType } from '@/types/news.types';
import { SetStateAction, useEffect, useState } from 'react';
import { SectionName } from './EditorContainer';
import CustomCheckbox from './CustomCheckbox';

interface Props {
    news: NewsType[];
    selectedNews: MainCover;
    sectionName: SectionName;
    setSelectedNews: React.Dispatch<React.SetStateAction<MainCover>>;
}


export default function EditorSidebar({ news, sectionName, selectedNews, setSelectedNews }: Props) {

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredNews, setFilteredNews] = useState<NewsType[]>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    useEffect(() => {
        // Limpiar los ítems seleccionados cuando sectionName cambie
        setSelectedItems([]);
    }, [sectionName]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        const filtered = news.filter((news: NewsType) => news.category.toLocaleLowerCase().includes(value) || news.title.toLowerCase().includes(value))
        setFilteredNews(filtered)
        setSearchTerm(value)
    }

    console.log(selectedNews)

    const handleCheckboxChange = (item: NewsType) => {

        setSelectedItems(prevSelectedItems => {
            const itemId = item._id as string; // Asegurar que item._id sea tratado como una cadena
            if (prevSelectedItems.includes(itemId)) {
                // Si el ítem ya está seleccionado, quitarlo de la lista
                return prevSelectedItems.filter(id => id !== itemId);
            } else {
                // Agregar el ítem a la lista de seleccionados
                return [...prevSelectedItems, itemId];
            }
        })

        setSelectedNews(prevSelectedNews => {
            let updatedCover = { ...prevSelectedNews.cover };

            if (sectionName === 'mainNews') {
                updatedCover.mainNews = {
                    id: item._id as string,
                    media: {
                        url: item.media?.portada.url as string,
                        publicId: item.media?.portada?.publicId,
                        type: item.media?.portada.type as "image" | "video",
                    },
                    pretitle: item.pretitle,
                    title: item.title,
                    summary: item.summary,
                };
            } else {
                if (prevSelectedNews.cover.leftSidebar !== undefined && sectionName === 'leftSidebar') {
                    updatedCover.leftSidebar = [updatedCover.mainNews, ...prevSelectedNews.cover.leftSidebar.slice(0, 3)];
                } else if (prevSelectedNews.cover.rightSidebar !== undefined && sectionName === 'rightSidebar') {
                    updatedCover.rightSidebar = [updatedCover.mainNews, ...prevSelectedNews.cover.rightSidebar.slice(0, 1)];
                }
            }

            return { cover: updatedCover };
        });
    };


    return (
        <div className='rounded border col-span-3 p-3 flex gap-y-3 flex-col sticky top-0 right-0 h-screen overflow-y-auto'>
            <Input
                placeholder="Buscar por título o categoría"
                className="w-56 my-1"
                value={searchTerm}
                onChange={handleSearch}
            />
            <Separator className='' />
            {!sectionName ? (
                <p className='text-muted-foreground text-center '>Seleccione una sección</p>
            ) : (
                <>
                    <h2 className="text-xl tracking-tight font-bold">
                        {sectionName === 'mainNews' ? 'Portada' : sectionName === 'leftSidebar' ? 'Sección izquierda' : 'Sección derecha'}
                    </h2>
                    {(filteredNews.length === 0 ? news : filteredNews).map((item, index) => (
                        <Card key={item._id} className='rounded relative'>
                            <CardHeader>
                                <CardDescription className='line-clamp-1'>{item.pretitle}</CardDescription>
                                <CardTitle className='line-clamp-3'>{item.title}</CardTitle>
                            </CardHeader>
                            <CustomCheckbox item={item} handleCheckboxChange={handleCheckboxChange} sectionName={sectionName} selectedItems={selectedItems} />
                        </Card>
                    ))}
                </>
            )}
        </div>
    )
}
