import { connectDB } from "@/lib/mongodb";
import { AdminUser } from "@/models/admin.user";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    // Obtener el token de la cookie
    const token = cookies().get('portal_app')?.value;

    // Verificar si existe un token
    if (!token) {
        // Retornar un mensaje indicando que no existe token
        return NextResponse.json({ message: 'No se encontró ningún token' }, { status: 404 });
    }

    try {
        // Conectar a la base de datos
        await connectDB();

        // Verificar el token
        const decodedToken: any = verify(token, `${process.env.JWT_KEY}`);

        // Verificar si el token ha expirado
        if (decodedToken.exp * 1000 < Date.now()) {
            // Retornar un mensaje indicando que el token ha expirado
            return NextResponse.json({ error: 'El token ha expirado' }, { status: 401 });
        }

        // Buscar al usuario en la base de datos
        const user = await AdminUser.findOne({ email: decodedToken.email }).select("-password");

        // Verificar si se encontró al usuario
        if (!user) {
            // Retornar un mensaje indicando que el usuario no fue encontrado
            return NextResponse.json({ error: "Usuario no encontrado", authenticate: false }, { status: 400 });
        }

        // Retornar un mensaje de éxito junto con los datos del usuario
        return NextResponse.json({ success: true, data: user, authenticate: true });

    } catch (error) {
        // Manejar errores
        if (error instanceof Error) {
            return NextResponse.json({
                error: `Error: ${error.message}`
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
