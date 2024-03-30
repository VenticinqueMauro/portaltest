'use client';

import { handleDeleteNews } from "@/actions/news/handleDeleteNews";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { toast } from "sonner";
import { FilePenLine, MoreHorizontal, Trash2 } from "lucide-react";

interface Props {
    id: string;
    title: string;
}

export default function ButtonDeleteNews({ id, title }: Props) {

    return (
        <div className="flex items-center gap-4">
            <FilePenLine size={18} className=" text-blue-500 cursor-pointer hover:text-blue-600" />
            <DialogDeleteNews id={id} title={title} />
        </div>
    )
}

const DialogDeleteNews = ({ id, title }: Props) => {


    const handleDelete = async () => {

        const response = await handleDeleteNews(id);

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


