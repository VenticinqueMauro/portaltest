import { connectDB } from "@/lib/mongodb";
import { AdminUser } from "@/models/admin.user";
import bcrypt from "bcrypt";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const { email, password, fullname, role } = await req.json();

    try {
        await connectDB();

        // VERIFICACION DE ROLE PARA CREACION DE USUARIOS ADMINISTRADORES 
        const token = cookies().get('portal_app')?.value

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const decodedToken: any = verify(token, `${process.env.JWT_KEY}`);

        if (decodedToken.exp * 1000 < Date.now()) {
            return NextResponse.json({ error: 'Token has expired' }, { status: 401 });
        }

        const userAuthorized = await AdminUser.findOne({ email: decodedToken.email }).select("-password")

        if (!userAuthorized || userAuthorized.role !== 'admin') {
            return NextResponse.json({ error: 'You do not have permission to create users' }, { status: 403 });
        }
        //////////////////////////////////////////////////////////////////////

        const userFound = await AdminUser.findOne({ email });

        if (userFound) {
            return NextResponse.json({ message: 'This email has already been registered' }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new AdminUser({
            email,
            fullname,
            password: hashedPassword,
            role
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