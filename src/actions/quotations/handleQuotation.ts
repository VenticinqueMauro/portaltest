'use server';

import { decodeToken } from "@/utils/utils";
import { revalidatePath } from "next/cache";

export async function handleQuotation(formData: FormData) {
    const token = decodeToken();

    if (token.role !== 'admin' && token.role !== 'editor') {
        return 'No tienes permisos para realizar esta acción';
    }

    const title = formData.get('title') as string;
    const titleQuote1 = formData.get('titleQuote1') as string;
    const titleQuote2 = formData.get('titleQuote2') as string;
    const priceQuote1 = formData.get('priceQuote1');
    const priceQuote2 = formData.get('priceQuote2');

    const data: any = {};

    if (priceQuote1 !== null && priceQuote1 !== '') { // Agregar entrada solo si hay un precio válido
        data[title] = {
            [titleQuote1]: {
                precioActual: Number(priceQuote1)
            }
        };
    }

    if (priceQuote2 !== null && priceQuote2 !== '') { // Agregar entrada solo si hay un precio válido
        if (!data[title]) {
            data[title] = {};
        }
        data[title][titleQuote2] = {
            precioActual: Number(priceQuote2)
        };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/quotations`, {
            method: "PUT",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const json = await response.json();

        if (!response.ok) {
            return json.error;
        }

        revalidatePath('/dashboard/cotizaciones');
        return json;
    } catch (error) {
        if (error instanceof Error) {
            return error.message;
        }
    }
}

