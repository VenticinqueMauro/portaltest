'use client';

import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {

    const pathname = usePathname();

    const restricted = ['signup', 'login', 'dashboard', 'reset', 'password'];

    if (restricted.some(restrictedPath => pathname.includes(restrictedPath))) {
        return;
    }

    return (
        <footer className="bg-tdn rounded-lg shadow dark:bg-gray-900">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <Image src="/logoblanco.png" alt='logo tendencias de noticias'
                            width={150}
                            height={200}
                            loading="lazy"
                            className=""
                        />
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white dark:text-gray-400 my-6">
                    <div>
                        <h3 className="font-semibold mb-2">Contacto Redacción</h3>
                        <div className="flex gap-1 items-center text-sm">
                            <Mail size={16} />
                            <a href="mailto:redaccion@tendenciadenoticias.com.ar" className="hover:underline">redaccion@tendenciadenoticias.com.ar</a>
                        </div>
                        <div className="flex gap-1 items-center text-sm">
                            <Phone size={16} />
                            381-xxx-xxx
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Contacto Comercial</h3>
                        <div className="flex gap-1 items-center text-sm">
                            <Mail size={16} />
                            <a href="mailto:comercial@tendenciadenoticias.com.ar" className="hover:underline">comercial@tendenciadenoticias.com.ar</a>
                        </div>
                        <div className="flex gap-1 items-center text-sm">
                            <Phone size={16} />
                            381-xxx-xxx
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Editor Responsable</h3>
                        <p className="text-sm">JOSE ROMERO SILVA</p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Dirección</h3>
                        <p className="text-sm">Av. Soldatti 380 - 4to Piso Oficina 416 - San Miguel de Tucumán</p>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                {/* <span className="block text-sm text-white sm:text-center dark:text-gray-400">© 2024 <a href="#" className="hover:underline">Insiders™</a>. All Rights Reserved.</span> */}
                <div className="flex flex-col md:flex-row justify-between items-center mt-6 ">
                    <ul className="flex ml-0 space-x-6 text-sm font-medium text-white list-none">
                        <li>
                            <Link href="/politica-privacidad" className="hover:underline">Política de privacidad</Link>
                        </li>
                        <li>
                            <Link href="/terminos-condiciones" className="hover:underline">Términos y condiciones</Link>
                        </li>
                    </ul>
                    <span className="block text-sm text-white text-center md:text-right mt-4 md:mt-0 dark:text-gray-400">
                        © 2024 <a href="#" className="hover:underline">Insiders™</a>. All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>

    )
}
