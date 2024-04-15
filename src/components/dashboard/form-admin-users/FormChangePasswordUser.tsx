'use client';

import { handleChangePasswordUser } from "@/actions/adminUsers/handleChangePasswordUser";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createRef, useState } from "react";
import { toast } from "sonner";
import SubmitAdminButton from "./SubmitAdminButton";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function FormChangePasswordUser({ email }: { email: string }) {

    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const [isVisible3, setIsVisible3] = useState(false);

    const ref = createRef<HTMLFormElement>();

    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleVisibility2 = () => setIsVisible2(!isVisible2);
    const toggleVisibility3 = () => setIsVisible3(!isVisible3);

    const handleSubmit = async (formData: FormData) => {

        formData.append('email', email)

        const response = await handleChangePasswordUser(formData);

        if (response.error) {
            toast.error(response.error);
        } else if (response.message) {
            toast.success(response.message);
            ref.current?.reset();
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/auth/admin/logout`, {
                method: "DELETE",
                credentials: 'include'
            })

            if (res.ok) {
                toast.success('Serás redirigido a la página de inicio de sesión en breve 😀')
                setTimeout(() => {
                    router.push('/')
                }, 3000)
            }
        } else {
            toast.warning(response);
        }
    }

    return (
        <form ref={ref} action={handleSubmit} className="grid gap-4 py-4">
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="text" placeholder="pepeduarte24" defaultValue={email} disabled />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="oldPassword">Antigua contraseña</Label>
                <div className="relative">
                    <Input id="oldPassword" name="oldPassword" type={isVisible ? 'text' : 'password'} placeholder="*******" required />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground cursor-pointer" onClick={toggleVisibility}>{isVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}</span>
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="newPassword">Nueva contraseña</Label>
                <div className="relative">
                    <Input id="newPassword" name="newPassword" type={isVisible2 ? 'text' : 'password'} placeholder="*******" required />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground cursor-pointer" onClick={toggleVisibility2}>{isVisible2 ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}</span>
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="confirmNewPassword">Confirmar contraseña</Label>
                <div className="relative">
                    <Input id="confirmNewPassword" name="confirmNewPassword" type={isVisible3 ? 'text' : 'password'} placeholder="*******" required />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground cursor-pointer" onClick={toggleVisibility3}>{isVisible3 ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}</span>
                </div>
            </div>
            <SubmitAdminButton title={'Cambiar contraseña'} />
        </form>
    )
}
