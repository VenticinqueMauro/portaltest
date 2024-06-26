'use client';

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
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 dark:text-gray-400 list-none">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-white sm:text-center dark:text-gray-400">© 2024 <a href="#" className="hover:underline">Insiders™</a>. All Rights Reserved.</span>
            </div>
        </footer>


    )
}
