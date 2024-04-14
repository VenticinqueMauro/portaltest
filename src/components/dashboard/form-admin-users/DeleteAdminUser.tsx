'use client';

import { handleDeleteUser } from "@/actions/adminUsers/handleDeleteUser";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";



export default function DeleteAdminUser({ id }: { id: string }) {

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
        <span className="flex gap-1 cursor-pointer" onClick={handleDelete} >
            <Trash2 className="text-red-500 hover:text-red-600 w-4 h-4" />
            Eliminar
        </span>
    )
}
