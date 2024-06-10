'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
    title: string;
    href: string;
}

export default function NavItem({ title, href }: Props) {

    const pathname = usePathname();

    return (
        <Link key={title} href={href} className={`${pathname.endsWith(encodeURI(href)) && 'navItemActive'} text-white py-1 text-sm md:text-lg  flex justify-center gap-1 navItem`}>
            {title}
        </Link>
    )
}
