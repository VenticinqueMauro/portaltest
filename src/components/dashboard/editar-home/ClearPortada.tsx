import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { MainCover } from "@/types/news.types";
import { Eraser } from 'lucide-react';
import { Dispatch, SetStateAction } from "react";

interface Props {
    setSelectedNews: Dispatch<SetStateAction<MainCover>>
}

export default function ClearPortada({ setSelectedNews }: Props) {

    const handleClear = () => setSelectedNews({
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
            })

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger onClick={handleClear}>
                    <Eraser size={18} className="" />
                </TooltipTrigger>
                <TooltipContent>
                    <p>Limpiar portada</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider >
    )
}
