import PublicidadContainer from "@/components/dashboard/publicidades/PublicidadContainer";
import DashboardEditorSkeleton from "@/components/skeleton/DashboardEditorSkeleton";
import { Ads } from "@/types/news.types";
import { initialAds } from "@/utils/utils";

async function getAllAds() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/ads`, { cache: 'no-store' });

    const { data } = await response.json();

    return data;
}

export default async function page() {

    const result = await getAllAds();
    if (result) {
        const { ads: allAds }: { ads: Ads } = result;
        return (
            <div>
                <PublicidadContainer allAds={allAds} />
            </div>
        )
    } else {
        return (
            <div>
                <PublicidadContainer allAds={initialAds} />
            </div>
        )
    }
}