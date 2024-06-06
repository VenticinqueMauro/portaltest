'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessMessage() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/login');
        }, 3000);

        return () => clearTimeout(timer); 
    }, [router]);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white text-tdn p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-bold mb-2">¡Registro completado con éxito!</h2>
                <p className="text-lg">Tu email ha sido verificado correctamente.</p>
                <p className="text-sm text-gray-600 mt-4">Serás redirigido a la página de login en instantes...</p>
            </div>
        </div>
    );
}
