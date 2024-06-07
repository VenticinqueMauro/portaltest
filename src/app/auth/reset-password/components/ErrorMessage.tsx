'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ErrorMessage() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/reset-password');
        }, 3000);

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, [router]);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 px-6 w-full">
            <div className="bg-white text-tdn p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-bold mb-2">¡Error de verificación!</h2>
                <p className="text-lg">El token es inválido o ha caducado.</p>
                <p className="text-sm text-gray-600 mt-4">Serás redirigido a la página de reseteo de contraseña en instantes...</p>
            </div>
        </div>
    );
}
