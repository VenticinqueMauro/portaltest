import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { MainCover, SectionNewsMap } from "@/types/news.types";
import { Eraser } from 'lucide-react';
import { Dispatch, SetStateAction } from "react";

interface Props {
    setSelectedNews?: Dispatch<SetStateAction<MainCover>>;
    setSelectedSectionNews?: Dispatch<SetStateAction<SectionNewsMap>>;
    valueSection?: string;
}

export default function ClearPortada({ setSelectedNews, setSelectedSectionNews, valueSection }: Props) {
    const handleClear = () => {
        if (setSelectedNews) {
            setSelectedNews({
                cover: {
                    mainNews: {
                        id: '',
                        media: {
                            url: ""
                        },
                        pretitle: "",
                        title: "",
                        summary: ""
                    },
                    leftSidebar: [],
                    rightSidebar: []
                }
            });
        } else if (setSelectedSectionNews && valueSection) {
            setSelectedSectionNews((prevSections) => ({
                ...prevSections,
                [valueSection]: {
                    mainNews: {
                        id: '',
                        media: {
                            url: ""
                        },
                        pretitle: "",
                        title: "",
                        summary: ""
                    },
                    gridNews: []
                }
            }));
        }
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger onClick={handleClear}>
                    <Eraser size={18} className="" />
                </TooltipTrigger>
                <TooltipContent>
                    <p>Limpiar {setSelectedNews ? "portada" : "sección"}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
