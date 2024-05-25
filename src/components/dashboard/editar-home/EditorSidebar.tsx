'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { MainCover, NewsType, SidebarItem } from '@/types/news.types';
import { useEffect, useState } from 'react';
import CustomCheckbox from './CustomCheckbox';
import { SectionName } from './EditorContainer';

interface Props {
    news: NewsType[];
    selectedNews: MainCover;
    sectionName: SectionName;
    setSelectedNews: React.Dispatch<React.SetStateAction<MainCover>>;
}


export default function EditorSidebar({ news, sectionName, selectedNews, setSelectedNews }: Props) {

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredNews, setFilteredNews] = useState<NewsType[]>([]);

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
                    category: item.category,
                    path: item.path
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
                        category: item.category,
                        path: item.path
                    });
                }

                // Actualizar el estado de la barra lateral correspondiente
                updatedCover[sidebarName] = updatedSidebar;
            }

            return { cover: updatedCover };
        });

    };

    const isNewsSelectedInCover = (newsId: string, currentSection: keyof MainCover['cover']): boolean => {
        const coverNews = selectedNews.cover;

        if (currentSection === 'mainNews') {
            // Si la sección actual es la sección central, verificamos si la noticia está seleccionada en las secciones laterales
            const leftSidebarItems = coverNews.leftSidebar ?? [];
            const rightSidebarItems = coverNews.rightSidebar ?? [];
            const isLeftSelected = leftSidebarItems.some((item: SidebarItem) => item.id === newsId);
            const isRightSelected = rightSidebarItems.some((item: SidebarItem) => item.id === newsId);

            // Si la noticia está seleccionada en alguna de las secciones laterales, devolvemos verdadero
            return isLeftSelected || isRightSelected;
        } else {
            // Si la sección actual es una de las secciones laterales, verificamos si la noticia está seleccionada en la sección central o en la sección lateral opuesta
            const mainNewsId = coverNews.mainNews?.id;
            const isMainSelected = mainNewsId === newsId;
            const leftSidebarItems = coverNews.leftSidebar ?? [];
            const rightSidebarItems = coverNews.rightSidebar ?? [];

            // Si la noticia está seleccionada en la sección central o en la sección lateral opuesta, devolvemos verdadero
            return isMainSelected || (currentSection === 'leftSidebar' ? rightSidebarItems : leftSidebarItems).some((item: SidebarItem) => item.id === newsId);
        }
    };





    return (
        <div className='rounded border col-span-3 px-3 flex gap-y-3 flex-col sticky top-0 right-0 h-screen overflow-y-auto'>
            <div className='space-y-2  sticky top-0 z-10 bg-white w-full backdrop-blur pt-3 '>
                <Input
                    placeholder="Buscar por título o categoría"
                    className="w-56 my-1"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <Separator className='' />
            </div>
            {!sectionName || sectionName === undefined ? (
                <p className='text-muted-foreground text-center'>Seleccione una sección</p>
            ) : (
                <>
                    <h2 className="text-xl tracking-tight font-bold">
                        {sectionName === 'mainNews' ? 'Sección central' : sectionName === 'leftSidebar' ? 'Sección izquierda' : 'Sección derecha'}
                    </h2>
                    {sectionName === 'mainNews' && (
                        <p className="text-xs text-gray-500">Selecciona solo una noticia para la sección central</p>
                    )}
                    {sectionName === 'leftSidebar' && (
                        <p className="text-xs text-gray-500">Selecciona 4 noticias para la sección izquierda</p>
                    )}
                    {sectionName === 'rightSidebar' && (
                        <p className="text-xs text-gray-500">Selecciona 2 noticias para la sección derecha</p>
                    )}
                    {(filteredNews.length === 0 ? news : filteredNews).map((item, index) => {
                        const selectedInCover = isNewsSelectedInCover(item._id as string, sectionName);

                        return (
                            <Card key={item._id} className={`rounded relative ${selectedInCover ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                <CardHeader>
                                    <CardDescription className='line-clamp-1'>{item.pretitle}</CardDescription>
                                    <CardTitle className='line-clamp-3'>{item.title}</CardTitle>
                                </CardHeader>
                                <CustomCheckbox item={item} handleCheckboxChange={handleCheckboxChange} sectionName={sectionName} selectedNews={selectedNews} />
                            </Card>
                        );
                    })}

                </>
            )}
        </div>
    )
}
