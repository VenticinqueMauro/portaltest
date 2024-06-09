import { connectDB } from "@/lib/mongodb";
import { ClientUser } from "@/models/client.user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {

    const { email, fullname } = await request.json();

    try {
        await connectDB();

        const userFound = await ClientUser.findOne({ email });

        if (userFound) {
            return NextResponse.json({ message: 'Este correo electrónico ya ha sido registrado' }, { status: 400 })
        }

        const tempPassword = `temp_${Math.random().toString(36).substr(2, 10)}`;
        const hashedPassword = await bcrypt.hash(tempPassword, 10); // Hashea la contraseña

        const user = new ClientUser({
            email,
            fullname,
            emailVerified: true,
            password: hashedPassword
        });

        await user.save();

        return NextResponse.json({ message: 'Usuario registrado con éxito' }, { status: 200 })

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