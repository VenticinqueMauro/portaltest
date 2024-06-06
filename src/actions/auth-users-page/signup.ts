'use server';

import { revalidatePath } from "next/cache";


export async function handleSignUpUser(formData: FormData) {

    const fullname = formData.get('fullname');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');

    if (password !== confirmPassword) {
        return 'Las contraseñas no coinciden'
    }

    const data = {
        fullname,
        email,
        password,
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/auth/user/signup`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
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