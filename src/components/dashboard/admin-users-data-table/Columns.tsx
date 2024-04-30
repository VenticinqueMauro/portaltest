"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import DeleteAdminUser from "../form-admin-users/DeleteAdminUser"
import { UserRole } from "@/types/news.types"

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
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Rol
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <p className={`${row.original.role === 'ADMIN' && 'text-primary'} rounded border w-fit px-2`}>{row.original.role}</p>
            )
        }
    },
    {
        header: "Acciones",
        cell: ({ row }) => {
            const user = row.original
            return (
                <DeleteAdminUser id={user.id} name={user.fullname} role={user.role} />
            )
        },
    },
]
