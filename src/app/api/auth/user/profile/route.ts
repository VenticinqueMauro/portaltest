import { connectDB } from "@/lib/mongodb";
import { ClientUser } from "@/models/client.user";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {

    const token = cookies().get('portal_app_client')?.value

    if (!token) {
        return NextResponse.json({ message: 'No token exist' }, { status: 404 })
    }

    try {
        await connectDB();

        const decodedToken: any = verify(token, `${process.env.JWT_KEY_CLIENT}`);

        if (decodedToken.exp * 1000 < Date.now()) {
            return NextResponse.json({ error: 'Token has expired' }, { status: 401 });
        }

        const user = await ClientUser.findOne({ email: decodedToken.email }).select(["-password", "-emailVerificationToken", "-resetPasswordTokenExpiry", "-resetPasswordExpiry", "-resetPasswordToken"]);

        console.log(user)

        if (!user) return NextResponse.json({ error: "User not found", authenticate: false }, { status: 400 });

        return NextResponse.json({ success: true, data: user, authenticate: true });


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