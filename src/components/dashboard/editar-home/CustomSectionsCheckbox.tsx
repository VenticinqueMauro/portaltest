import { Checkbox } from '@/components/ui/checkbox';
import { NewsType, SectionNewsMap } from '@/types/news.types';
import React, { useEffect, useState } from 'react';
import { SectionsName } from './EditorContainer';

interface Props {
    tabs: string;
    item: NewsType;
    sectionName: SectionsName;
    selectedSectionNews: SectionNewsMap;
    handleCheckboxChange: (item: NewsType, sectionName: SectionsName, checked: boolean) => void;
}

const CustomSectionsCheckbox: React.FC<Props> = ({ tabs, item, sectionName, selectedSectionNews, handleCheckboxChange }) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    useEffect(() => {
        setIsChecked(false); // Reiniciar el estado del checkbox cuando cambie la sección
    }, [sectionName]);

    const isItemSelected = sectionName === 'mainNews'
        ? selectedSectionNews[tabs as keyof SectionNewsMap]?.mainNews?.id === item._id
        : (selectedSectionNews[tabs as keyof SectionNewsMap]?.gridNews || []).some(news => news.id === item._id);

    useEffect(() => {
        setIsChecked(isItemSelected);
    }, [isItemSelected]);

    const handleCheckedChange = () => {
        // Verificar si la sección es gridNews y ya hay 4 elementos marcados
        if (sectionName === 'gridNews' && selectedSectionNews[tabs as keyof SectionNewsMap]?.gridNews.length >= 4) {
            // Permitir la deselección si el nuevo estado es falso
            if (!isChecked) {
                return;
            }
        }
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        handleCheckboxChange(item, sectionName, newCheckedState);
    };

    const isCheckboxDisabled = sectionName === 'gridNews' && selectedSectionNews[tabs as keyof SectionNewsMap]?.gridNews.length >= 4;
    const isCheckboxDisabled2 = sectionName === 'mainNews' && !!selectedSectionNews[tabs as keyof SectionNewsMap]?.mainNews;

    return (
        <Checkbox
            id={`checkbox${item._id}`}
            value={item._id}
            checked={isChecked}
            onCheckedChange={handleCheckedChange}
            className="absolute top-2 right-2"
        />
    );
};


export default CustomSectionsCheckbox;
