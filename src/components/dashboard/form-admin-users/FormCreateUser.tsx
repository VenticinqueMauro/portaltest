'use client';

import { handleCreateAdminUser } from "@/actions/adminUsers/handleCreateUser";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import SubmitAdminButton from "./SubmitAdminButton";
import { toast } from "sonner";
import { createRef } from "react";

export default function FormCreateUser() {

    const ref = createRef<HTMLFormElement>();

    const handleSubmit = async (formData: FormData) => {
        const response = await handleCreateAdminUser(formData);

        if (response.error) {
            toast.error(response.error);
        } else if (response.message) {
            toast.success(response.message);
            ref.current?.reset()
        } else {
            toast.warning(response);
        }
    }

    return (
        <form ref={ref} action={handleSubmit} className="grid gap-4 py-4">
            <Select name="role" required>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecciona un rol" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Rol</SelectLabel>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="redactor en jefe">Redactor en jefe</SelectItem>
                        <SelectItem value="redactor">Redactor</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="publicista">Publicista</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <div className="grid gap-2">
                <Label htmlFor="name">Nombre y Apellido</Label>
                <Input id="fullname" name="fullname" type="text" placeholder="Pedro Duarte" required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                    <Input id="email" name="email" type="text" placeholder="pepeduarte24" required />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">@tdn.com</span>
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" name="password" type="password" placeholder="*******" required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="*******" required />
            </div>
            <SubmitAdminButton title={'Crear usuario'} />
        </form>
    )
}
