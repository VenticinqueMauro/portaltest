import { connectDB } from "@/lib/mongodb";
import { ClientUser } from "@/models/client.user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const { email, password } = await req.json();

    try {
        await connectDB();

        const userFound = await ClientUser.findOne({ email })

        if (!userFound) {
            return NextResponse.json({ error: 'This email is not associated with any registered account' }, { status: 404 });
        }

        const hashPassword = userFound.password;

        const compareHashPassword = bcrypt.compareSync(password, hashPassword);

        if (!compareHashPassword) {
            return NextResponse.json({ error: 'Incorrect password. Please check and try again.' }, { status: 401 });
        }

        const fullname = userFound.fullname;

        const tokenData = {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            email,
            fullname,
            subscribed: userFound?.subscribed,
            emailVerified: userFound?.emailVerified
        }

        const token = jwt.sign(tokenData, `${process.env.JWT_KEY_CLIENT}`)

        const response = NextResponse.json({ message: 'Login Succesfull' }, { status: 200 })

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
                error: `Login failed ${error.message}`
            }, {
                status: 400
            })
        }
    }
}