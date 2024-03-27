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
