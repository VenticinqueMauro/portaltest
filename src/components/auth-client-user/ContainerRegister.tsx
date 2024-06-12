'use client';

import { handleSignUpUser } from "@/actions/auth-users-page/signup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createRef, useState } from "react";
import { toast } from "sonner";
import SubmitAuth from "./SubmitAuth";
import { useUser } from "../provider/ContextProvider";

export default function ContainerRegister() {

    const { user } = useUser();
    const ref = createRef<HTMLFormElement>();
    const router = useRouter();

    if (user && user.email) {
        router.push('/');
    }

    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);


    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleVisibility2 = () => setIsVisible2(!isVisible2);


    const handleSubmit = async (formData: FormData) => {
        const result = await handleSignUpUser(formData);

        if (result.error) {
            toast.error(result.error);
        } else if (result.message) {
            if (result.status === 200) {
                toast.success(result.message);
                ref.current?.reset();
                setTimeout(() => {
                    router.back();
                }, 3000);
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
                        <CardTitle className="text-xl">Registro</CardTitle>
                        <CardDescription>
                            Completa los campos para completar el registro
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="fullname">Nombre completo / Alias</Label>
                                <Input id="fullname" name='fullname' placeholder="Elons Mask" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Correo electrónico</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="m@ejemplo.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="current-password">Contraseña</Label>
                                </div>
                                <div className="relative">
                                    <Input id="current-password" name="password" type={isVisible ? 'text' : 'password'} placeholder="*******" required />
                                    <span
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground cursor-pointer"
                                        onClick={toggleVisibility}>
                                        {isVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                                    </span>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                                </div>
                                <div className="relative">
                                    <Input id="confirm-password" name="confirm-password" type={isVisible2 ? 'text' : 'password'} placeholder="*******" required />
                                    <span
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground cursor-pointer"
                                        onClick={toggleVisibility2}>
                                        {isVisible2 ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                                    </span>
                                </div>
                            </div>
                            <SubmitAuth title={'Crear cuenta'} />
                            <Button type="button" variant="outline" className="w-full" onClick={() => signIn('google')}>
                                Iniciar sesión con Google
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Ya tienes una cuenta?{" "}
                            <Link href="/login" className="underline">
                                Ingresa
                            </Link>
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
