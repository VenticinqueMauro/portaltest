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
                            <Button type="button" variant="outline" className="w-full relative" onClick={() => signIn('google')}>
                                <svg data-testid="geist-icon" height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" className="absolute top-1/2 transform -translate-y-1/2 left-5" style={{ color: 'currentColor' }}>
                                    <path
                                        d="M8.15991 6.54543V9.64362H12.4654C12.2763 10.64 11.709 11.4837 10.8581 12.0509L13.4544 14.0655C14.9671 12.6692 15.8399 10.6182 15.8399 8.18188C15.8399 7.61461 15.789 7.06911 15.6944 6.54552L8.15991 6.54543Z"
                                        fill="#4285F4"
                                    ></path>
                                    <path
                                        d="M3.6764 9.52268L3.09083 9.97093L1.01807 11.5855C2.33443 14.1963 5.03241 16 8.15966 16C10.3196 16 12.1305 15.2873 13.4542 14.0655L10.8578 12.0509C10.1451 12.5309 9.23598 12.8219 8.15966 12.8219C6.07967 12.8219 4.31245 11.4182 3.67967 9.5273L3.6764 9.52268Z"
                                        fill="#34A853"
                                    ></path>
                                    <path
                                        d="M1.01803 4.41455C0.472607 5.49087 0.159912 6.70543 0.159912 7.99995C0.159912 9.29447 0.472607 10.509 1.01803 11.5854C1.01803 11.5926 3.6799 9.51991 3.6799 9.51991C3.5199 9.03991 3.42532 8.53085 3.42532 7.99987C3.42532 7.46889 3.5199 6.95983 3.6799 6.47983L1.01803 4.41455Z"
                                        fill="#FBBC05"
                                    ></path>
                                    <path
                                        d="M8.15982 3.18545C9.33802 3.18545 10.3853 3.59271 11.2216 4.37818L13.5125 2.0873C12.1234 0.792777 10.3199 0 8.15982 0C5.03257 0 2.33443 1.79636 1.01807 4.41455L3.67985 6.48001C4.31254 4.58908 6.07983 3.18545 8.15982 3.18545Z"
                                        fill="#EA4335"
                                    ></path>
                                </svg>
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
