'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChangePasswordAdminUser } from "../form-admin-users/ChangePasswordAdminUser";

interface Props {
    fullname: string;
    email: string;
    role: string;
    avatar: string | undefined;
}

export function AdminProfile({ fullname, email, role, avatar }: Props) {

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
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex gap-2 items-center">
                        <Avatar className="cursor-pointer">
                            <AvatarImage src={avatar} alt={`Avatar ${fullname}`} className="aspect-square" />
                            <AvatarFallback>TDN</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium line-clamp-1">{fullname}</p>
                            <p className="text-xs text-muted-foreground font-normal">{email}</p>
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 ml-3">
                    <DropdownMenuItem asChild>
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
