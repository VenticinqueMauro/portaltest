'use client';

import Link from 'next/link';
import { toast } from 'sonner';
import { UserContextType, useUser } from '../provider/ContextProvider';
import { Button } from '../ui/button';

interface ClientUser {
    email: string;
    fullname: string;
    emailVerified: boolean;
    suscribed: boolean;
}

const handleLogout = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/auth/user/logout`, {
            cache: 'no-store',
            method: 'DELETE',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.json();
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
    }
};

export default function ButtonsByLogin() {

    const context: UserContextType = useUser();

    const { setUser, handleRefresh } = context;
    const { user }: { user: ClientUser } = context;

    const Logout = async () => {
        const result = await handleLogout();

        if (result.message) {
            toast.success(result.message);
            setUser(null);
            handleRefresh();
        }
    };

    return (
        <div className='md:space-x-4 flex flex-col md:flex-row justify-between items-center '>
            {user && user.emailVerified ? (
                <>
                    <div className='flex flex-wrap justify-center items-center gap-1 mb-2 md:mb-0 text-xs md:text-base'>
                        <p>Hola! 👋</p>
                        <b className='md:hidden'>{user?.fullname?.split(" ")[0]}</b>
                        <b className='hidden md:inline-flex'>{user?.fullname}</b>
                    </div>
                    <Button variant='secondary' onClick={Logout}>
                        Logout
                    </Button>
                </>
            ) : (
                <>
                    <Button variant='ghost' asChild>
                        <Link href='/login'>Iniciar sesión</Link>
                    </Button>
                    <Button variant='secondary' asChild>
                        <Link href='/signup'>Registrarme</Link>
                    </Button>
                </>
            )}
        </div>
    );
}
