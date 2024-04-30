'use client';

import { handleDeleteNews } from "@/actions/news/handleDeleteNews";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CategoryNews, MediaNews } from "@/types/news.types";
import { FilePenLine, Trash2 } from "lucide-react";
import { toast } from "sonner";
import EditNewsForm from "../form-news/EditNews.form";
import { NewsDataTable } from "./Columns";

interface Props {
    id: string;
    category?: CategoryNews;
    title?: string;
    media?: MediaNews;
    news?: NewsDataTable
}

export default function ButtonActionsNews({ id, category, title, media, news }: Props) {

    return (
        <div className="flex items-center gap-4">
            <SheetEditNews id={id} title={title} news={news} />
            <DialogDeleteNews id={id} category={category} title={title} media={media} />
        </div>
    )
}

const DialogDeleteNews = ({ id, category, title, media }: Props) => {

    const handleDelete = async () => {

        const response = await handleDeleteNews({ id, category, title, media });

        if (response.error) {
            toast.error(response.error);
        } else if (response.message) {
            toast.success(response.message);
        } else {
            toast.warning(response);
        }
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Trash2 size={18} className="text-red-500 hover:text-red-600" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirmación de Eliminación</DialogTitle>
                    <DialogDescription>
                        Esta acción eliminará permanentemente la noticia <strong className="text-accent-foreground">{title}</strong> y no se puede deshacer. ¿Está seguro de que desea proceder?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter >
                    <DialogClose asChild>
                        <Button className="w-full flex items-center gap-1" variant={'destructive'} type="submit" onClick={handleDelete}>
                            <Trash2 size={20} />
                            Confirmar Eliminación
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}


const SheetEditNews = ({ id, title, news }: Props) => {

    if (!news) {
        return null;
    }

    return (
        <Sheet>
            <SheetTrigger>
                <FilePenLine size={18} className=" text-blue-500 cursor-pointer hover:text-blue-600" />
            </SheetTrigger>
            <SheetContent className="min-w-full h-full overflow-y-auto px-12">
                <SheetHeader className="max-w-7xl mx-auto">
                    <SheetTitle className="max-w-7xl mx-auto">Editar noticia</SheetTitle>
                    <div >
                        <EditNewsForm news={news} />
                    </div>
                </SheetHeader>
            </SheetContent>
        </Sheet>

    )
}


