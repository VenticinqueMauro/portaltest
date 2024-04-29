"use client"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { CategoryNews, MediaNews } from "@/models/news";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { CldImage, CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';
import Image from "next/image";
import ButtonActionsNews from "./Button.ActionsNews";
import HandleNewsStatus from "./HandleNewsStatus";
import { NewsStatus } from "@/types/news.types";


export type NewsDataTable = {
    id: string;
    pretitle: string;
    title: string;
    summary: string;
    content: string;
    category: CategoryNews;
    author: string,
    status: NewsStatus;
    media?: MediaNews;
    lastModifiedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
    newsLinked?: string[];
    tags?: string[]
}

export const columnsNews: ColumnDef<NewsDataTable>[] = [
    {
        accessorKey: "title",
        header: "Titulo",
        cell: ({ row }) => {
            const news = row.original;
            return (
                <HoverCard>
                    <HoverCardTrigger className="cursor-pointer hover:underline">{row.getValue('title')}</HoverCardTrigger>
                    <HoverCardContent className="w-96 max-h-[500px] overflow-y-auto overflow-x-hidden" sideOffset={-50}>
                        <h4 className="text-sm font-bold text-muted-foreground">{news.pretitle}</h4>
                        <h1 className="text-lg font-bold">{news.title}</h1>
                        <h2 className="text-base mb-5">{news.summary}</h2>
                        {news.media?.portada?.type === "image" ? (
                            <CldImage
                                src={news.media?.portada?.publicId || ''}
                                width={400}
                                height={300}
                                alt="portada"
                            />
                        ) : (
                            <CldVideoPlayer
                                width="1920"
                                height="1080"
                                src={news.media?.portada?.publicId || ''}
                            />
                        )}
                        <div className="text-sm mb-3 mt-3" dangerouslySetInnerHTML={{ __html: news.content }} />
                        <Carousel className="w-full">
                            <CarouselContent className="-ml-1">
                                {news.media?.gallery?.map((image) => (
                                    <CarouselItem key={image.url} className="pl-1 md:basis-1/2 lg:basis-1/3">
                                        <div className="p-1">
                                            <Image src={image.url} alt="image" width={200} height={100} className="rounded" />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                        {
                            news?.tags && news.tags.length >= 1 &&
                            news.tags.map(tag => (
                                <span key={tag} className="text-blue-600 uppercase mr-2  italic text-sm px-3 py-1 shadow rounded bg-muted-foreground/5 ">#{tag}</span>
                            ))
                        }
                    </HoverCardContent>
                </HoverCard>

            )
        }
    },
    {
        accessorKey: "category",
        header: ({ column }) => {
            return (
                <span
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="flex justify-start items-center cursor-pointer hover:text-accent-foreground "
                >
                    Categoría
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </span>
            )
        },
        cell: ({ row }) => {
            return (
                <p className="capitalize">{row.original.category}</p>
            )
        }
    },
    {
        accessorKey: "author",
        header: ({ column }) => {
            return (
                <span
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="flex justify-start items-center cursor-pointer hover:text-accent-foreground "
                >
                    Autor
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </span>
            )
        },
        cell: ({ row }) => {
            return (
                <p className="capitalize">{row.original.author}</p>
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <span
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="flex justify-start items-center cursor-pointer hover:text-accent-foreground"
                >
                    Creado en
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </span>
            )
        },
        cell: ({ row }) => {
            return (
                <p>{row.original.createdAt?.toString()}hs</p>
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
                    Actualizado en
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </span>
            )
        },
        cell: ({ row }) => {
            return (
                <p>{row.original.updatedAt?.toString()}</p>
            )
        }
    },
    {
        accessorKey: "lastModifiedBy",
        header: "Modificado por",
        cell: ({ row }) => {
            const news = row.original
            return (
                <p>{news?.lastModifiedBy}</p>
            )
        }
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
                <HandleNewsStatus row={row} />
            )
        },
    },
    {
        accessorKey: "Acciones",
        cell: ({ row }) => {
            const news = row.original
            return (
                <ButtonActionsNews id={news.id} category={news.category} title={news.title} media={news?.media} news={news} />
            )
        },
    },
]
