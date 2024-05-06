'use client';

import { MainCover, NewsType } from '@/types/news.types';
import { useState } from 'react';
import EditorSidebar from './EditorSidebar';
import PreviewEditorContainer from './PreviewEditorContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export type SectionName = 'mainNews' | 'leftSidebar' | 'rightSidebar' | undefined;


export default function EditorContainer({ news }: { news: NewsType[] }) {

    const [selectedNews, setSelectedNews] = useState<MainCover>({
        cover: {
            mainNews: {
                id: '',
                media: {
                    url: ""
                },
                pretitle: "",
                title: "",
                summary: ""
            },
            leftSidebar: [],
            rightSidebar: []
        }
    });
    const [sectionName, setSectionName] = useState<SectionName>()


    return (
        <div className="grid grid-cols-12 gap-4">
            <Tabs defaultValue="portada" className="col-span-9  py-3">
                <TabsList>
                    <TabsTrigger value="portada">Portada</TabsTrigger>
                    <TabsTrigger value="section1">seccion 1</TabsTrigger>
                </TabsList>
                <TabsContent value="portada">
                    <PreviewEditorContainer selectedNews={selectedNews} setSelectedNews={setSelectedNews} setSectionName={setSectionName} sectionName={sectionName} />
                </TabsContent>
                <TabsContent value="section1">
                    <p>Otra seccion</p>
                </TabsContent>
            </Tabs>
            <EditorSidebar news={news} selectedNews={selectedNews} setSelectedNews={setSelectedNews} sectionName={sectionName} />
        </div>
    )
}
