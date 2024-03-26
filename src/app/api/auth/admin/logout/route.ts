import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
    try {
        // Eliminar la cookie del token de autenticación
        cookies().delete('portal_app');

        // Crear una respuesta con un mensaje de éxito
        return NextResponse.json({ message: 'Cierre de sesión exitoso' }, { status: 200 });

    } catch (error) {
        // Manejar errores
        if (error instanceof Error) {
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
