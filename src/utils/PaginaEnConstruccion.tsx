import { Construction } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function PaginaEnConstruccion() {
    return (
        <div className="mx-auto max-w-md text-center px-3 py-10 h-screen">
            <Construction className="mx-auto h-12 w-12 text-tdn" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Página en Construcción</h1>
            <p className="mt-4 text-muted-foreground">
                Lo sentimos, pero esta página está actualmente en construcción y aún no está disponible. Por favor, vuelve a visitarnos pronto para
                actualizaciones.
            </p>
            <div className="mt-6">
                <Link
                    href="/"
                    className="inline-flex items-center rounded-md bg-tdn px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-tdn/90 focus:outline-none focus:ring-2 focus:ring-tdn focus:ring-offset-2"
                    prefetch={false}
                >
                    Ir a la Página Principal
                </Link>
            </div>
        </div>
    )
}
