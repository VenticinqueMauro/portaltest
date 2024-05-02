import { NewsType } from '@/types/news.types'
import EditorSidebar from './EditorSidebar'
import PreviewEditorContainer from './PreviewEditorContainer'

export default function EditorContainer({ news }: { news: NewsType[] }) {
    return (
        <div className="grid grid-cols-12 gap-4 h-screen">
            <PreviewEditorContainer />
            <EditorSidebar news={news} />
        </div>
    )
}
