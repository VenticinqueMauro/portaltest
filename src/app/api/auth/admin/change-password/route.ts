import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AdminUser } from "@/models/admin.user";
import { z } from "zod";

// Definir el esquema de validación con Zod
const changePasswordSchema = z.object({
    email: z.string().trim().min(3, { message: "El email debe tener al menos 3 caracteres" }),
    oldPassword: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    newPassword: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    confirmNewPassword: z.string(),

}).refine(data => data.newPassword === data.confirmNewPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
}).refine(data => data.oldPassword !== data.newPassword && data.confirmNewPassword, {
    message: "La nueva contraseña no puede ser igual a la antigua",
    path: ["newPassword"]
});


export async function POST(request: Request) {

    const { email, oldPassword, newPassword, confirmNewPassword } = await request.json();

    const validation = changePasswordSchema.safeParse({ email, oldPassword, newPassword, confirmNewPassword, });
    if (!validation.success) {

        let errorMessage = '';

        validation.error.issues.forEach(issue => {
            errorMessage += issue.message + '\n';
        })

        return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    try {
        await connectDB();

        const userFound = await AdminUser.findOne({ email });

        if (!userFound) {
            return NextResponse.json({ error: "No se encontro un usuario con este email" }, {
                status: 404
            });
        }

        const hashOldPass = userFound.password;

        const compareHashOldPass = bcrypt.compareSync(oldPassword, hashOldPass);

        if (!compareHashOldPass) {
            return NextResponse.json({ error: "Contraseña Incorrecta" }, {
                status: 401
            });
        }

        const hashNewPass = bcrypt.hashSync(newPassword, 12);

        userFound.password = hashNewPass;

        await userFound.save();

        const fullname = userFound.fullname;

        const tokenData = {
            id: userFound._id,
            email,
            fullname
        }

        const token = jwt.sign(tokenData, `${process.env.JWT_KEY}`);

        const response = NextResponse.json({ message: 'Contraseña cambiada con exito' }, { status: 201 })
        response.cookies.set('portal_app', token);
        return response;

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message
            }, {
                status: 400
            });
        }
    }
}