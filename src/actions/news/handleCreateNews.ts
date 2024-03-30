'use server'

import { decodeToken } from "@/utils/utils";
import { revalidatePath } from "next/cache";

export const handleCreateNews = async (formData: FormData) => {

    const decodedToken = decodeToken();
    const author = decodedToken.fullname;

    const title = formData.get('title')
    const summary = formData.get('summary')
    const content = formData.get('content')
    const category = formData.get('category')
    const image = formData.get('image')


    const data = {
        title,
        summary,
        content,
        category,
        image,
        author
    }


    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/news`, {
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

        revalidatePath('/dashboard');
        return json;
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
    }
}
