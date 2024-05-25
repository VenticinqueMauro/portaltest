'use client';

import { CategoryNews, MainCover, NewsType, SectionNews, SectionNewsMap } from '@/types/news.types';
import { useEffect, useState } from 'react';
import EditorSidebar from './EditorSidebar';
import PreviewEditorContainer from './PreviewEditorContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PreviewSectionEditorContainer from './PreviewSectionEditorContainer';
import EditorSectionsSidebar from './EditorSectionsSidebar';


export type SectionName = 'mainNews' | 'leftSidebar' | 'rightSidebar' | undefined;

export type SectionsName = 'mainNews' | 'gridNews' | undefined;

const initialState = {
    cover: {
        mainNews: {
            id: '',
            media: {
                url: ""
            },
            pretitle: "",
            title: "",
            summary: "",
            category: "",
            path: ""
        },
        leftSidebar: [],
        rightSidebar: []
    }
}

const initialStateSections: {
    [key in CategoryNews]: SectionNews;
} = {
    [CategoryNews.POLITICA]: {
        mainNews: {
            id: '',
            media: {
                url: ""
            },
            pretitle: "",
            title: "",
            summary: "",
            category: "",
            path: ""
        },
        gridNews: []
    },
    [CategoryNews.ECONEGOCIOS]: {
        mainNews: {
            id: '',
            media: {
                url: ""
            },
            pretitle: "",
            title: "",
            summary: "",
            category: "",
            path: ""
        },
        gridNews: []
    },
    [CategoryNews.DEPORTES]: {
        mainNews: {
            id: '',
            media: {
                url: ""
            },
            pretitle: "",
            title: "",
            summary: "",
            category: "",
            path: ""
        },
        gridNews: []
    },
    [CategoryNews.TENDENCIAS]: {
        mainNews: {
            id: '',
            media: {
                url: ""
            },
            pretitle: "",
            title: "",
            summary: "",
            category: "",
            path: ""
        },
        gridNews: []
    },
    [CategoryNews.PORTALCANA]: {
        mainNews: {
            id: '',
            media: {
                url: ""
            },
            pretitle: "",
            title: "",
            summary: "",
            category: "",
            path: ""
        },
        gridNews: []
    }
};

export const optionsTabs = [
    {
        value: 'politica',
        label: 'Política'
    },
    {
        value: 'eco & negocios',
        label: 'Economía'
    },
    {
        value: 'deportes',
        label: 'Deportes'
    },
    {
        value: 'tendencias',
        label: 'Tendencias'
    },
    {
        value: 'portalcana',
        label: 'Portal de la Caña'
    },
]


export default function EditorContainer({ news }: { news: NewsType[] }) {

    const [tabs, setTabs] = useState('portada');
    const [filteredNews, setFilteredNews] = useState<NewsType[]>([]);
    // NEWS COVER 
    const [selectedNews, setSelectedNews] = useState<MainCover>(initialState);
    const [sectionName, setSectionName] = useState<SectionName>()
    // SECTIONS NEWS
    const [selectedSectionNews, setSelectedSectionNews] = useState<SectionNewsMap>(initialStateSections)
    const [sectionsName, setSectionsName] = useState<SectionsName>()

    useEffect(() => {
        if (tabs !== 'portada') {
            const filteredNews = news.filter(news => news.category === tabs)
            setFilteredNews(filteredNews)
        }
        
    }, [tabs, news])

    return (
        <div className="grid grid-cols-12 gap-4">
            <Tabs defaultValue="portada" className="col-span-9 py-4" onValueChange={(e) => {
                setSectionName(undefined)
                setSectionsName(undefined)
                setSelectedNews(initialState)
                setTabs(e)
            }}>
                <TabsList>
                    <TabsTrigger value="portada">Portada</TabsTrigger>
                    {optionsTabs.map((option) => (
                        <TabsTrigger key={option.value} value={option.value}>{option.label}</TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value="portada">
                    <PreviewEditorContainer selectedNews={selectedNews} setSelectedNews={setSelectedNews} setSectionName={setSectionName} sectionName={sectionName} />
                </TabsContent>
                {optionsTabs.map((option) => (
                    <TabsContent key={option.value} value={option.value}>
                        <PreviewSectionEditorContainer valueSection={option.value} titleSection={option.label} selectedSectionNews={selectedSectionNews} setSelectedSectionNews={setSelectedSectionNews} setSectionName={setSectionsName} sectionName={sectionsName} />
                    </TabsContent>
                ))}
            </Tabs>
            {
                tabs === 'portada' ?
                    <EditorSidebar news={news} selectedNews={selectedNews} setSelectedNews={setSelectedNews} sectionName={sectionName} />
                    :
                    <EditorSectionsSidebar tabs={tabs} news={filteredNews} selectedSectionNews={selectedSectionNews} setSelectedSectionNews={setSelectedSectionNews} sectionName={sectionsName} />
            }
        </div>
    )
}
