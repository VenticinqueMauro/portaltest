import { connectDB } from "@/lib/mongodb";
import { ClientUser } from "@/models/client.user";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    // Obtener el token del cliente desde las cookies
    const token = cookies().get('portal_app_client')?.value;

    // Verificar si el token existe
    if (!token) {
        // Si no existe el token, retornar un mensaje indicando que no existe
        return NextResponse.json({ message: 'No existe un token' }, { status: 404 });
    }

    try {
        // Conectar a la base de datos
        await connectDB();

        // Verificar y decodificar el token
        const decodedToken: any = verify(token, `${process.env.JWT_KEY_CLIENT}`);

        // Verificar si el token ha expirado
        if (decodedToken.exp * 1000 < Date.now()) {
            // Si el token ha expirado, retornar un mensaje indicando que ha expirado
            return NextResponse.json({ error: 'El token ha expirado' }, { status: 401 });
        }

        // Buscar al usuario en la base de datos utilizando el email del token decodificado
        const user = await ClientUser.findOne({ email: decodedToken.email }).select(["-password", "-emailVerificationToken", "-resetPasswordTokenExpiry", "-resetPasswordExpiry", "-resetPasswordToken"]);

        // Verificar si se encontró al usuario
        if (!user) {
            // Si no se encontró al usuario, retornar un mensaje indicando que el usuario no fue encontrado
            return NextResponse.json({ error: "Usuario no encontrado", authenticate: false }, { status: 400 });
        }

        // Retornar un mensaje de éxito junto con los datos del usuario encontrado
        return NextResponse.json({ success: true, data: user, authenticate: true });

    } catch (error) {
        // Manejar errores
        if (error instanceof Error) {
            // Si se produce un error, retornar un mensaje de error con el detalle del error
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
