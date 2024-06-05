import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel";
import Link from 'next/link';
import { Button } from '../ui/button';
import Image from "next/image";

const sections = [
    {
        title: "Portada",
        href: "/"
    },
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
        <nav className='bg-tdn  xl:px-0 pt-3'>
            <div className='max-w-7xl mx-auto text-white flex items-end justify-between px-3 relative'>
                <Link href='/'>
                    <Image
                        src='/logoblanco.png'
                        alt='logo tendencias de noticias'
                        width={300}
                        height={200}
                        loading="lazy"
                        className="w-auto h-auto mb-3"
                    />
                </Link>
                <div className='space-x-4 flex flex-col md:flex-row justify-between items-end  '>
                    <Button variant='ghost'>Iniciar sesión</Button>
                    <Button variant='secondary' >Registrarme</Button>
                </div>
            </div>
            <div className='bg-black'>
                <Carousel className="px-3 text-white md:hidden mt-2">
                    <CarouselContent className="-ml-1 gap-8">
                        {sections.map((section) => (
                            <CarouselItem key={section.title} className={`pl-2 md:pl-1 basis-auto`}>
                                <Link href={section.href} className="font-medium py-2 text-sm  flex justify-center gap-1 ">
                                    {section.title}
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
                <div className='max-w-7xl mx-auto items-center gap-10 py-2 mt-2 hidden md:flex px-3'>
                    {sections.map((section) => (
                        <Link key={section.title} href={section.href} className=" text-white py-1 text-sm md:text-lg  flex justify-center gap-1 ">
                            {section.title}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}
