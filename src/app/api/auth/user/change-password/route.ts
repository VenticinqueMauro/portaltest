import { connectDB } from "@/lib/mongodb";
import { ClientUser } from "@/models/client.user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function PUT(req: NextRequest) {

    const { password, token } = await req.json();

    if (!token) {
        return NextResponse.json({ error: 'No token provided' })
    }

    try {
        await connectDB();

        const userFound = await ClientUser.findOne({ resetPasswordToken: token });

        if (!userFound) {
            return NextResponse.json({ error: 'Invalid token' })
        }

        const resetPasswordExpires = userFound.resetPasswordTokenExpiry;


        if (!resetPasswordExpires || resetPasswordExpires.getTime() < Date.now()) {
            return NextResponse.json({ error: 'Token expired' })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await userFound.updateOne({ password: hashedPassword, resetPasswordToken: null, resetPasswordTokenExpiry: null });

        return NextResponse.json({ message: 'Password changed successfully' }, { status: 200 })

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                error: `Error: ${error.message}`
            }, {
                status: 400
            })
        }
    }


}