import { sendEmail } from "@/actions/emails/verifyEmail";
import { VerifyEmailTemplate } from "@/components/EmailTemplates/Verify.email";
import { connectDB } from "@/lib/mongodb";
import { ClientUser } from "@/models/client.user";
import bcrypt from "bcrypt";
import crypto from 'crypto';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const { email, password, fullname } = await req.json(); // Extrae datos de la solicitud

    try {
        await connectDB(); // Conecta a la base de datos

        const userFound = await ClientUser.findOne({ email }); // Busca si el usuario ya está registrado

        if (userFound) {
            return NextResponse.json({ message: 'Este correo electrónico ya ha sido registrado' }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hashea la contraseña

        const user = new ClientUser({
            email,
            fullname,
            password: hashedPassword,
        });

        await user.save(); // Guarda el usuario en la base de datos

        const emailVerificationToken = crypto.randomBytes(32).toString("base64url"); // Genera un token de verificación de correo electrónico

        await user.updateOne({ emailVerificationToken: emailVerificationToken }); // Actualiza el token de verificación de correo electrónico del usuario en la base de datos

        await sendEmail({
            from: 'TENDENCIA DE NOTICIAS <onboarding@resend.dev>',
            to: [email],
            subject: "Verificación de Correo Electrónico",
            react: VerifyEmailTemplate({ email, emailVerificationToken }) as React.ReactElement, // Envía el correo electrónico de verificación
        })

        return NextResponse.json({ message: 'Revisa tu correo para verificar tu cuenta' }, { status: 200 }) // Devuelve un mensaje de registro exitoso si todo fue exitoso

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                error: `Fallo en el registro: ${error.message}` // Devuelve un mensaje de error si algo falla durante el proceso de registro
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
