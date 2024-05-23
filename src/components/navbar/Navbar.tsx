import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

export default function Navbar() {
    return (
        <nav className='bg-tdn px-3 xl:px-0 pt-6 pb-2'>
            <ul className='max-w-7xl mx-auto text-white flex items-center justify-between'>
                <Link href='/'>
                    {/* <Image src='/portada-dashboard.png' alt='logo' width={100} height={100} /> */}
                    <p className='text-white text-3xl'>LOGO</p>
                </Link>
                <div className='space-x-4'>
                    <Button variant='ghost'>Iniciar sesión</Button>
                    <Button variant='secondary' >Registrarme</Button>
                </div>
            </ul>
        </nav>
    )
}
