'use client';

import { handleChangeShowAuthor } from "@/actions/news/handleChangeShowAuthor";
import { Badge } from "@/components/ui/badge";
import { Row } from "@tanstack/react-table";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { NewsDataTable } from "./Columns";

interface Props {
    row: Row<NewsDataTable>
}

export default function HandleShowAuthor({ row }: Props) {

    const changeNewsStatus = async () => {
        const response = await handleChangeShowAuthor(row.original.id, row.original.showAuthor);

        if (response?.error) {
            toast.error(response.error);
        } else if (response?.message) {
            toast.success(response.message);
        } else {
            toast.warning(response);
        }
    }


    return (
        <Badge
            variant={"outline"}
            className={`${!row.getValue('showAuthor') ? 'text-destructive hover:bg-destructive/20' : 'text-green-600 hover:bg-green-500/20'} uppercase rounded cursor-pointer font-normal flex items-center w-fit`}
            onClick={() => changeNewsStatus()}
            title={row.getValue('showAuthor') ? "Ocultar autor" : "Mostrar autor"}
        >
            {row.getValue('showAuthor')
                ? <>
                    <Eye className="h-4 w-4 mr-1" />
                </>
                : <>
                    <EyeOff className="h-4 w-4 mr-1" />
                </>
            }
        </Badge>
    )
}
