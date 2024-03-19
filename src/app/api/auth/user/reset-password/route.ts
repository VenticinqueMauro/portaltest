import { sendEmail } from "@/actions/emails/verifyEmail";
import { ResetPasswordEmailTemplate } from "@/components/EmailTemplates/ResetPassword.email";
import { connectDB } from "@/lib/mongodb";
import { ClientUser } from "@/models/client.user";
import crypto from 'crypto';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const { email } = await req.json();

    try {
        await connectDB();

        const userFound = await ClientUser.findOne({ email });

        if (!userFound) {
            return NextResponse.json({ message: 'This email has not been registered' }, { status: 400 })
        }

        const resetPasswordToken = crypto.randomBytes(32).toString("base64url");
        const today = new Date();
        const expiryDate = new Date(today.setDate(today.getDate() + 1)); // 24 hours from now

        await userFound.updateOne({ resetPasswordToken: resetPasswordToken, resetPasswordExpires: expiryDate });

        await sendEmail({
            from: 'Portal Test <onboarding@resend.dev>',
            to: [email],
            subject: "Reset Password",
            react: ResetPasswordEmailTemplate({ email, resetPasswordToken }) as React.ReactElement,
        })

        return NextResponse.json({ message: 'Reset password successful' }, { status: 200 })

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                error: `Reset password failed: ${error.message}`
            }, {
                status: 400
            })
        }
    }

}