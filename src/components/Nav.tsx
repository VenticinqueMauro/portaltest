'use client';


import { signIn, signOut, useSession } from "next-auth/react";


export default function Nav() {

    const { data: session } = useSession();
    console.log(session)
    return (
        <nav>
            NEXT AUTH GOOGLE
            <div>
                <button onClick={() => signIn()}>Sign In</button>
                <button onClick={() => signOut()}>Sign Out</button>
            </div>
        </nav>
    )
}
