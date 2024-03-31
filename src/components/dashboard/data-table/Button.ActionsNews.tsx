'use client';

import { handleDeleteNews } from "@/actions/news/handleDeleteNews";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FilePenLine, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
    id: string;
    title: string;
    media?: string;
}

export default function ButtonActionsNews({ id, title, media }: Props) {

    return (
        <div className="flex items-center gap-4">
            <SheetEditNews id={id} title={title} />
            <DialogDeleteNews id={id} title={title} media={media} />
        </div>
    )
}

const DialogDeleteNews = ({ id, title, media }: Props) => {

    const handleDelete = async () => {

        const response = await handleDeleteNews({ id, media });

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


const SheetEditNews = ({ id, title }: Props) => {
    return (
        <Sheet>
            <SheetTrigger>
                <FilePenLine size={18} className=" text-blue-500 cursor-pointer hover:text-blue-600" />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edicion de noticia</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>

    )
}


