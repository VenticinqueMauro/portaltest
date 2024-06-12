'use client';

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
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createRef, useState } from "react";
import { toast } from "sonner";
import { useUser } from "../provider/ContextProvider";
import { signIn } from "next-auth/react";
import SubmitAuth from "./SubmitAuth";

async function handleSignin({ email, password }: { email: string, password: string }) {

    const data = {
        email,
        password,
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/auth/user/login`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const json = await response.json();
        return json;
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
    }
}

export default function ContainerLogin() {

    const ref = createRef<HTMLFormElement>();
    const { user, handleRefresh } = useUser();
    const router = useRouter();

    if (user && user.email) {
        router.push('/');
    }
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const result = await handleSignin({ email, password });

        if (result.error) {
            toast.error(result.error);
        } else if (result.message) {
            toast.success(result.message);
            ref.current?.reset();
            handleRefresh();
            setTimeout(() => {
                router.push('/');
            }, 2000);
        } else {
            toast.warning('Resultado inesperado');
        }
    }

    return (
        <div className="w-full px-3 lg:px-0 lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] flex items-center justify-center lg:items-stretch lg:justify-normal relative">
            <Link href='/' className="absolute top-5 left-3 flex items-center gap-1 text-tdn hover:underline">
                <ArrowLeft size={22} />Volver al inicio</Link>
            <form ref={ref} onSubmit={handleSubmit} className="flex items-center justify-center py-12">
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Inicio de sesión</CardTitle>
                        <CardDescription>
                            Ingresa tu email y contraseña para iniciar sesión
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
                                    placeholder="m@ejemplo.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Contraseña</Label>
                                    <Link href="/reset-password" className="ml-auto inline-block text-xs underline">
                                        Olvidates tu contraseña?
                                    </Link>
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
                            <SubmitAuth title={'Iniciar sesión'} />
                            <Button type="button" variant="outline" className="w-full" onClick={() => signIn('google')}>
                                Iniciar sesión con Google
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            No tienes una cuenta?{" "}
                            <Link href="/signup" className="underline">
                                Registrar
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
