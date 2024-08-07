import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, Smartphone } from "lucide-react";
import { AdPosition, AdSectionName, Ads } from "@/types/news.types";
import { Dispatch, SetStateAction } from "react";
import PortadaDesktop from "./PortadaDesktop";
import PortadaMobile from "./PortadaMobile";


interface Props {
    allAds: Ads;
    sectionName: string;
    sectionPosition: AdPosition | undefined;
    setSectionPosition: Dispatch<SetStateAction<AdPosition | undefined>>
}

export default function PortadaContainer({ allAds, sectionName, sectionPosition, setSectionPosition }: Props) {

    const imageAd = allAds.home && allAds.home[sectionName as AdSectionName] && allAds.home[sectionName as AdSectionName]?.media;

    return (
        <Tabs defaultValue="desktop">
            <TabsList className="max-w-[100px] ms-auto flex flex-col gap-1 justify-end">
                <p className="text-sm font-medium">Preview</p>
                <div className="flex ">
                    <TabsTrigger value="mobile">
                        <Smartphone />
                    </TabsTrigger>
                    <TabsTrigger value="desktop">
                        <Monitor />
                    </TabsTrigger>
                </div>
            </TabsList>
            {/* DESKTOP */}
            <TabsContent value="desktop">
                <PortadaDesktop
                    imageAd={imageAd}
                    sectionName={sectionName}
                    sectionPosition={sectionPosition}
                    setSectionPosition={setSectionPosition}
                />
            </TabsContent>
            {/* MOBILE */}
            <TabsContent value="mobile">
                <PortadaMobile
                    imageAd={imageAd}
                    sectionName={sectionName}
                    sectionPosition={sectionPosition}
                    setSectionPosition={setSectionPosition}
                />
            </TabsContent>
        </Tabs>
    )
}
