'use client';


import { AdminUser } from '@/types/news.types';
import { CircleDollarSign, LayoutPanelTop, Megaphone, Newspaper, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AdminProfile } from './AdminProfile';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const NotificationBell = dynamic(() => import('./NotificationBell'), { ssr: false, loading: () => <span className='absolute top-0 right-2 w-6 h-6 block bg-gray-200 animate-pulse rounded-full'></span> });

interface Props {
    hasPendingNews: boolean;
    user?: AdminUser
}


export default function Sidebar({ hasPendingNews, user }: Props) {
    const pathname = usePathname();

    const navItems = [
        {
            title: 'Usuarios',
            href: '/usuarios',
            icon: <UserPlus className='w-4 h-4' />,
            show: user?.role === 'admin'
        },
        {
            title: 'Noticias',
            href: '/noticias',
            icon: <Newspaper className='w-4 h-4' />,
            show: user?.role !== 'publicista'
        },
        {
            title: 'Publicidad',
            href: '/publicidad',
            icon: <Megaphone className='w-4 h-4' />,
            show: user?.role === 'admin' || user?.role === 'publicista'
        },
        {
            title: 'Editar Home',
            href: '/editar-home',
            icon: <LayoutPanelTop className='w-4 h-4' />,
            show: user?.role === 'admin' || user?.role === 'editor'
        },
        {
            title: 'Cotizaciones',
            href: '/cotizaciones',
            icon: <CircleDollarSign className='w-4 h-4' />,
            show: user?.role === 'admin' || user?.role === 'editor'
        }
    ];

    return (
        <aside className='w-[200px] flex-shrink-0 flex flex-col fixed top-0 left-0 bottom-0 overflow-y-auto border-r py-6 px-1 space-y-10'>
            <span className='flex justify-between items-center relative text-muted-foreground px-2 '>
                <AdminProfile avatar={user?.avatar?.url || ''} email={user?.email} fullname={user?.fullname} role={user?.role} />
                <NotificationBell hasPendingNews={hasPendingNews} role={user?.role} />
            </span>
            <div className='flex flex-col gap-4'>
                {navItems.map(item => (
                    <Link key={item.title} href={item.href === '/dashboard' ? '/dashboard' : `/dashboard${item.href}`} className={`${pathname.endsWith(item.href) ? 'text-foreground bg-muted-foreground/5 shadow' : 'text-foreground/80'} flex gap-1 items-center hover:text-foreground py-1 px-2 rounded ${!item.show && 'pointer-events-none opacity-60'}`}>
                        {item.icon}
                        {item.title}
                    </Link>
                ))}
            </div>
            <Link href='/' >
                <Image src='/portada-dashboard.png' className="fixed -bottom-10 left-0 w-[180px]" width={600} height={600} alt="portada" />
            </Link>
        </aside>
    );
}
