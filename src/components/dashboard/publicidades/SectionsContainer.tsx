import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, Smartphone } from "lucide-react";
import { AdPosition, AdSectionName, Ads } from "@/types/news.types"
import Image from "next/image";
import { Dispatch, SetStateAction } from "react"
import SectionDesktop from "./SectionDesktop";
import SectionMobile from "./SectionMobile";

interface Props {
    allAds: Ads;
    sectionName: string;
    sectionPosition: AdPosition | undefined,
    setSectionPosition: Dispatch<SetStateAction<AdPosition | undefined>>
}

export default function SectionsContainer({ allAds, sectionName, sectionPosition, setSectionPosition }: Props) {

    const imageAd = allAds.home && allAds.home[sectionName as AdSectionName] && allAds.home[sectionName as AdSectionName]?.media;


    return (
        <Tabs defaultValue="desktop">
            <TabsList className="max-w-[100px] ms-auto flex justify-end">
                <TabsTrigger value="mobile">
                    <Smartphone />
                </TabsTrigger>
                <TabsTrigger value="desktop">
                    <Monitor />
                </TabsTrigger>
            </TabsList>
            {/* DESKTOP */}
            <TabsContent value="desktop">
                <SectionDesktop
                    imageAd={imageAd}
                    sectionName={sectionName}
                    sectionPosition={sectionPosition}
                    setSectionPosition={setSectionPosition}
                />
            </TabsContent>
            {/* MOBILE */}
            <TabsContent value="mobile">
                <SectionMobile
                    imageAd={imageAd}
                    sectionName={sectionName}
                    sectionPosition={sectionPosition}
                    setSectionPosition={setSectionPosition}
                />
            </TabsContent>
        </Tabs>

    )
}
