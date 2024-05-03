import React, { useEffect, useState } from 'react';
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
    const maxSelections = sectionName === 'mainNews' ? 1 : (sectionName === 'leftSidebar' ? 4 : 2);
    const isItemSelected = selectedItems.includes(item._id as string);
    const [isChecked, setIsChecked] = useState<boolean>(isItemSelected);

    useEffect(() => {
        setIsChecked(isItemSelected);
    }, [isItemSelected]);

    const handleCheckedChange = () => {
        setIsChecked(!isChecked);
        handleCheckboxChange(item);
    };

    return (
        <Checkbox
            id={`checkbox${item._id}`}
            value={item._id}
            checked={isChecked}
            onCheckedChange={handleCheckedChange}
            disabled={selectedItems.length >= maxSelections && !isItemSelected}
            className="absolute top-2 right-2"
        />
    );
};

export default CustomCheckbox;
