import QuotesContainer from '@/components/cotizaciones/Quotes.container';
import Navbar from '@/components/navbar/Navbar';
import { Ads } from '@/types/news.types';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const ContainerHome = dynamic(() => import('@/components/home/Container.home'), { loading: () => <div>Loading...</div> });

async function getAds() {
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

    const ads: Ads = await getAds();

    return (
        <div>
            <div className="h-[170px] bg-publicidad col-span-12 flex justify-center items-center hover:border-primary border-2 relative">
                <Image
                    src={ads.home.portada?.media?.desktop?.top?.url as string}
                    alt={`publicidad`}
                    width={970}
                    height={150}
                    priority
                />
            </div>
            <Navbar />
            <QuotesContainer />
            <ContainerHome ads={ads} />
        </div>
    )
}
