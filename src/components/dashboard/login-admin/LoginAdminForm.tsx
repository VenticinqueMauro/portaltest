'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function LoginAdminForm() {

    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false)

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setLoading(true)
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/auth/admin/login`, {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const json = await response.json();

            if (response.ok) {
                toast.success(json.message);
                router.push('/dashboard');
            } else {
                toast.error(json.error);
            }
        } catch (error) {
            toast.error("Ocurrió un error inesperado");
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-balance text-muted-foreground">
                            Ingrese su correo electrónico a continuación para iniciar sesión en su cuenta
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="m@tdn.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="current-password">Password</Label>
                            </div>
                            <div className="relative">
                                <Input id="current-password" name="password" type={isVisible ? 'text' : 'password'} placeholder="*******" required />
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground cursor-pointer" onClick={toggleVisibility}>{isVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}</span>
                            </div>
                        </div>

                        <Button type="submit" className={`${loading ? "opacity-80 cursor-not-allowed" : ''} w-full flex items-center gap-1`} >
                            {loading ? 'Ingresando al panel administrador...' : 'Ingresar'}
                        </Button>
                    </form>
                </div>
            </div>
            <div className="hidden lg:flex justify-center items-center bg-[#433A8A]">
                <Image
                    src="/fondo-login.png"
                    alt="Image"
                    width="497"
                    height="640"
                    className="object-fill  dark:brightness-[0.1] dark:grayscale"
                />
            </div>
        </div>
    );
}

