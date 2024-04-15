import { connectDB } from "@/lib/mongodb";
import { AdminUser } from "@/models/admin.user";
import { handleError } from "@/utils/utils";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Definir el esquema de validación con Zod
const userSchema = z.object({
    email: z.string().trim().min(3, { message: "El email debe tener al menos 3 caracteres" }),
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    confirmPassword: z.string(),
    fullname: z.string().min(3, { message: "El email debe tener al menos 3 caracteres" }),
    role: z.enum(["admin", "redactor en jefe", "redactor", "editor", "publicista"]),
    token: z.object({
        exp: z.number(),
        email: z.string(),
        fullname: z.string(),
        role: z.string(),
        iat: z.number(),
    }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
});;


export async function POST(req: NextRequest) {
    // Obtener los datos del cuerpo de la solicitud
    const { email, password, confirmPassword, fullname, role, token } = await req.json()

    console.log(email)

    // Validar los datos con el esquema definido
    const validation = userSchema.safeParse({ email, password, confirmPassword, fullname, role, token });
    if (!validation.success) {

        let errorMessage = '';

        validation.error.issues.forEach(issue => {
            errorMessage += issue.message + '\n';
        })

        return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    try {
        // Conectar a la base de datos
        await connectDB();

        // Verificar si el usuario autenticado tiene permisos de administrador
        const userAuthorized = await AdminUser.findOne({ email: token?.email }).select("-password");

        if (!userAuthorized || userAuthorized.role !== 'admin') {
            // Retornar un mensaje de error indicando que el usuario no tiene permisos para crear usuarios
            return NextResponse.json({ error: 'No tienes permiso para crear usuarios' }, { status: 403 });
        }

        // Verificar si ya existe un usuario con el correo electrónico proporcionado
        const userFound = await AdminUser.findOne({ email });

        if (userFound) {
            // Retornar un mensaje de error indicando que el correo electrónico ya ha sido registrado
            return NextResponse.json({ error: 'Este correo electrónico ya ha sido registrado' }, { status: 400 });
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
        return handleError(error);
    }
}