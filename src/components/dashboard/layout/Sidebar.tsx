'use client';

import { LayoutPanelTop, Megaphone, Newspaper, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    {
        title: 'Usuarios',
        href: '/users',
        icon: <UserPlus className='w-5 h-5' />
    },
    {
        title: 'Noticias',
        href: '/dashboard',
        icon: <Newspaper className='w-5 h-5' />
    },
    {
        title: 'Publicidades',
        href: '/publicidades',
        icon: <Megaphone className='w-5 h-5' />
    },
    {
        title: 'Editar Home',
        href: '/editar-home',
        icon: <LayoutPanelTop className='w-5 h-5' />
    },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className='w-[200px] flex-shrink-0 flex flex-col fixed top-0 left-0 bottom-0 overflow-y-auto border-r p-6 space-y-10'>
            <span className=''>TDN Admin Panel</span>
            <div className='flex flex-col gap-8'>
                {navItems.map(item => (
                    <Link key={item.title} href={item.href === '/dashboard' ? '/dashboard' : `/dashboard${item.href}`} className={`${pathname.endsWith(item.href) ? 'text-foreground bg-muted-foreground/5 shadow' : 'text-muted-foreground'} flex gap-1 items-center hover:text-foreground py-1 px-2 rounded `}>
                        {item.icon}
                        {item.title}
                    </Link>
                ))}
            </div>
        </aside>
    );
}
