'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { MainCover, NewsType, SidebarItem } from '@/types/news.types';
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
        setSelectedItems([]);
    }, [sectionName]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        const filtered = news.filter((news: NewsType) => news.category.toLocaleLowerCase().includes(value) || news.title.toLowerCase().includes(value))
        setFilteredNews(filtered)
        setSearchTerm(value)
    }

    const handleCheckboxChange = (item: NewsType) => {
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
                // Obtener el nombre de la sección dinámicamente
                const sidebarName = sectionName === 'leftSidebar' ? 'leftSidebar' : 'rightSidebar';

                // Clonar el array de la barra lateral correspondiente
                let updatedSidebar = [...prevSelectedNews.cover[sidebarName] as SidebarItem[]];

                // Encontrar el índice de la noticia en la barra lateral
                const index = updatedSidebar.findIndex(news => news.id === item._id);

                // Si la noticia ya está seleccionada y se está deseleccionando, eliminarla
                if (index !== -1) {
                    updatedSidebar.splice(index, 1);
                }
                // Si la noticia no está seleccionada y hay espacio disponible, agregarla
                else if (updatedSidebar.length < (sectionName === 'leftSidebar' ? 4 : 2)) {
                    updatedSidebar.push({
                        id: item._id as string,
                        media: {
                            url: item.media?.portada.url as string,
                            publicId: item.media?.portada?.publicId,
                            type: item.media?.portada.type as "image" | "video",
                        },
                        pretitle: item.pretitle,
                        title: item.title,
                        summary: item.summary,
                    });
                }

                // Actualizar el estado de la barra lateral correspondiente
                updatedCover[sidebarName] = updatedSidebar;
            }

            return { cover: updatedCover };
        });

        // Verificar y actualizar el estado de selectedItems basado en el tipo de sección
        setSelectedItems(prevSelectedItems => {
            const maxSelections = sectionName === 'mainNews' ? 1 : (sectionName === 'leftSidebar' ? 4 : 2);
            const itemId = item._id as string;

            // Si el elemento ya está seleccionado y se está deseleccionando, eliminarlo del estado
            if (prevSelectedItems.includes(itemId)) {
                return prevSelectedItems.filter(id => id !== itemId);
            }
            // Si el elemento no está seleccionado y hay espacio disponible, agregarlo al estado
            else if (prevSelectedItems.length < maxSelections) {
                return [...prevSelectedItems, itemId];
            }
            // Si no se cumplen las condiciones anteriores, devolver el estado sin cambios
            else {
                return prevSelectedItems;
            }
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
                <p className='text-muted-foreground text-center'>Seleccione una sección</p>
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
