'use server';

interface Props {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
}

export async function handleLoginWithProviders({ email, name, image }: Props) {

    const data = {
        email,
        fullname: name
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/auth/user/signup-provider`, {
            method: 'POST',
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