import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Política de privacidad'
}

export default function PoliticaPrivacidadLayout({ children }: { children: React.ReactNode }) {

    return (
        <section className="min-h-screen bg-background text-foreground relative ">
            {children}
        </section>
    )
}