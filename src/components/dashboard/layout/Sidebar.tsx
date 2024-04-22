'use client';


import { LayoutPanelTop, Megaphone, Newspaper, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NotificationBell from './NotificationBell';
import { AdminUser, UserRole } from '@/types/news.types';
import { AdminProfile } from './AdminProfile';

interface Props {
    hasPendingNews: boolean;
    user: AdminUser
}


export default function Sidebar({ hasPendingNews, user }: Props) {
    const pathname = usePathname();

    const navItems = [
        {
            title: 'Usuarios',
            href: '/users',
            icon: <UserPlus className='w-5 h-5' />,
            show: user.role === 'admin'
        },
        {
            title: 'Noticias',
            href: '/dashboard',
            icon: <Newspaper className='w-5 h-5' />,
            show: true
        },
        {
            title: 'Publicidades',
            href: '/publicidades',
            icon: <Megaphone className='w-5 h-5' />,
            show: true
        },
        {
            title: 'Editar Home',
            href: '/editar-home',
            icon: <LayoutPanelTop className='w-5 h-5' />,
            show: true
        },
    ];

    const visibleNavItems = navItems.filter(item => item.show);


    return (
        <aside className='w-[200px] flex-shrink-0 flex flex-col fixed top-0 left-0 bottom-0 overflow-y-auto border-r py-6 px-1 space-y-10'>
            <span className='flex justify-between items-center relative text-muted-foreground px-2 '>
                <AdminProfile avatar={user.avatar?.url || ''} email={user.email} fullname={user.fullname} role={user.role} />
                <NotificationBell hasPendingNews={hasPendingNews} />
            </span>
            <div className='flex flex-col gap-8'>
                {visibleNavItems.map(item => (
                    <Link key={item.title} href={item.href === '/dashboard' ? '/dashboard' : `/dashboard${item.href}`} className={`${pathname.endsWith(item.href) ? 'text-foreground bg-muted-foreground/5 shadow' : 'text-muted-foreground'} flex gap-1 items-center hover:text-foreground py-1 px-2 rounded `}>
                        {item.icon}
                        {item.title}
                    </Link>
                ))}
            </div>
        </aside>
    );
}
