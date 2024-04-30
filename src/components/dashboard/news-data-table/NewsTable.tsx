import { NewsType } from "@/types/news.types";
import { NewsDataTable, columnsNews } from "./Columns"
import { formatDate } from "@/utils/utils";
import { DataTableNews } from "./DataTable";


async function getData(): Promise<NewsDataTable[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/news`);

    const { data } = await response.json();

    if (!data || data.length === 0) {
        return [];
    }

    return data.map((item: NewsType, index: number) => ({
        id: item._id?.toString(),
        pretitle: item.pretitle,
        title: item.title,
        summary: item.summary,
        content: item.content,
        category: item.category,
        author: item.author,
        status: item.status,
        media: {
            portada: {
                caption: item.media?.portada?.caption,
                publicId: item.media?.portada?.publicId,
                url: item.media?.portada?.url,
                type: item.media?.portada?.type
            },
            zona1: {
                publicId: item.media?.zona1?.publicId,
                url: item.media?.zona1?.url,
                type: item.media?.zona1?.type
            },
            gallery: item.media?.gallery ? item.media.gallery.map((mediaItem: any) => ({
                publicId: mediaItem.publicId,
                url: mediaItem.url,
                type: mediaItem.type
            })) : []
        },
        lastModifiedBy: item.lastModifiedBy || '-',
        createdAt: formatDate(new Date(item?.createdAt as Date)),
        updatedAt: formatDate(new Date(item?.updatedAt as Date)),
        newsLinked: item.newsLinked,
        tags: item.tags
    }));
}


export default async function NewsTable() {
    const data = await getData()

    return (
        <div className="py-10">
            <DataTableNews columns={columnsNews} data={data} />
        </div>
    )
}
