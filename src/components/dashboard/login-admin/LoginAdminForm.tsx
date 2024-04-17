'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

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
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <div className="relative">
                                <Input id="password" name="password" type={isVisible ? 'text' : 'password'} placeholder="*******" required />
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground cursor-pointer" onClick={toggleVisibility}>{isVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}</span>
                            </div>
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Ingresando' : 'Ingresar'}
                        </Button>
                    </form>
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <Image
                    src="/placeholder.svg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
}

