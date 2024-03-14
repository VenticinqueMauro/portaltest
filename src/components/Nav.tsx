'use client';
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Nav() {

    const { user, isLoaded } = useUser();

    return (
        <div className="flex gap-4 items-center justify-between fixed top-0 left-0 w-full px-6 border-b py-3">
            <a href="/">Home </a>
            {
                !user &&
                <>
                    <SignUpButton afterSignUpUrl="/" />
                    <SignInButton afterSignInUrl="/" />
                </>
            }
            {
                isLoaded && user &&
                <div className="flex gap-2 items-center">
                    <Link href="/dashboard">Dashboard </Link>
                    <UserButton afterSignOutUrl="/" />
                </div>
            }
        </div>
    )
}
