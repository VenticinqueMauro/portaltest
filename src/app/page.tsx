import QuotesContainer from '@/components/cotizaciones/Quotes.container';
import Navbar from '@/components/navbar/Navbar';
import { Ads } from '@/types/news.types';
import { blurImage } from '@/utils/blurImage';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

const ContainerHome = dynamic(() => import('@/components/home/Container.home'), { loading: () => <div>Loading...</div> });

async function getHomeAds() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/ads`, { next: { revalidate: 60 } });

        if (!response.ok) {
            console.log('Error al obtener publicidades de la home');
        }
        const { data: { ads } } = await response.json();
        return ads;
    } catch (error) {
        console.log(error)
    }
}

export default async function page() {

    const ads: Ads = await getHomeAds();

    return (
        <section>
            {/* PUBLICIDAD DESKTOP  */}
            <div className="p-3 h-[170px] bg-publicidad col-span-12 hidden md:flex justify-center items-center relative">
                <Link href={`${ads.home.portada?.media?.desktop?.top?.link as string}`} target='_blank' rel='noreferrer'>
                    <Image
                        src={ads.home.portada?.media?.desktop?.top?.url as string}
                        alt={`publicidad`}
                        width={970}
                        height={150}
                        placeholder="blur"
                        blurDataURL={blurImage}
                        priority
                        aria-label="Publicidad principal"
                        className='object-cover'
                    />
                </Link>
            </div>
            {/* PUBLICIDAD MOBILE  */}
            <div className="h-[120px] bg-publicidad col-span-12 flex md:hidden justify-center items-center relative">
                <Link href={`${ads.home.portada?.media?.mobile?.top?.link as string}`} target='_blank' rel='noreferrer' >
                    <Image
                        src={ads.home.portada?.media?.mobile?.top?.url as string}
                        alt={`publicidad`}
                        fill
                        className="object-contain p-3"
                        placeholder="blur"
                        blurDataURL={blurImage}
                        priority
                        aria-label="Publicidad principal"
                    />
                </Link>
            </div>

            <div className='sticky top-0 left-0 z-20'>
                <Navbar />
                <QuotesContainer />
            </div>
            <ContainerHome ads={ads} />
        </section>
    )
}
