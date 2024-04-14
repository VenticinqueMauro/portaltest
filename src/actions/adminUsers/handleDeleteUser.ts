'use server';

import { handleError } from "@/utils/utils";
import { revalidatePath } from "next/cache";

export async function handleDeleteUser(id: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/auth/admin/${id}`, {
            method: 'DELETE',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const json = await response.json();

        if (!response.ok) {
            return json.error
        }

        revalidatePath('/dashboard/users')
        return json;
    } catch (error) {
        return handleError(error)
    }
}