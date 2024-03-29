'use server'

import { decodeToken, handleError } from "@/utils/utils";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_URL;


export const handleCreateNews = async (formData: FormData) => {
    const decodedToken = decodeToken();
    const author = decodedToken.fullname;

    const data = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        content: formData.get('content'),
        category: formData.get('category'),
        tags: formData.get('tags'),
        image: formData.get('image'),
        author
    }

    try {
        const response = await fetch(`${BASE_URL}/api/news`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }   

        revalidatePath('/dashboard');    
        return await response.json();
    } catch (error) {
        console.log(error)
    }


}
