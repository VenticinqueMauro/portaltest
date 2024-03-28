"use client"

import { Button } from "@/components/ui/button";
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

export const columns: ColumnDef<NewsDataTable>[] = [
    {
        accessorKey: "title",
        header: "Titulo",
    },
    {
        accessorKey: "summary",
        header: "Sumario",
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
        }
    },
    {
        accessorKey: "createdAt",
        header: "Fecha de creación",
    },
    {
        accessorKey: "updatedAt",
        header: "Fecha de actualización",
    },
    {
        accessorKey: "newsLinked",
        header: "Noticias vinculadas",
    },
]
