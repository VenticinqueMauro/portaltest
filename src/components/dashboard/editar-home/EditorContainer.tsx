'use client';

import { MainCover, NewsType } from '@/types/news.types';
import { useState } from 'react';
import EditorSidebar from './EditorSidebar';
import PreviewEditorContainer from './PreviewEditorContainer';

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
        <div className="grid grid-cols-12 gap-4 h-screen">
            <PreviewEditorContainer selectedNews={selectedNews} setSectionName={setSectionName} sectionName={sectionName} />
            <EditorSidebar news={news} selectedNews={selectedNews} setSelectedNews={setSelectedNews} sectionName={sectionName}  />
        </div>
    )
}
