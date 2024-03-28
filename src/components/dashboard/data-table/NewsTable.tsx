import { NewsType } from "@/types/news.types";
import { NewsDataTable, columnsNews } from "./Columns"
import { formatDate } from "@/utils/utils";
import { DataTableNews } from "./DataTable";


async function getData(): Promise<NewsDataTable[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/news`, { cache: "no-store" });
    const { data } = await response.json();


    return data.map((item: NewsType) => ({
        id: item._id,
        title: item.title,
        summary: item.summary,
        category: item.category,
        author: item.author,
        status: item.status,
        createdAt: formatDate(new Date(item?.createdAt as Date)),
        updatedAt: formatDate(new Date(item?.updatedAt as Date)),
        newsLinked: item.newsLinked
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
