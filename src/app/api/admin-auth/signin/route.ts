import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/user";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const { email, password, fullname } = await req.json();

    if (password.length < 6) return NextResponse.json({ error: 'The password must be at least 6 characters long' });

    try {
        await connectDB();

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