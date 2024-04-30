'use client';

import { handleDeleteUser } from "@/actions/adminUsers/handleDeleteUser";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";



export default function DeleteAdminUser({ id, name, role }: { id: string, name: string, role: string }) {

    const handleDelete = async () => {

        const response = await handleDeleteUser(id);

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
            <DialogTrigger disabled={role === 'ADMIN'}>
                <Trash2 size={18} className={`${role === 'ADMIN' ? 'cursor-not-allowed text-red-500 opacity-50' : 'text-red-500 hover:text-red-600'} `} />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirmación de Eliminación</DialogTitle>
                    <DialogDescription>
                        Esta acción eliminará permanentemente al usuario <strong className="text-accent-foreground">{name}</strong> y no se puede deshacer. ¿Está seguro de que desea proceder?
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
