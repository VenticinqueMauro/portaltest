import { connectDB } from "@/lib/mongodb";
import { ClientUser } from "@/models/client.user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const token = req.nextUrl.searchParams.get('token');

    if (!token) {
        return NextResponse.json({ error: 'No token provided' })
    }

    try {
        await connectDB();

        const userFound = await ClientUser.findOne({ emailVerificationToken: token });

        if (!userFound) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 404 })
        }

        await userFound.updateOne({ emailVerified: true, emailVerificationToken: null });

        return NextResponse.json({ message: 'Email verified successfully' }, { status: 200 });
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