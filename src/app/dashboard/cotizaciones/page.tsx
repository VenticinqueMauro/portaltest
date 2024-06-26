import CardQuotation from "@/components/dashboard/cotizaciones/CardQuotationContainer";
import { QuotationType } from "@/types/news.types";

async function getQuotations() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/quotations`, { cache: 'no-store' });
        const { data }: { data: QuotationType[] } = await response.json();
        return data[0];
    } catch (error) {
        console.log(error)
    }
}

export default async function page() {

    const quotations = await getQuotations()

    return (
        <div>
            <CardQuotation quotations={quotations} />
        </div>
    )
}
