import Sidebar from "@/components/dashboard/Sidebar"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Admin Panel',
    description: 'Generated by create next app',
}


export default function layout({ children }: { children: React.ReactNode }) {

    return (
        <section className="min-h-screen bg-background text-foreground relative flex ">
            <Sidebar />
            <div className="flex-1 ml-56 overflow-y-auto p-6">
                {children}
            </div>
        </section>
    )
}