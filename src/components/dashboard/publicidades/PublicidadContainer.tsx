'use client';

import { handleAds } from "@/actions/publicidades/handleAds";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ad, AdPosition, AdSectionName, Ads } from "@/types/news.types";
import { useState } from "react";
import { toast } from "sonner";
import { optionsTabs } from "../editar-home/EditorContainer";
import PortadaContainer from "./PortadaContainer";
import SectionsContainer from "./SectionsContainer";
import SidebarAds from "./SidebarAds";

interface Props {
    allAds: Ads
}

export default function PublicidadContainer({ allAds }: Props) {

    const [sectionName, setSectionName] = useState('portada');
    const [sectionPosition, setSectionPosition] = useState<AdPosition | undefined>();

    const deskPublicId = (allAds.home[sectionName as AdSectionName] as any)?.media?.desktop?.[sectionPosition as any]?.public_id;
    const mobPublicId = (allAds.home[sectionName as AdSectionName] as any)?.media?.mobile?.[sectionPosition as any]?.public_id;

    const handleForm = async (formData: FormData) => {

        if (deskPublicId) {
            formData.append('deskPublicId', deskPublicId as string);
        }
        if(mobPublicId){
            formData.append('mobPublicId', mobPublicId as string);

        }
        
        formData.append('section', sectionName);
        formData.append('position', sectionPosition as string);
        const response = await handleAds(formData);
        if (response.error) {
            toast.error(response.error)
        } else if (response.message) {
            toast.success(response.message)
        } else {
            toast.warning(response)
        }
    }

    return (
        <div className="grid grid-cols-12 gap-4">
            <Tabs defaultValue="portada" className="col-span-9 py-4" onValueChange={(e) => {
                setSectionName(e)
                setSectionPosition(undefined)
            }}>
                <TabsList>
                    <TabsTrigger value="portada">Portada</TabsTrigger>
                    {optionsTabs.map((option) => (
                        <TabsTrigger key={option.value} value={option.value}>{option.label}</TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value="portada">
                    <PortadaContainer allAds={allAds} sectionName={sectionName} sectionPosition={sectionPosition} setSectionPosition={setSectionPosition} />
                </TabsContent>
                {optionsTabs.map((option) => (
                    <TabsContent key={option.value} value={option.value}>
                        <SectionsContainer sectionPosition={sectionPosition} setSectionPosition={setSectionPosition} />
                    </TabsContent>
                ))}
            </Tabs>

            {/* SIDEBAR  */}

            <SidebarAds sectionName={sectionName} sectionPosition={sectionPosition} handleForm={handleForm} />
        </div>
    )
}
