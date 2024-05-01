import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Clock3, TrendingDown, TrendingUp } from "lucide-react";
import { DialogEditQuotation } from "./DialogEditQuotation";

interface Props {
    globalTitle: "Azúcar Tucumán" | "Azúcar Internacional" | "Combustibles" | undefined;
    dateQuote1: Date | undefined;
    dateQuote2: Date | undefined;
    titleQuote1: "Bolsa 50kg" | "Londres N5" | "Bioetanol ($/L)" | undefined;
    titleQuote2: "Fracc/1kg" | "EEUU N11" | "Petróleo" | undefined;
    priceQuote1: string;
    priceQuote2: string;
    percentageQuote1: number | undefined;
    percentageQuote2: number | undefined;
}

export default function CardQuotation({ globalTitle, dateQuote1, dateQuote2, titleQuote1, titleQuote2, priceQuote1, priceQuote2, percentageQuote1, percentageQuote2 }: Props) {

    function findMostRecentDateAndFormat(date1: string | Date | undefined, date2: string | Date | undefined): string {
        const formatDate = (dateString: string | Date) => {
            const date = new Date(dateString);
            const today = new Date();

            if (
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()
            ) {
                return `Hoy, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
            } else {
                return `${date.toLocaleDateString('es-ES', { weekday: 'long' })} ${date.getDate()}, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
            }
        };

        const date1Formatted = date1 ? formatDate(date1) : '';
        const date2Formatted = date2 ? formatDate(date2) : '';

        const mostRecentDate = date1 && date2 ? (new Date(date1) > new Date(date2) ? date1Formatted : date2Formatted) : date1Formatted || date2Formatted;

        return mostRecentDate;
    }

    const formatPercentaje = (value: number | undefined) => {
        if (value === 0) return '';
        return `${value}%`;
    };

    const data = {
        globalTitle: globalTitle,
        title: globalTitle === "Azúcar Tucumán"? "azucarTucuman" : globalTitle === "Azúcar Internacional"? "azucarInternacional" : "combustible",
        titleQuote1: titleQuote1 === "Bolsa 50kg"? "50kg" : titleQuote1 === "Londres N5"? "londresN5" : "bioetanol",
        titleQuote2: titleQuote2 === "Fracc/1kg"? "1kg" : titleQuote2 === "EEUU N11"? "eeuuN11" : "petroleo",
    };

    return (
        <Card className="relative max-w-sm">
            <DialogEditQuotation data={data} />
            <CardHeader>
                <CardTitle className="flex items-center gap-1 justify-between">
                    {globalTitle}
                    <div className="text-xs flex gap-1 text-muted-foreground font-normal px-2 py-1 rounded bg-muted">
                        <Clock3 className="w-4 h-4" />
                        <span>
                            {dateQuote1 && dateQuote2 && findMostRecentDateAndFormat(dateQuote1, dateQuote2)}
                        </span>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-2">
                <div className="flex gap-1 justify-between">
                    <div className="flex items-center gap-2">
                        <p>{titleQuote1}</p>
                        <b>{priceQuote1}</b>
                    </div>
                    {
                        percentageQuote1 && percentageQuote1 !== 0 ?
                            <span className={`text-xs p-1 flex gap-1 ${percentageQuote1 > 0 ? 'text-green-500' : percentageQuote1 < 0 ? 'text-red-500' : ''}`}>
                                {percentageQuote1 > 0 ? <TrendingUp className="w-4 h-4" /> : percentageQuote1 < 0 ? <TrendingDown className="w-4 h-4" /> : null}
                                {formatPercentaje(percentageQuote1)}
                            </span>
                            : null
                    }
                </div>
                <div className="flex gap-1 justify-between">
                    <div className="flex items-center gap-2">
                        <p>{titleQuote2}</p>
                        <b>{priceQuote2}</b>
                    </div>
                    {
                        percentageQuote2 && percentageQuote2 !== 0 ?
                            <span className={`text-xs p-1 flex gap-1 ${percentageQuote2 > 0 ? 'text-green-500' : percentageQuote2 < 0 ? 'text-red-500' : ''}`}>
                                {percentageQuote2 > 0 ? <TrendingUp className="w-4 h-4" /> : percentageQuote2 < 0 ? <TrendingDown className="w-4 h-4" /> : null}
                                {formatPercentaje(percentageQuote2)}
                            </span>
                            : null
                    }
                </div>
            </CardContent>
        </Card>
    )
}
