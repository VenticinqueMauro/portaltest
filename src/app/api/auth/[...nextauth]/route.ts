import { handleLoginWithProviders } from "@/actions/auth-users-page/handleLoginWithProviders";
import { connectDB } from "@/lib/mongodb";
import { ClientUser } from "@/models/client.user";
import jwt from "jsonwebtoken";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        })
    ],
    callbacks: {
        async signIn({ user }) {
            const { email, name, image } = user;

            await connectDB();

            await handleLoginWithProviders({ email, name, image });

            const userFound = await ClientUser.findOne({ email });

            const tokenData = {
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
                email,
                fullname: userFound?.fullname,
                subscribed: userFound?.subscribed,
                emailVerified: userFound?.emailVerified,
                id: userFound?._id,
            }

            const token = jwt.sign(tokenData, `${process.env.JWT_KEY_CLIENT}`);

            cookies().set({
                name: 'portal_app_client',
                value: token,
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 30,
                path: '/',
            })

            return true
        }
    },
})

export { handler as GET, handler as POST };
