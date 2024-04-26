import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Admin Login | Cotizaciones',
    description: 'Generated by create next app',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {

    return (
        <section className="flex justify-center items-center h-full">
            {children}
        </section>
    )
}