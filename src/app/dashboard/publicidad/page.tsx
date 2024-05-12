import PublicidadContainer from "@/components/dashboard/publicidades/PublicidadContainer";
import { Ads } from "@/types/news.types";

async function getAllAds() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/ads`, { cache: 'no-store' });

    const { data } = await response.json();

    return data;
}

export default async function page() {

    const { ads: allAds }: { ads: Ads } = await getAllAds();


    return (
        <div>
            <PublicidadContainer allAds={allAds} />
        </div>
    )
}
