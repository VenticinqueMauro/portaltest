import { connectDB } from "@/lib/mongodb";
import { AdminUser } from "@/models/admin.user";
import bcrypt from "bcrypt";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    // Obtener los datos del cuerpo de la solicitud
    const { email, password, fullname, role, token } = await req.json();
    

    try {
        // Conectar a la base de datos
        await connectDB();

        // Verificar si el usuario autenticado tiene permisos de administrador
        const userAuthorized = await AdminUser.findOne({ email: token.email }).select("-password");

        if (!userAuthorized || userAuthorized.role !== 'admin') {
            // Retornar un mensaje de error indicando que el usuario no tiene permisos para crear usuarios
            return NextResponse.json({ error: 'No tienes permiso para crear usuarios' }, { status: 403 });
        }

        // Verificar si ya existe un usuario con el correo electrónico proporcionado
        const userFound = await AdminUser.findOne({ email });

        if (userFound) {
            // Retornar un mensaje de error indicando que el correo electrónico ya ha sido registrado
            return NextResponse.json({ message: 'Este correo electrónico ya ha sido registrado' }, { status: 400 });
        }

        // Generar el hash del password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario administrador
        const user = new AdminUser({
            email,
            fullname,
            password: hashedPassword,
            role
        });

        // Guardar el nuevo usuario en la base de datos
        await user.save();

        // Retornar un mensaje de éxito indicando que el registro se realizó correctamente
        return NextResponse.json({ message: 'Registro exitoso' }, { status: 200 })

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                error: `Registration failed: ${error.message}`
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