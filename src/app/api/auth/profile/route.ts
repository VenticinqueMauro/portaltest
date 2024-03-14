import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/user";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {

    const portal_app = cookies().get('portal_app')?.value

    if (!portal_app) {
        return NextResponse.json({ message: 'No token exist' }, { status: 404 })
    }

    try {
        await connectDB();

        const decodedToken: any = verify(portal_app, `${process.env.JWT_KEY}`);

        if (decodedToken.exp * 1000 < Date.now()) {
            return NextResponse.json({ error: 'Token has expired' }, { status: 401 });
        }

        const user = await User.findOne({ email: decodedToken.email }).select("-password")

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