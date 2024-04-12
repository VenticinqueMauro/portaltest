'use server';

import { decodeToken } from "@/utils/utils";
import { revalidatePath } from "next/cache";


export async function handleCreateAdminUser(formData: FormData) {

    const authorized = decodeToken();

    if (authorized.role !== 'admin') {
        return 'No autorizado'
    }

    const fullname = formData.get('fullname');
    const email = formData.get('email');
    const role = formData.get('role');
    const password = formData.get('password');

    const data = {
        fullname,
        email: email + '@tdn.com',
        role,
        password,
        token: authorized
    }

    console.log(data)

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/auth/admin/signin`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const json = await response.json();

        if (!response.ok) {
            return json.error
        }
        revalidatePath('/dashboard/users');
        console.log(json)
        return json;
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
    }



}