'use server';

import { handleError } from "@/utils/utils";

export async function handleChangePasswordUser(formData: FormData) {

    const email = formData.get('email');
    const oldPassword = formData.get('oldPassword');
    const newPassword = formData.get('newPassword');
    const confirmNewPassword = formData.get('confirmNewPassword');


    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/auth/admin/change-password`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                oldPassword,
                newPassword,
                confirmNewPassword
            })
        })

        const json = await response.json();

        if (!response.ok) {
            return json.error
        }

        return json;

    } catch (error) {
        return handleError(error)
    }
}