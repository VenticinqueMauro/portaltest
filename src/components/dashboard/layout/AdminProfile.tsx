'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChangePasswordAdminUser } from "../form-admin-users/ChangePasswordAdminUser";

interface Props {
    fullname: string;
    email: string;
    role: string;
}

export function AdminProfile({ fullname, email, role }: Props) {

    const router = useRouter();

    if (!fullname || !email || !role) return null


    const handleLogout = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/auth/admin/logout`, {
                method: "DELETE",
                credentials: 'include'
            })

            const data = await res.json()

            if (data.error) {
                toast.error(data.error)
            } else if (data.message) {
                toast.success(data.message)
            } else {
                toast.warning(data)
            }

            return router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="fixed top-4 right-6">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>TDN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mr-3">
                    <DropdownMenuLabel className="capitalize">{fullname} <span className="text-muted-foreground font-normal">/ {role}</span></DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link href='/dashboard/profile'>
                            Editar Perfil
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <ChangePasswordAdminUser email={email} />
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                        Salir
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
