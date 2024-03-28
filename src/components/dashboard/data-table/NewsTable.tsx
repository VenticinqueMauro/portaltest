import { NewsType } from "@/types/news.types";
import { NewsDataTable, columns } from "./Columns"
import { DataTable } from "./DataTable"
import { formatDate } from "@/utils/utils";


async function getData(): Promise<NewsDataTable[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/news`);
    const { data } = await response.json();


    return data.map((item: NewsType) => ({
        id: item._id,
        title: item.title,
        summary: item.summary,
        category: item.category,
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
            <DataTable columns={columns} data={data} />
        </div>
    )
}
