import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel";
import Link from 'next/link';
import { Button } from '../ui/button';

const sections = [
    {
        title: "Política",
        href: "/politica"
    },
    {
        title: "Eco & negocios",
        href: "/eco & negocios"
    },
    {
        title: "Deportes",
        href: "/deportes"
    },
    {
        title: "Tendencias",
        href: "/tendencias"
    },
    {
        title: "Portal de la caña",
        href: "/portalcana"
    },
]

export default function Navbar() {
    return (
        <nav className='bg-tdn  xl:px-0 pt-6 '>
            <ul className='max-w-7xl mx-auto text-white flex items-center justify-between px-3'>
                <Link href='/'>
                    {/* <Image src='/portada-dashboard.png' alt='logo' width={100} height={100} /> */}
                    <p className='text-white text-3xl'>LOGO</p>
                </Link>
                <div className='space-x-4'>
                    <Button variant='ghost'>Iniciar sesión</Button>
                    <Button variant='secondary' >Registrarme</Button>
                </div>
            </ul>
            <div className='bg-black'>
                <Carousel className="px-3 text-white md:hidden mt-2">
                    <CarouselContent className="-ml-1 gap-8">
                        {sections.map((section) => (
                            <CarouselItem key={section.title} className={`pl-2 md:pl-1 basis-auto`}>
                                <Link href={section.href} className="font-medium py-2 text-sm  flex justify-center gap-1">
                                    {section.title}
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
                <div className='max-w-7xl mx-auto items-center gap-10 py-2 mt-2 hidden md:flex px-3'>
                    {sections.map((section) => (
                        <Link key={section.title} href={section.href} className=" text-white py-1 text-xs md:text-sm  flex justify-center gap-1">
                            {section.title}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}
