import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Admin Login',
    description: 'Generated by create next app',
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {

    return (
        <section className="flex justify-center items-center h-full">
            {children}
        </section>
    )
}