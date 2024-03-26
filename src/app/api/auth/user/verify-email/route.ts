import { connectDB } from "@/lib/mongodb";
import { ClientUser } from "@/models/client.user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const token = req.nextUrl.searchParams.get('token'); // Obtiene el token de la URL de la solicitud

    if (!token) {
        return NextResponse.json({ error: 'No se proporcionó ningún token' }) // Devuelve un mensaje de error si no se proporciona ningún token en la URL
    }

    try {
        await connectDB(); // Conecta a la base de datos

        const userFound = await ClientUser.findOne({ emailVerificationToken: token }); // Busca un usuario con el token de verificación dado

        if (!userFound) {
            return NextResponse.json({ message: 'Token inválido' }, { status: 404 }) // Devuelve un mensaje de token inválido si no se encuentra ningún usuario con el token dado
        }

        await userFound.updateOne({ emailVerified: true, emailVerificationToken: null }); // Actualiza el estado de verificación de correo electrónico del usuario

        return NextResponse.json({ message: 'Correo electrónico verificado correctamente' }, { status: 200 }); // Devuelve un mensaje de verificación exitosa si todo fue exitoso
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                error: `Error: ${error.message}` // Devuelve un mensaje de error si ocurre algún error durante el proceso de verificación
            }, {
                status: 400
            })
        } else {
            return NextResponse.json({
                error: 'Ha ocurrido un error inesperado'
            }, {
                status: 500 // Internal Server Error
            });
        }
    }

}
