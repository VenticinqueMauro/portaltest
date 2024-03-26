import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
    try {
        // Eliminar la cookie del cliente 'portal_app_client'
        cookies().delete('portal_app_client');

        // Retornar un mensaje de éxito indicando que se cerró sesión correctamente
        return NextResponse.json({ message: 'Sesión cerrada exitosamente' }, { status: 200 });

    } catch (error) {
        // Manejar errores
        if (error instanceof Error) {
            // Retornar un mensaje de error con el detalle del error
            return NextResponse.json({
                error: error.message
            }, {
                status: 400
            });
        } else {
            return NextResponse.json({
                error: 'Ha ocurrido un error inesperado'
            }, {
                status: 500 // Internal Server Error
            });
        }
    }
}
