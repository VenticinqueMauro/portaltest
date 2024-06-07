import { sendEmail } from "@/actions/emails/verifyEmail";
import { ResetPasswordEmailTemplate } from "@/components/EmailTemplates/ResetPassword.email";
import { connectDB } from "@/lib/mongodb";
import { ClientUser } from "@/models/client.user";
import crypto from 'crypto';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    // Obtener el correo electrónico desde la solicitud
    const { email } = await req.json();

    try {
        // Conectar a la base de datos
        await connectDB();

        // Buscar al usuario por su correo electrónico
        const userFound = await ClientUser.findOne({ email });

        // Verificar si el usuario existe
        if (!userFound) {
            // Si el usuario no existe, retornar un mensaje indicando que el correo electrónico no está registrado
            return NextResponse.json({ message: 'Este correo electrónico no está registrado' }, { status: 400 })
        }

        // Generar un token de restablecimiento de contraseña
        const resetPasswordToken = crypto.randomBytes(32).toString("base64url");

        // Calcular la fecha de expiración del token (24 horas a partir de ahora)
        const today = new Date();
        const expiryDate = new Date(today.setDate(today.getDate() + 1));

        // Actualizar la información de restablecimiento de contraseña del usuario en la base de datos
        await userFound.updateOne({ resetPasswordToken: resetPasswordToken, resetPasswordTokenExpiry: expiryDate });

        // Enviar el correo electrónico de restablecimiento de contraseña
        await sendEmail({
            from: 'TENDENCIA DE NOTICIAS <onboarding@resend.dev>',
            to: [email],
            subject: "Restablecimiento de Contraseña",
            // Generar el contenido del correo electrónico utilizando la plantilla y los datos necesarios
            react: ResetPasswordEmailTemplate({ email, resetPasswordToken }) as React.ReactElement,
        })

        // Retornar un mensaje indicando que se ha enviado el correo electrónico para restablecer la contraseña
        return NextResponse.json({ message: 'Se ha enviado el correo electrónico para restablecer la contraseña' }, { status: 200 })

    } catch (error) {
        // Manejar errores
        if (error instanceof Error) {
            // Si se produce un error, retornar un mensaje de error con el detalle del error
            return NextResponse.json({
                error: `Error al restablecer la contraseña: ${error.message}`
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
