import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { NewsType } from '@/types/news.types';
import { SectionName } from './EditorContainer';

interface Props {
    item: NewsType;
    sectionName: SectionName;
    selectedItems: string[]; // Lista de elementos seleccionados
    handleCheckboxChange: (item: NewsType) => void; // Función para manejar el cambio de checkbox
}

const CustomCheckbox: React.FC<Props> = ({ item, sectionName, selectedItems, handleCheckboxChange }) => {
    let isDisabled = false;
    const maxSelections = sectionName === 'mainNews' ? 1 : (sectionName === 'leftSidebar' ? 4 : 2);

    if (selectedItems.length >= maxSelections && !selectedItems.includes(item._id as string)) {
        isDisabled = true;
    }

    return (
        <Checkbox
            id={`checkbox${item._id}`}
            value={item._id}
            checked={selectedItems.includes(item._id as string)}
            onCheckedChange={() => handleCheckboxChange(item)}
            disabled={isDisabled}
            className="absolute top-2 right-2"
        />
    );
};

export default CustomCheckbox;
