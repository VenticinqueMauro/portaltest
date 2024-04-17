import { LoginAdminForm } from "@/components/dashboard/login-admin/LoginAdminForm";
import { decodeToken } from "@/utils/utils";
import { redirect } from "next/navigation";

export default function page() {

    const isLoged = decodeToken();

    if (isLoged && isLoged.role) {
        redirect('/dashboard')
    }

    return (
        <LoginAdminForm />
    )
}
