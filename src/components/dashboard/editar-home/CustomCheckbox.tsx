import React, { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { MainCover, NewsType } from '@/types/news.types';
import { SectionName } from './EditorContainer';

interface Props {
    item: NewsType;
    sectionName: SectionName;
    selectedNews: MainCover;
    selectedItems: string[]; // Lista de elementos seleccionados
    handleCheckboxChange: (item: NewsType) => void; // Función para manejar el cambio de checkbox
}

const CustomCheckbox: React.FC<Props> = ({ item, sectionName, selectedNews, selectedItems, handleCheckboxChange }) => {
    const maxSelections = sectionName === 'mainNews' ? 1 : (sectionName === 'leftSidebar' ? 4 : 2);
    const isItemSelected = selectedItems.includes(item._id as string);
    const [isChecked, setIsChecked] = useState<boolean>(isItemSelected);

    console.log(selectedNews)

    useEffect(() => {
        setIsChecked(isItemSelected);
    }, [isItemSelected]);

    const handleCheckedChange = () => {
        setIsChecked(!isChecked);
        handleCheckboxChange(item);
    };

    // Verificar si selectedNews.cover tiene un valor definido antes de acceder a selectedNews.cover[sectionName]
    const coverSection = sectionName !== undefined && selectedNews.cover && selectedNews.cover[sectionName];
    const isItemInCover = coverSection && Array.isArray(coverSection) && coverSection.some(news => news.id === item._id);

    // Manejar la lógica específica de mainNews
    const isMainNews = sectionName === 'mainNews';
    const isMainNewsSelected = isMainNews && selectedNews.cover && selectedNews.cover.mainNews && selectedNews.cover.mainNews.id === item._id;

    return (
        <Checkbox
            id={`checkbox${item._id}`}
            value={item._id}
            defaultChecked={isMainNewsSelected}
            checked={isChecked || isItemInCover || isMainNewsSelected}
            onCheckedChange={handleCheckedChange}
            disabled={selectedItems.length >= maxSelections && !isItemSelected}
            className="absolute top-2 right-2"
        />
    );
};

export default CustomCheckbox;
