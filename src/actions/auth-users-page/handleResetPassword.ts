'use server';

import { revalidatePath } from "next/cache";


export async function handleResetPassword(formData: FormData) {

    const email = formData.get('email');


    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/auth/user/reset-password`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });

        const json = await response.json();

        revalidatePath('/signup');
        return json;
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
    }
}