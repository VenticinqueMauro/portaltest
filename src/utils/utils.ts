import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Función para manejar errores backend
export const handleError = (error: any) => {
    if (error instanceof Error) {
        return NextResponse.json({
            error: `${error.message}`
        }, {
            status: 400
        });
    } else {
        // Registra el error para futuras investigaciones
        return NextResponse.json({
            error: 'Ha ocurrido un error inesperado'
        }, {
            status: 500
        });
    }
};


// Funcion para formatear fechas

export function formatDate(date: Date) {
    const options: any = {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Argentina/Buenos_Aires'
    };
    return date.toLocaleDateString('es-AR', options);
}


// Funcion para decodificar token

export function decodeToken() {
    const token = cookies().get("portal_app")?.value;
    if (!token) {
        return { error: 'No autorizado' };
    }
    const decodedToken: any = verify(token, `${process.env.JWT_KEY}`);
    return decodedToken;
}

