'use client';

import { handleAds } from "@/actions/publicidades/handleAds";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdPosition, Ads } from "@/types/news.types";
import { useState } from "react";
import PortadaContainer from "./PortadaContainer";
import SectionsContainer from "./SectionsContainer";
import SidebarAds from "./SidebarAds";
import { optionsTabs } from "../editar-home/EditorContainer";
import { toast } from "sonner";

interface Props {
    allAds: Ads
}

export default function PublicidadContainer({ allAds }: Props) {

    const [sectionName, setSectionName] = useState('portada');
    const [sectionPosition, setSectionPosition] = useState<AdPosition | undefined>();

    const handleForm = async (formData: FormData) => {

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
