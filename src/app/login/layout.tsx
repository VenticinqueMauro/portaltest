import { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
    title: 'Login de usuarios',
    description: 'Generated by create next app',
}


export default function LoginUsersLayout({ children }: { children: React.ReactNode }) {

    return (
        <section className="min-h-screen bg-background text-foreground relative flex ">
            {children}
            <Toaster className="mx-auto" />
        </section>
    )
}