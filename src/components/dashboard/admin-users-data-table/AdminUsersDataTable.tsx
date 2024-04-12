import { AdminUser } from "@/types/news.types";
import { AdminUsersDataTable, columns } from "./Columns";
import DataTableAdminUsers from "./DataTable";

async function getData(): Promise<AdminUsersDataTable[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/auth/admin`, { cache: "no-store" });

    const { data } = await response.json()

    if (!data || data.length === 0) {
        return [];
    }


    return data.map((user: AdminUser) => ({
        id: user._id,
        email: user.email,
        fullname: user.fullname.toUpperCase(),
        role: user.role.toUpperCase()
    }))
}


export default async function AdminUsersTable() {
    const data = await getData()

    return (
        <div className="py-10">
            <DataTableAdminUsers columns={columns} data={data} />
        </div>
    )
}