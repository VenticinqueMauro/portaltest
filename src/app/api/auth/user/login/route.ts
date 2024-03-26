import { connectDB } from "@/lib/mongodb";
import { ClientUser } from "@/models/client.user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    // Obtener el correo electrónico y la contraseña del cuerpo de la solicitud
    const { email, password } = await req.json();

    try {
        // Conectar a la base de datos
        await connectDB();

        // Buscar al usuario por su correo electrónico
        const userFound = await ClientUser.findOne({ email });

        // Verificar si no se encontró ningún usuario con el correo electrónico proporcionado
        if (!userFound) {
            // Retornar un mensaje de error indicando que el correo electrónico no está asociado con ninguna cuenta registrada
            return NextResponse.json({ error: 'Este correo electrónico no está asociado con ninguna cuenta registrada' }, { status: 404 });
        }

        // Obtener la contraseña hash del usuario encontrado
        const hashPassword = userFound.password;

        // Comparar la contraseña proporcionada con la contraseña hash del usuario
        const compareHashPassword = bcrypt.compareSync(password, hashPassword);

        // Verificar si la contraseña proporcionada es incorrecta
        if (!compareHashPassword) {
            // Retornar un mensaje de error indicando que la contraseña es incorrecta
            return NextResponse.json({ error: 'Contraseña incorrecta. Por favor, verifique e intente nuevamente.' }, { status: 401 });
        }

        // Obtener el nombre completo del usuario
        const fullname = userFound.fullname;

        // Crear los datos del token JWT
        const tokenData = {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // Caduca en 30 días
            email,
            fullname,
            subscribed: userFound?.subscribed,
            emailVerified: userFound?.emailVerified
        }

        // Firmar el token JWT con la clave secreta del cliente
        const token = jwt.sign(tokenData, `${process.env.JWT_KEY_CLIENT}`);

        // Crear una respuesta con un mensaje de éxito
        const response = NextResponse.json({ message: 'Inicio de sesión exitoso' }, { status: 200 });

        // Establecer la cookie del token JWT en la respuesta
        response.cookies.set('portal_app_client', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 30, // 30 días en segundos
            path: '/',
        });

        return response;

    } catch (error) {
        // Manejar errores
        if (error instanceof Error) {
            // Retornar un mensaje de error indicando que el inicio de sesión falló
            return NextResponse.json({
                error: `Inicio de sesión fallido: ${error.message}`
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
