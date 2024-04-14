"use client"

import { ColumnDef } from "@tanstack/react-table"
import { KeyRound, MoreHorizontal, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DeleteAdminUser from "../form-admin-users/DeleteAdminUser"

export type AdminUsersDataTable = {
    id: string;
    email: string;
    fullname: string;
    role: string
}

export const columns: ColumnDef<AdminUsersDataTable>[] = [
    {
        accessorKey: "fullname",
        header: "Nombre y apellido",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Rol",
        cell: ({ row }) => {
            return (
                <p className={`${row.original.role === 'ADMIN' && 'font-bold text-primary'} rounded border w-fit px-2`}>{row.original.role}</p>
            )
        }
    },
    {
        header: "Acciones",
        cell: ({ row }) => {
            const user = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild >
                            <span className="gap-1">
                                <KeyRound className="w-4 h-4 text-blue-500" />
                                Cambiar contraseña
                            </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem >
                            <DeleteAdminUser id={user.id} />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
