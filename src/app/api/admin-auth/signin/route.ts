import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/user";
import bcrypt from "bcrypt";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const { email, password, fullname } = await req.json();

    if (password.length < 6) return NextResponse.json({ error: 'The password must be at least 6 characters long' });

    try {
        await connectDB();

        // VERIFICACION DE ROLE PARA CREACION DE USUARIOS ADMINISTRADORES 
        // const token = cookies().get('portal_app')?.value

        // if (!token) {
        //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        // const decodedToken: any = verify(token, `${process.env.JWT_KEY}`);

        // if (!decodedToken || decodedToken.role !== 'admin') {
        //     return NextResponse.json({ error: 'You do not have permission to create users' }, { status: 403 });
        // }
        //////////////////////////////////////////////////////////////////////

        const userFound = await User.findOne({ email });

        if (userFound) {
            return NextResponse.json({ message: 'This email has already been registered' }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email,
            fullname,
            password: hashedPassword
        });

        await user.save();

        return NextResponse.json({ message: 'Registration successful' }, { status: 200 })

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                error: `Registration failed: ${error.message}`
            }, {
                status: 400
            });
        }
    }


}