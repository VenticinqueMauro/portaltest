import { sendEmail } from "@/actions/emails/verifyEmail";
import { VerifyEmailTemplate } from "@/components/EmailTemplates/Verify.email";
import { connectDB } from "@/lib/mongodb";
import { ClientUser } from "@/models/client.user";
import bcrypt from "bcrypt";
import crypto from 'crypto';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const { email, password, fullname } = await req.json();

    try {
        await connectDB();

        const userFound = await ClientUser.findOne({ email });

        if (userFound) {
            return NextResponse.json({ message: 'This email has already been registered' }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new ClientUser({
            email,
            fullname,
            password: hashedPassword,
        });

        await user.save();

        const emailVerificationToken = crypto.randomBytes(32).toString("base64url");

        await user.updateOne({ emailVerificationToken: emailVerificationToken });

        await sendEmail({
            from: 'Portal Test <onboarding@resend.dev>',
            to: [email],
            subject: "Email Verification",
            react: VerifyEmailTemplate({email, emailVerificationToken}) as React.ReactElement,
        })

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