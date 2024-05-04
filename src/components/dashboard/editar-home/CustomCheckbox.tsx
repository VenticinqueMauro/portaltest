import React, { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { MainCover, NewsType, SidebarItem } from '@/types/news.types';
import { SectionName } from './EditorContainer';
import { toast } from 'sonner';

interface Props {
    item: NewsType;
    sectionName: SectionName;
    selectedNews: MainCover;
    handleCheckboxChange: (item: NewsType, sectionName: SectionName, checked: boolean) => void;
}

const CustomCheckbox: React.FC<Props> = ({ item, sectionName, selectedNews, handleCheckboxChange }) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    useEffect(() => {
        setIsChecked(() => {
            if (sectionName === 'mainNews') {
                return selectedNews.cover[sectionName]?.id === item._id;
            } else {
                const sidebarItems = selectedNews.cover[sectionName!] as SidebarItem[];
                return sidebarItems && sidebarItems.some((sidebarItem: SidebarItem) => {
                    return sidebarItem.id === item._id;
                });
            }
        });
    }, [item._id, sectionName, selectedNews.cover]);


    const handleCheckedChange = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        handleCheckboxChange(item, sectionName, newCheckedState);
    };

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

export default CustomCheckbox;
