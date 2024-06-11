'use client';

import Link from "next/link";

import { handleResetPassword } from "@/actions/auth-users-page/handleResetPassword";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { createRef } from "react";
import { toast } from "sonner";
import SubmitAuth from "./SubmitAuth";

export default function ContainerResetPassword() {

    const ref = createRef<HTMLFormElement>();

    const handleSubmit = async (formData: FormData) => {
        console.log('hola')
        const result = await handleResetPassword(formData);

        if (result.error) {
            toast.error(result.error);
        } else if (result.message) {
            if (result.status === 200) {
                toast.success(result.message);
                ref.current?.reset();
            }
            toast.success(result.message);
        } else (
            toast.warning(result)
        )
    }

    return (
        <div className="w-full px-3 lg:px-0 lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] flex items-center justify-center lg:items-stretch lg:justify-normal relative">
            <Link href='/' className="absolute top-5 left-3 flex items-center gap-1 text-tdn hover:underline">
                <ArrowLeft size={22} />Volver al inicio</Link>
            <form ref={ref} action={handleSubmit} className="flex items-center justify-center py-12">
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-xl">Recuperar Contraseña</CardTitle>
                        <CardDescription>
                            Por favor, ingresa tu correo electrónico para recuperar tu contraseña.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Correo electrónico</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="tuemail@ejemplo.com"
                                    required
                                />
                            </div>
                            <SubmitAuth title='Enviar enlace de recuperación' />
                        </div>
                    </CardContent>
                </Card>
            </form>
            <div className="hidden lg:flex justify-center items-center bg-tdn">
                <Image
                    src="/fondo-login.png"
                    alt="Image"
                    width="497"
                    height="640"
                    priority
                    className="dark:brightness-[0.1] dark:grayscale w-auto h-auto"
                />
            </div>
        </div>
    )
}
