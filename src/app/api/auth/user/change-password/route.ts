import { connectDB } from "@/lib/mongodb";
import { ClientUser } from "@/models/client.user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function PUT(req: NextRequest) {
    // Obtener la contraseña y el token del cuerpo de la solicitud
    const { password, token } = await req.json();

    // Verificar si no se proporcionó un token
    if (!token) {
        // Retornar un mensaje de error indicando que no se proporcionó un token
        return NextResponse.json({ error: 'No se proporcionó un token' }, { status: 400 });
    }

    try {
        // Conectar a la base de datos
        await connectDB();

        // Buscar el usuario por el token de restablecimiento de contraseña
        const userFound = await ClientUser.findOne({ resetPasswordToken: token });

        // Verificar si no se encontró un usuario con el token proporcionado
        if (!userFound) {
            // Retornar un mensaje de error indicando que el token es inválido
            return NextResponse.json({ error: 'Token inválido' }, { status: 404 });
        }

        // Obtener la fecha de vencimiento del token de restablecimiento de contraseña
        const resetPasswordExpires = userFound.resetPasswordTokenExpiry;

        // Verificar si el token ha expirado
        if (!resetPasswordExpires || resetPasswordExpires.getTime() < Date.now()) {
            // Retornar un mensaje de error indicando que el token ha expirado
            return NextResponse.json({ error: 'El token ha expirado' }, { status: 401 });
        }

        // Generar el hash de la nueva contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Actualizar la contraseña del usuario en la base de datos y limpiar el token de restablecimiento
        await userFound.updateOne({ password: hashedPassword, resetPasswordToken: null, resetPasswordTokenExpiry: null });

        // Retornar un mensaje de éxito indicando que la contraseña se cambió correctamente
        return NextResponse.json({ message: 'Contraseña cambiada exitosamente' }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                error: `Error: ${error.message}`
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