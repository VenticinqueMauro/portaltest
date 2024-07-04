import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Términos y condiciones'
}

export default function TermConditionLayout({ children }: { children: React.ReactNode }) {

    return (
        <section className="min-h-screen bg-background text-foreground relative ">
            {children}
        </section>
    )
}