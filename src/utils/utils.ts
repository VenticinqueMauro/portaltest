import { NextResponse } from "next/server";

// Función para manejar errores backend
export const handleError = (error: any) => {
    if (error instanceof Error) {
        return NextResponse.json({
            error: `Error: ${error.message}`
        }, {
            status: 400
        });
    } else {
        // Registra el error para futuras investigaciones
        console.error('Error inesperado:', error);
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
