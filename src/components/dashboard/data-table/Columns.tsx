"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { CategoryNews, LinkedNews, NewsStatus } from "@/models/news";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react";

export type NewsDataTable = {
    id: string
    summary: string;
    category: CategoryNews[];
    status: NewsStatus;
    createdAt?: Date;
    updatedAt?: Date;
    newsLinked?: LinkedNews[];
}

export const columnsNews: ColumnDef<NewsDataTable>[] = [
    {
        accessorKey: "title",
        header: "Titulo",
    },
    {
        accessorKey: "summary",
        header: "Sumario",
        cell: ({ row }) => {
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <p className="truncate cursor-pointer">{row.getValue('summary')}</p>
                        </TooltipTrigger>
                        <TooltipContent className="rounded max-w-xs bg-background text-foreground border shadow">
                            <p>{row.getValue('summary')}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )
        },
    },
    {
        accessorKey: "category",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Categoría
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Estado
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <Badge variant={"outline"} className={`${row.getValue('status') === 'inactive' ? 'text-destructive' : row.getValue('status') === 'pending' ? 'text-amber-500' : 'text-green-500'} uppercase rounded`}>{row.getValue('status')}</Badge>
            )
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Fecha de creación
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Fecha de actualización
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: "newsLinked",
        header: "Noticias vinculadas",
    },
]
