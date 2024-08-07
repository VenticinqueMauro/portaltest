import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Cotizaciones',
    description: 'Generated by create next app',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {

    return (
        <section className="py-14">
            {children}
        </section>
    )
}