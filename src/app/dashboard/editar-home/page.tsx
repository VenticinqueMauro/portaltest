import EditorContainer from "@/components/dashboard/editar-home/EditorContainer";
import { NewsType } from "@/types/news.types";

async function GetAllNews() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/news`, {cache: 'no-store'});

    const { data } = await response.json();

    return data;
}

export default async function page() {

    const news: NewsType[] = await GetAllNews();

    return (
        <div className="relative">
            <EditorContainer news={news} />
        </div>
    )
}