"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { CategoryNews, LinkedNews, NewsStatus } from "@/models/news";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, FilePenLine, MoreHorizontal, Trash2 } from "lucide-react";


export type NewsDataTable = {
    id: string
    summary: string;
    category: CategoryNews[];
    author: string,
    status: NewsStatus;
    lastModifiedBy?: string;
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
                <span
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="flex justify-start items-center cursor-pointer hover:text-accent-foreground"
                >
                    Categoría
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </span>
            )
        }
    },
    {
        accessorKey: "author",
        header: ({ column }) => {
            return (
                <span
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="flex justify-start items-center cursor-pointer hover:text-accent-foreground"
                >
                    Autor
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </span>
            )
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <span
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="flex justify-start items-center cursor-pointer hover:text-accent-foreground"
                >
                    Creación
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </span>
            )
        }
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => {
            return (
                <span
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="flex justify-start items-center cursor-pointer hover:text-accent-foreground"
                >
                    Actualización
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </span>
            )
        }
    },
    {
        accessorKey: "lastModifiedBy",
        header: "Modificado por"
    },
    {
        accessorKey: "newsLinked",
        header: "Noticias vinculadas",
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <span
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="flex justify-start items-center cursor-pointer hover:text-accent-foreground"
                >
                    Estado
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </span>
            )
        },
        cell: ({ row }) => {
            return (
                <Badge variant={"outline"} className={`${row.getValue('status') === 'inactive' ? 'text-destructive' : row.getValue('status') === 'pending' ? 'text-amber-500' : 'text-green-500'} uppercase rounded`}>{row.getValue('status')}</Badge>
            )
        },
    },
    {
        accessorKey: "Acciones",
        cell: ({ row }) => {
            const news = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <FilePenLine size={18} className="mr-1 text-blue-800" />
                            Modificar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Trash2 size={18} className="mr-1 text-destructive" />
                            Eliminar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
