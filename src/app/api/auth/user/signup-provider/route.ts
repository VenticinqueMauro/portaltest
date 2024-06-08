import { connectDB } from "@/lib/mongodb";
import { ClientUser } from "@/models/client.user";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
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

        const tokenData = {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, 
            email,
            fullname,
            subscribed: user?.subscribed,
            emailVerified: user?.emailVerified
        }

        const token = jwt.sign(tokenData, `${process.env.JWT_KEY_CLIENT}`);

        const response = NextResponse.json({ message: 'Inicio de sesión exitoso' }, { status: 200 });

        response.cookies.set('portal_app_client', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 30, 
            path: '/',
        });

        return response;

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                error: `Fallo en el registro: ${error.message}` 
            }, {
                status: 400
            });
        } else {
            return NextResponse.json({
                error: 'Ha ocurrido un error inesperado'
            }, {
                status: 500 
            });
        }
    }
}