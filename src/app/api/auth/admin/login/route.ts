import { connectDB } from "@/lib/mongodb";
import { AdminUser } from "@/models/admin.user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // Obtener los datos del cuerpo de la solicitud
        const { email, password } = await req.json();

        // Conectar a la base de datos
        await connectDB();

        // Buscar al usuario por su email
        const userFound = await AdminUser.findOne({ email })

        // Si el usuario no se encuentra, devolver un mensaje de error
        if (!userFound) {
            return NextResponse.json({ error: 'Este email no está asociado con ninguna cuenta registrada' }, { status: 404 });
        }

        // Obtener la contraseña hasheada del usuario encontrado
        const hashPassword = userFound.password;

        // Comparar la contraseña proporcionada con la contraseña hasheada en la base de datos
        const compareHashPassword = bcrypt.compareSync(password, hashPassword);

        // Si las contraseñas no coinciden, devolver un mensaje de error
        if (!compareHashPassword) {
            return NextResponse.json({ error: 'Contraseña incorrecta. Por favor, verifica e intenta nuevamente.' }, { status: 401 });
        }

        // Si la autenticación es exitosa, generar un token JWT
        const tokenData = {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            email,
            fullname: userFound.fullname,
            role: userFound.role
        }
        const token = jwt.sign(tokenData, `${process.env.JWT_KEY}`)

        // Crear una respuesta con un mensaje de éxito y establecer la cookie del token JWT
        const response = NextResponse.json({ message: 'Inicio de sesión exitoso' }, { status: 200 });
        response.cookies.set('portal_app', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 30, // 30 días en segundos
            path: '/',
        });

        return response;

    } catch (error) {
        // Manejar errores
        if (error instanceof Error) {
            return NextResponse.json({
                error: `Inicio de sesión fallido ${error.message}`
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
