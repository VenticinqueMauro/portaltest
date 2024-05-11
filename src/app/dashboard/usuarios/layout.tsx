import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Usuarios',
    description: 'Generated by create next app',
}


export default function layout({ children }: { children: React.ReactNode }) {

    return (
        <section>
            {children}
        </section>
    )
}