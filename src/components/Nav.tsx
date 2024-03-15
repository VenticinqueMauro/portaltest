'use client';


import { signIn, signOut, useSession } from "next-auth/react";


export default function Nav() {

    const { data: session } = useSession();
    console.log(session)
    return (
        <nav className="flex justify-between px-6 py-3 items-center w-full fixed top-0 left-0">
            <button onClick={() => signIn("google")}>Sign In Google</button>
            <button onClick={() => signIn("twitter")}>Sign In Twitter</button>
            <button onClick={() => signOut()}>Sign Out</button>
        </nav>
    )
}
