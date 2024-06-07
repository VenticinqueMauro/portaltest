'use server';



export async function handleChangePasswordClientUser(formData: FormData) {

    const token = formData.get('token');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');

    if (password !== confirmPassword) {
        return 'Las contraseñas no coinciden'
    }

    const data = {
        token,
        password,
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/auth/user/change-password`, {
            method: 'PUT',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const json = await response.json();

        return json;
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
    }
}