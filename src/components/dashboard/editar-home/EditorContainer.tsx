'use client';

import { MainCover, NewsType } from '@/types/news.types';
import { useState } from 'react';
import EditorSidebar from './EditorSidebar';
import PreviewEditorContainer from './PreviewEditorContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PreviewSectionEditorContainer from './PreviewSectionEditorContainer';


export type SectionName = 'mainNews' | 'leftSidebar' | 'rightSidebar' | undefined;

const initialState = {
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
}


export default function EditorContainer({ news }: { news: NewsType[] }) {

    const [selectedNews, setSelectedNews] = useState<MainCover>(initialState);
    const [sectionName, setSectionName] = useState<SectionName>()

    console.log(selectedNews)

    return (
        <div className="grid grid-cols-12 gap-4">
            <Tabs defaultValue="portada" className="col-span-9  py-3" onValueChange={() => {
                setSectionName(undefined)
                setSelectedNews(initialState)
            }}>
                <TabsList>
                    <TabsTrigger value="portada">Portada</TabsTrigger>
                    <TabsTrigger value="politica">Política</TabsTrigger>
                </TabsList>
                <TabsContent value="portada">
                    <PreviewEditorContainer selectedNews={selectedNews} setSelectedNews={setSelectedNews} setSectionName={setSectionName} sectionName={sectionName} />
                </TabsContent>
                <TabsContent value="politica">
                    <PreviewSectionEditorContainer />
                </TabsContent>
            </Tabs>
            <EditorSidebar news={news} selectedNews={selectedNews} setSelectedNews={setSelectedNews} sectionName={sectionName} />
        </div>
    )
}
