'use client';

import { Badge } from "@/components/ui/badge";
import { Row } from "@tanstack/react-table";
import { Pause, Play } from "lucide-react";
import { NewsDataTable } from "./Columns";
import { handleNewsStatus } from "@/actions/news/handleChangeStatusNews";
import { toast } from "sonner";

interface Props {
    row: Row<NewsDataTable>
}

export default function HandleNewsStatus({ row }: Props) {

    const changeNewsStatus = async () => {
        const response = await handleNewsStatus(row.original.id, row.original.status);

        if (response.error) {
            toast.error(response.error);
        } else {
            toast.success(response);
        }
    }


    return (
        <Badge
            variant={"outline"}
            className={`${row.getValue('status') === 'pendiente' ? 'text-amber-600 hover:bg-amber-500/20' : 'text-green-600 hover:bg-green-500/20'} uppercase rounded cursor-pointer font-normal`}
            onClick={() => changeNewsStatus()}
            title={row.getValue('status') === 'pendiente' ? "Publicar noticia" : "Pausar publicación"}
        >
            {row.original.status === 'pendiente'
                ? <Play className="h-4 w-4 mr-1" />
                : <Pause className="h-4 w-4 mr-1" />
            }
            {row.getValue('status')}
        </Badge>
    )
}
