import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { NewsType, SectionNewsMap } from '@/types/news.types';
import { useEffect, useState } from 'react';
import CustomSectionsCheckbox from './CustomSectionsCheckbox';
import { SectionsName } from './EditorContainer';
import InfoTooltip from './InfoTooltip';

interface Props {
    news: NewsType[];
    tabs: string;
    selectedSectionNews: SectionNewsMap;
    setSelectedSectionNews: React.Dispatch<React.SetStateAction<SectionNewsMap>>;
    sectionName: SectionsName
}

export default function EditorSectionsSidebar({ tabs, news, sectionName, selectedSectionNews, setSelectedSectionNews }: Props) {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setSearchTerm('');
    }, [sectionName]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleCheckboxChange = (item: NewsType, sectionName: SectionsName, checked: boolean) => {
        setSelectedSectionNews(prevSelectedNews => {
            const updatedSelectedNews = { ...prevSelectedNews };

            // Utilizamos 'tabs' como el nombre de la sección actual
            const sectionKey = tabs as keyof SectionNewsMap;

            // Verificamos si la sección actual ya existe en el estado
            if (!updatedSelectedNews[sectionKey]) {
                // Si no existe, la creamos con mainNews y gridNews vacíos
                updatedSelectedNews[sectionKey] = {
                    mainNews: { id: "", media: { url: "", publicId: "", type: "image" }, pretitle: "", title: "", summary: "", category: "", path: "" },
                    gridNews: [],
                };
            }

            // Actualizar la noticia principal solo si sectionName es 'mainNews' y checked es true
            if (sectionName === "mainNews" && checked) {
                updatedSelectedNews[sectionKey].mainNews = {
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
                // Si no se actualiza la noticia principal, actualizamos gridNews en la sección correspondiente
                const updatedSidebar = [...updatedSelectedNews[sectionKey].gridNews];
                const index = updatedSidebar.findIndex(news => news.id === item._id);

                if (index !== -1 && !checked) {
                    updatedSidebar.splice(index, 1); // Eliminamos la noticia si se desmarca
                } else if (index === -1 && checked) {
                    // Agregamos la noticia si se marca
                    if (sectionName === "mainNews") {
                        // Limpiamos las selecciones previas en mainNews
                        updatedSelectedNews[sectionKey].mainNews = { id: "", media: { url: "", publicId: "", type: "image" }, pretitle: "", title: "", summary: "", category: "", path: "" };
                    }
                    // Verificamos el límite en gridNews
                    else if (updatedSidebar.length >= 4) {
                        // Si ya hay 4 elementos seleccionados, no hacemos nada
                        return prevSelectedNews;
                    }
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

                // Actualizamos gridNews en la sección correspondiente
                updatedSelectedNews[sectionKey].gridNews = updatedSidebar;
            }

            return updatedSelectedNews;
        });
    };

    const isNewsSelected = (newsId: string, currentSection: SectionsName) => {
        const sectionKey = tabs as keyof SectionNewsMap;
        const mainNewsId = selectedSectionNews[sectionKey]?.mainNews?.id;
        const gridNewsIds = selectedSectionNews[sectionKey]?.gridNews.map(news => news.id) ?? [];

        // Si estamos en la sección principal y la noticia está seleccionada en la sección de la parrilla, aplicar opacidad
        if (currentSection !== 'mainNews' && gridNewsIds.includes(newsId)) {
            return true;
        }

        // Si estamos en la sección de la parrilla y la noticia está seleccionada en la sección principal, aplicar opacidad
        if (currentSection !== 'gridNews' && mainNewsId === newsId) {
            return true;
        }

        return false;
    };


    return (
        <div className='rounded border col-span-3 px-3 flex gap-y-3 flex-col sticky top-0 right-0 h-screen overflow-y-auto'>
            <div className='space-y-2  sticky top-0 z-10 bg-white w-full backdrop-blur pt-3 '>
                <div className='flex justify-between'>
                    <Input
                        placeholder="Buscar por título"
                        className="w-56 my-1"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <InfoTooltip />
                </div>
                <Separator className='' />
            </div>
            {sectionName ? (
                <>
                    <h2 className="text-xl tracking-tight font-bold">
                        {sectionName === 'mainNews' ? 'Noticia principal' : 'Sección derecha'}
                    </h2>
                    <p className="text-xs text-gray-500">
                        {sectionName === 'mainNews' ? 'Selecciona solo una noticia para la noticia principal' : 'Selecciona 4 noticias para la sección derecha'}
                    </p>
                    {(news.filter(item => item.title.toLowerCase().includes(searchTerm))).map((item, index) => (
                        <Card key={item._id} className={`rounded relative ${isNewsSelected(item._id as string, sectionName === 'mainNews' ? 'gridNews' : 'mainNews') ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <CardHeader>
                                <CardDescription className='line-clamp-1'>{item.pretitle}</CardDescription>
                                <CardTitle className='line-clamp-3'>{item.title}</CardTitle>
                            </CardHeader>
                            <CustomSectionsCheckbox tabs={tabs} item={item} sectionName={sectionName} selectedSectionNews={selectedSectionNews} handleCheckboxChange={handleCheckboxChange} />
                        </Card>
                    ))}
                </>
            ) : (
                <p className='text-muted-foreground text-center'>Seleccione una sección</p>
            )}
        </div>
    );
}
